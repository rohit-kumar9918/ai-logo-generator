import { Button } from "@/components/ui/button";
import Image from "next/image";
import Provider from "./provider";
import Hero from "./_components/hero";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <Hero/>
    </div>
  );
}
