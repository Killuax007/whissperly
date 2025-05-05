"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Poppins_font } from "@/lib/fonts";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const randomImg = Math.floor(Math.random() * 25);

  return (
    <nav className="p-4 md:p-6 mx-auto">
      <div className="container mx-auto flex md:flex-row justify-between items-center">
        <div>
          <span
            className={` text-2xl md:text-3xl ${Poppins_font} text-amber-500`}
          >
            Whiss
          </span>
          <span className={` text-2xl md:text-3xl ${Poppins_font} `}>
            perly
          </span>
        </div>
        <div className=" flex gap-2 ">
          {session ? (
            <>
              <Image
                src={`https://avatar.vercel.sh/${randomImg}`}
                alt="logo"
                width={35}
                height={35}
                className="rounded-full"
              />

              <Button
                onClick={() => signOut()}
                className="w-20 md:w-auto cursor-pointer dark:bg-white dark:text-black dark:hover:bg-gray-200 bg-black text-white hover:bg-gray-800 hover:text-white rounded-full px-8 h-8 max-sm:px-4 max-sm:h-7"
                variant="outline"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button
                className="w-full cursor-pointer dark:bg-white dark:text-black dark:hover:bg-gray-200 bg-black text-white hover:bg-gray-800 hover:text-white rounded-full px-8 h-8 max-sm:px-4 max-sm:h-7"
                variant={"outline"}
              >
                Login
              </Button>
            </Link>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
