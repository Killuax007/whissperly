import { Poppins_font } from "@/lib/fonts";
import { FaUserTie } from "react-icons/fa6";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" p-4 md:p-6 mx-auto">
      <div className="container mx-auto flex md:flex-row justify-between items-center">
        <div>
          <span className={` text-lg ${Poppins_font} text-amber-500`}>
            Whiss
          </span>
          <span className={` text-lg   ${Poppins_font} `}>perly</span>
        </div>
        <div className="flex mb-2 text-sm text-center  max-sm:text-base">
          <span className="text-center flex">
            Made with <span className="text-red-500">&#x27;♥&apos;</span> by
            <FaUserTie
              size={15}
              className="ml-1 mt-1 hover:text-rose-500 cursor-pointer"
            />
          </span>
        </div>
        <div>
          <Link href={"https://github.com/Killuax007"}>
            <FaGithub className=" cursor-pointer  hover:text-cyan-700" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
