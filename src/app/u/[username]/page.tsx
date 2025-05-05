"use client";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, DicesIcon, LinkIcon, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";

import { ApiRespopnse } from "@/types/APiResponse";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MessageSchema } from "@/Schemas/messageSchema";
import { toast } from "sonner";
import { CelciusFlower, Chigero_font } from "@/lib/fonts";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { SiMinutemailer } from "react-icons/si";

const specialChar = "||";

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar).filter(Boolean);
};

const initialMessages: string[] = [
  "What's your most vivid childhood memory involving a favorite toy? ",
  "If creativity were a superpower, how would you use it to improve the world?",
  "What fictional world would you most like to visit and why?",
];

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema),
  });

  const messageContent = form.watch("content");

  const [isLoading, setIsLoading] = useState(false);
  const [suggestedMessages, setSuggestedMessages] =
    useState<string[]>(initialMessages);
  const [isFetching, setIsFetching] = useState(false);

  const onSubmit = async (data: z.infer<typeof MessageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiRespopnse>("/api/send-message", {
        ...data,
        username,
      });

      toast.success(response.data.message);
      form.reset({ ...form.getValues(), content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiRespopnse>;
      toast.error(
        axiosError.response?.data.message ?? "Failed to send message"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get<ApiRespopnse>("/api/suggest-message");
      const messages = parseStringMessages(response.data.message);
      setSuggestedMessages(messages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiRespopnse>;
      toast.error(
        axiosError.response?.data.message ??
          "Failed to fetch suggested messages."
      );
    } finally {
      setIsFetching(false);
    }
  };

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  return (
    <div
      className={`container mx-auto mt-4 my-8 p-6 rounded md:max-w-4xl bg-linear-to-r from-gray-800 via-blue-700 to-gray-900`}
    >
      <h1 className={`text-4xl mb-10 text-center ${CelciusFlower}`}>
        Start Whisspering..
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-white text-black">
                  Send a Whisper Message to @{username}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="ssssshhhhhh"
                    className={`resize-none placeholder:text-gray-400 text-lg md:text-xl font-light ${Chigero_font}`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center">
            {isLoading ? (
              <ShimmerButton disabled>
                <span className="flex whitespace-pre-wrap  text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </span>
              </ShimmerButton>
            ) : (
              <ShimmerButton
                disabled={isLoading || !messageContent}
                className="flex mx-auto  text-white bg-blue-700 hover:bg-blue-800 cursor-pointer"
              >
                <span className="flex whitespace-pre-wrap  text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Send It
                  <SiMinutemailer className="ml-1 " />
                </span>
              </ShimmerButton>
            )}
          </div>
        </form>
      </Form>

      <div className="space-y-4 my-8 mt-5">
        <Card className="dark:bg-black border-none">
          <CardHeader
            className={`text-center  tracking-wide text-2xl ${CelciusFlower}`}
          >
            Doesnot ring a bell, Choose one
          </CardHeader>
          <CardContent className="flex flex-wrap flex-col space-y-2 max-sm:space-y-4">
            {suggestedMessages.length > 0 ? (
              suggestedMessages.map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full flex md:text-sm text-[10px] font-semibold h-15 max-sm:h-20 py-2 px-3 whitespace-normal break-words cursor-pointer "
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </Button>
              ))
            ) : (
              <p className="text-gray-500">
                No messages available. Try suggesting some!
              </p>
            )}
          </CardContent>
        </Card>
        <div className="space-y-2 w-full">
          {isFetching ? (
            <ShimmerButton
              className="flex mx-auto  text-white bg-blue-700 hover:bg-blue-800 cursor-pointer"
              disabled
            >
              <span className="flex whitespace-pre-wrap  text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                <Loader className="mr-1 h-4 w-4 animate-spin" />
                suggesting..
              </span>
            </ShimmerButton>
          ) : (
            <ShimmerButton
              onClick={fetchSuggestedMessages}
              className="flex mx-auto transition duration-300 delay-200 hover:bg-amber-400 cursor-pointer"
              disabled={isFetching}
            >
              <span className="flex whitespace-pre-wrap  text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                <DicesIcon className="mr-1 h-4 w-4" />
                Shuffle Suggestestions
              </span>
            </ShimmerButton>
          )}
        </div>
      </div>
      <Separator className="my-2" />
      <div className=" flex flex-col justify-center items-center my-auto text-center">
        <div className="flex mb-2 text-sm text-center  max-sm:text-base">
          <span className="text-center">
            with love <span className="text-red-500">&#x27;♥&apos;</span>@
            {username}
          </span>
        </div>
        <Link href={"/sign-up"}>
          <span className="flex text-base hover:text-amber-500">
            <LinkIcon size={10} className="mt-1 h-4 w-4 " /> Join us
          </span>
        </Link>
      </div>
    </div>
  );
}
