"use client"
import React from 'react'
import Image from "next/image"
import { Button } from '@/components/ui/button'
import { SignInButton,SignOutButton,Show,SignUpButton,UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';
import { User } from 'lucide-react';

function Header() {
  const {user,isSignedin}=useUser(false);;
  return (
    <div className='p-5 flex justify-between items-center border shadow-sm '>
    <Image src='./logoo.svg' alt='logo' height={100 } width={160}></Image>
   
    <div>
    


      <Show when="signed-out">
              <SignInButton>
                <Button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
               <Button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up  
                </Button>
                
              </SignUpButton>
            </Show>
            
            <Show when="signed-in">
            
              <UserButton  redirectUrl="http://localhost:3000/"/>
           
            </Show>
           
    </div>
     

    
     
   
     
    </div>
  )
}

export default Header
