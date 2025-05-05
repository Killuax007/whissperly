"use client";
import React, { useState, useEffect } from "react";
import { useDebounceCallback } from "usehooks-ts";

// import { useSession, signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/Schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios, { AxiosError } from "axios";
import { ApiRespopnse } from "@/types/APiResponse";
import { Loader2 } from "lucide-react";
import { CelciusFlower } from "@/lib/fonts";
import { toast } from "sonner";

export default function Page() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState<string>();
  const [isCheckingUsername, setCheckingUsername] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>();
  const debounced = useDebounceCallback(setUsername, 300);
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    setIsSubmit(true);
    const res = await axios.post("/api/sign-up", data);
    toast.success(res.data.message);
    router.replace(`/verify/${username}`);
    setIsSubmit(false);
    try {
    } catch (error) {
      console.log(error);
      const axiosError = error as AxiosError<ApiRespopnse>;
      const errorMessage = axiosError.response?.data.message;
      toast.error(errorMessage);
      setIsSubmit(false);
    }
  }
  useEffect(() => {
    const UsernameValidation = async () => {
      if (username) {
        setCheckingUsername(true);
        setUsernameMessage("");
        try {
          const res = await axios.get(
            `/api/check-username?username=${username}`
          );
          console.log(res.data.message);
          setUsernameMessage(res.data.message);
        } catch (error) {
          const axioserror = error as AxiosError<ApiRespopnse>;
          setUsernameMessage(
            axioserror.response?.data.message ?? "Error while checking"
          );
        } finally {
          setCheckingUsername(false);
        }
      }
    };
    UsernameValidation();
  }, [username]);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="w-full max-w-lg p-5 ">
        <div className="text-center my-5 gap-2">
          <h2 className={`${CelciusFlower} text-5xl  my-5 `}>
            Join Whissperly
          </h2>
          <p>Enter the world where your words whisper</p>
        </div>
        <Form {...form}>
          <form
            className="space-y-4  p-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    {isCheckingUsername && (
                      <Loader2 className=" size-5 animate-spin" />
                    )}
                    <p
                      className={`text-sm ${
                        usernameMessage === "Username is unique"
                          ? " text-emerald-500"
                          : "text-rose-600"
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} type="password" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" flex flex-col justify-center items-center gap-4 py-4">
              <Button
                disabled={isSubmit}
                type="submit"
                className="w-full cursor-pointer"
              >
                {isSubmit ? (
                  <div className="flex items-center just">
                    <Loader2 className="mr-2 animate-spin" size={15} />
                    <span>Please wait</span>
                  </div>
                ) : (
                  "Create an Account"
                )}
              </Button>
              <p className="text-sm ">
                Already a member{" "}
                <Link href={"/sign-in"} className="hover:text-emerald-500">
                  Sign-in
                </Link>{" "}
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
