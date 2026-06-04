"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import { SignInButton,SignOutButton,Show,SignUpButton,UserButton, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
 

function SideNav() {
    const menulist=[{
        id:1,
        name:'Dashboard',
        icon:LayoutGrid,
        path:'/dashboard'
    },
    {
        id:2,
        name:'Budgets',
        icon:PiggyBank,
        path:"/dashboard/budgets"
    },
    {
        id:3,
        name:'Expense',
        icon:ReceiptText,
        path:"/dashboard/expenses"
    },
    {
        id:4,
        name:'Upgrade',
        icon:ShieldCheck,
        path:"/dashboard/upgrade"
    }

]
const path=usePathname();
useEffect(function(){

  console.log(path)
},[path])
  return (
    <div className='h-screen p-5  border shadow-sm' >
      <Image src='./logoo.svg' alt='logo' height={100} width={160}></Image>
      <div className='mt-5'>
        {menulist.map((menu,index)=>{
           return (<Link href={menu.path}>
           <h2 className={`flex gap-2 items-center  font-medium p-5 rounded-md cursor-pointer hover:text-blue-600 hover:bg-blue-100 transition-all duration-200 text-lg ${path === menu.path&& 'text-blue-600 bg-blue-100' }`}>
           <menu.icon></menu.icon>
            {menu.name}</h2>
            </Link>
           );
          })}
      </div>
      <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
        <Show when="signed-in">
              <UserButton />
                
            </Show>
          profile
      </div>
    </div>
  )
}

export default SideNav
