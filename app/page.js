"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header.jsx";
import Hero from "./_components/Hero.jsx";
import { useEffect } from "react";
import { toast } from "sonner";
import { usePathname } from "next/navigation.js";
import { useUser } from "@clerk/nextjs";


export default function Home() {
  const {isSignedIn}=useUser();
 
  useEffect(function(){
      if(isSignedIn === true) {
      toast("Click on Get Started 🚀");
      }
    if (!isSignedIn) {
    toast("Kindly login or signup");
  }
    

  },[isSignedIn])
  return (
    <div>
      <Header></Header>
      <Hero></Hero>
    </div>
    
  );
}
