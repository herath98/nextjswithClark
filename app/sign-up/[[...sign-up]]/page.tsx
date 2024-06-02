import { Button } from "@/components/ui/button";
import { SignInButton, SignUp, SignedOut } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignedOut>
    <div className="grid lg:mx-32 mx-5 md:mx-10   justify-center grid-cols-1 gap-10 mt-20 md:grid-cols-2">
      <div className="max-w-7xl px-5 my-auto">
        <img src="/logo2.png" alt="" />
      </div>
      <div className="my-auto">
        <h1 className=" max-w-7xl  font-bold text-3xl md:text-7xl bg-gradient-to-t from-primary to-secondary bg-clip-text text-transparent">
          Ecommerce Performance Tracker
        </h1>
        <p className="mt-2 text-gray-500">
          Please enter your credentials to access your personalized
          ecommerce insights.
        </p>

        <div className="mt-5">
          <Button>
            <SignInButton mode="modal" />
          </Button>
        </div>
      </div>
    </div>
  </SignedOut>
  );
}