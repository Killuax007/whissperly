"use client";
import { MessageCard } from "@/components/message-card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { Message } from "@/models/User";
import { ApiRespopnse } from "@/types/APiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw, Copy, ClipboardCheck } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AcceptMessageSchema } from "@/Schemas/acceptMessageSchema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CelciusFlower } from "@/lib/fonts";
export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const router = useRouter();

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session, status } = useSession();

  const isUserLoggedOut = status === "unauthenticated";

  if (isUserLoggedOut) {
    router.replace("/");
  }

  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessage");

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiRespopnse>("/api/accept-messages");
      setValue("acceptMessage", response.data.isAcceptingMessage ?? false);
      toast.success(response.data.message || "Message fetched successfully");
    } catch (error) {
      const axiosError = error as AxiosError<ApiRespopnse>;
      toast.error(
        axiosError.response?.data.message ?? "Failed to fetch message settings"
      );
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<ApiRespopnse>("/api/get-messages");
        console.log(response);
        setMessages(response.data.messages || []);
        if (refresh) {
          toast.success("message fetched");
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiRespopnse>;
        toast.error(
          axiosError.response?.data.message ?? "Failed to fetch messages"
        );
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessages();
  }, [session, setValue, fetchAcceptMessages, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const res = await axios.post<ApiRespopnse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessage", !acceptMessages);
      toast.success(res.data.message || "Message fetched successfully");
    } catch (error) {
      const axiosError = error as AxiosError<ApiRespopnse>;
      toast.error(
        axiosError.response?.data.message ?? "Failed to update message settings"
      );
    }
  };

  if (!session || !session.user) {
    return <div></div>;
  }

  const { username } = session.user as User;
  console.log(session.user);

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Profile URL has been copied");
  };

  return (
    <div
      className={`mb-8 mx-4 max-sm:mx-0 md:mx-8 lg:mx-auto p-6 rounded w-full max-w-6xl `}
    >
      <h1 className={`text-4xl mt-4  text-center mb-5 ${CelciusFlower}`}>
        Welcome Back {session.user.username}
      </h1>

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Copy Your Unique Link</h2>{" "}
        <div className="flex items-center relative">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered rounded-lg bg-transparent border dark:border-gray-500 w-full px-3 py-2 mr-2"
          />
          <Button
            className="absolute bg-transparent hover:bg-transparent text-black dark:text-white right-3 cursor-pointer "
            onClick={copyToClipboard}
          >
            {copied ? (
              <ClipboardCheck className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="mb-4 flex items-center space-x-3">
        <span className="ml-2 text-sm">Do you want to accept messages?</span>
        <Switch
          className=" cursor-pointer "
          {...register("acceptMessage")}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
      </div>

      <div className="flex justify-end mt-5">
        <Button
          className="mt-4 p-3 h-1"
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            fetchMessages(true);
          }}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <Loader2 className="animate-spin w-8 h-8 " />
        ) : messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageCard
              key={index + 1}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
}
