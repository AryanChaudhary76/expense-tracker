"use client"
import React, { useEffect } from 'react'
import SideNav from './_component/SideNav.jsx'
import DashboardHeader from './_component/DashboardHeader.jsx'
import { db } from '@/utils/dbConfig.jsx'
import { Budgets } from '@/utils/schema.jsx'


import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation.js'

function Dashboardlayout({children}) {
  const {user}=useUser();
  const router=useRouter();
  useEffect(function(){
    user&&checkuserBudgets();
  },[user])
  const checkuserBudgets= async function(){
    const result = await db.select().from(Budgets).where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
   
    if(result?.length==0){
      router.replace('/dashboard/budgets')

    }
  }
  return (
    <div>
    <div className='fixed md:w-64 hidden md:block '>
        <SideNav></SideNav>
    </div>
    <div className='md:ml-64 '>
    <DashboardHeader></DashboardHeader>
         {children}
    </div>
     
    </div>
  )
}

export default Dashboardlayout

