"use client";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import MarqueeComponent from "@/components/marque-component";
import { Chigero_font, Poppins_font } from "@/lib/fonts";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import { Card, CardHeader } from "@/components/ui/card";
import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from "next-themes";
export default function Home() {
  const { status } = useSession();

  const isUserLoggedIn = status === "authenticated";
  return (
    <>
      <main className=" flex justify-center  h-[60vh] max-sm:h-[42vh]  space-y-4 ">
        <section className="flex flex-col justify-center items-center   ">
          <h2
            className={`text-4xl md:mx-0  mx-6  md:text-6xl ${Chigero_font} mb-4`}
          >
            Join us to the world of Whisspering...{" "}
          </h2>
          <p>Whisspers cannot make noise </p>
          <Link
            className="mt-4"
            href={`${isUserLoggedIn ? "/dashboard" : "/sign-in"}`}
          >
            <ShimmerButton className="shadow-2xl">
              <span className="whitespace-pre-wrap w-30 text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Get Started
              </span>
            </ShimmerButton>
          </Link>
        </section>
      </main>
      <div className="my-10">
        <MarqueeComponent />
      </div>
      <div className="flex flex-col justify-center items-center my-10">
        <h2 className={`text-3xl  md:text-5xl ${Chigero_font} mb-4`}>
          Fast reply ... Fast Response
        </h2>
        <div
          className={`flex md:flex-row  flex-col w-full   md:max-w-5xl gap-5 my-5 ${Poppins_font}`}
        >
          <CardWrapper content="🔐 Your secrets, sealed tight" />
          <CardWrapper content="🕵️‍♂️ Anonymity is our promise" />
          <CardWrapper content="🧠 Share freely, stay unknown" />
        </div>
      </div>
    </>
  );
}

function CardWrapper({ content }: { content: string }) {
  const { theme } = useTheme();
  return (
    <>
      <Card className="flex mx-10 md:mx-0  justify-center md:w-full p-0 max-w-sm  shadow-none border-none cursor-pointer  ">
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="p-0 min-h-[10rem]"
        >
          <CardHeader className="md:text-2xl  justify-center my-15 ">
            {content}
          </CardHeader>
        </MagicCard>
      </Card>
    </>
  );
}
