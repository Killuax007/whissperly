"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";
import { signInSchema } from "@/Schemas/signInSchema";
import { signIn } from "next-auth/react";
import { CelciusFlower } from "@/lib/fonts";
import { toast } from "sonner";
export default function Page() {
  const [isSubmit, setIsSubmit] = useState<boolean>();
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  async function onSubmit(data: z.infer<typeof signInSchema>) {
    setIsSubmit(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });
      console.log(result);

      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          toast.error("Incorrect username or password");
        } else {
          if (
            result.error ==
            "Error: Please verify your account before logging in"
          ) {
            toast.error(
              `You verify code is expired, fill this form to get a new verify code`
            );
            router.push("/resend-otp");
          } else {
            toast.error(result.error);
          }
        }
      }

      setIsSubmit(false);

      if (result?.url) {
        toast.success("Welcome user ..");
        router.replace("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setIsSubmit(false);
    }
  }

  return (
    <div className={`flex flex-col min-h-screen justify-center items-center`}>
      <div className="w-full max-w-lg p-4">
        <div className="text-center">
          <h2 className={`${CelciusFlower} text-5xl my-5 `}>
            Welcome back User
          </h2>
          <p>Welcome back, mysterious stranger</p>
        </div>
        <Form {...form}>
          <form
            className="space-y-4  p-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email / Username" {...field} />
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
                  "Login"
                )}
              </Button>
              <p className="text-sm space-x-2 ">
                Not a member try{" "}
                <Link href={"/sign-up"} className="hover:text-emerald-500">
                  Sign-up
                </Link>{" "}
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
