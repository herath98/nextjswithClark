"use client";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button, Navbar } from "flowbite-react";

export default function Home() {
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
          <div className="flex md:order-2">
            <Button>Get started</Button>
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
