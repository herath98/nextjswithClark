"use client";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignIn, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Navbar } from "flowbite-react";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const { setTheme } = useTheme();
  const tasks = useQuery(api.tasks.get);
  return (
    <main className="w-full min-h-screen flex-col items-center justify-between ">
      <SignedOut>
        <Navbar fluid rounded>
          <Navbar.Brand href="https://flowbite-react.com">
            <img
              src="/favicon.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite React Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Flowbite React
            </span>
          </Navbar.Brand>
          <div className="flex justify-between gap-4 md:order-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button style={{ background: "none" }} size={10}>
                  <div className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">
                    <svg
                      width="20px"
                      height="21px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="5"
                        stroke="#1C274C"
                        stroke-width="1.5"
                      />
                      <path
                        d="M12 2V4"
                        stroke="#1C274C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M12 20V22"
                        stroke="#1C274C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M4 12L2 12"
                        stroke="#1C274C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M22 12L20 12"
                        stroke="#1C274C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M19.7778 4.22266L17.5558 6.25424"
                        stroke="#1C274C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M4.22217 4.22266L6.44418 6.25424"
                        stroke="#1C274C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M6.44434 17.5557L4.22211 19.7779"
                        stroke="#1C274C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M19.7778 19.7773L17.5558 17.5551"
                        stroke="#1C274C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </div>
                  <div className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100">
                    <svg
                      fill="white"
                      width="16px"
                      height="16px"
                      viewBox="0 0 32 32"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>moon</title>
                      <path d="M29.684 23.984l-0.021-0.055c-0.193-0.456-0.638-0.771-1.155-0.771-0.172 0-0.336 0.035-0.486 0.098l0.008-0.003c-1.219 0.521-2.638 0.824-4.127 0.824-5.937 0-10.751-4.813-10.751-10.751 0-4.458 2.713-8.282 6.579-9.911l0.071-0.026 0.221-0.093c0.444-0.199 0.747-0.636 0.747-1.145 0-0.625-0.458-1.142-1.057-1.235l-0.007-0.001c-0.676-0.106-1.455-0.167-2.249-0.167-8.421 0-15.248 6.827-15.248 15.248s6.827 15.248 15.248 15.248c4.91 0 9.278-2.321 12.067-5.925l0.026-0.035c0.161-0.208 0.258-0.473 0.258-0.76 0-0.197-0.046-0.383-0.127-0.548l0.003 0.007zM22.326 27.779c-1.44 0.612-3.115 0.968-4.873 0.968-7.041 0-12.75-5.708-12.75-12.75 0-6.189 4.41-11.349 10.26-12.507l0.081-0.013c-2.694 2.435-4.379 5.942-4.379 9.843 0 7.319 5.933 13.252 13.252 13.252 0.242 0 0.482-0.006 0.72-0.019l-0.033 0.001c-0.655 0.45-1.404 0.86-2.194 1.193l-0.084 0.031z"></path>
                    </svg>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <SignInButton/>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link href="#" active>
              Home
            </Navbar.Link>
            <Navbar.Link href="#">About</Navbar.Link>
            <Navbar.Link href="#">Services</Navbar.Link>
            <Navbar.Link href="#">Pricing</Navbar.Link>
            <Navbar.Link href="#">Contact</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
       
        
      </SignedOut>
      <SignedIn>
        <div>harsha</div>
      </SignedIn>
    </main>
  );
}
