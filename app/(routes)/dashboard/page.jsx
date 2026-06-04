"use client"



import Cards from './_component/Cards.jsx'

import React, { useEffect, useState } from 'react'

import { db } from '@/utils/dbConfig'
import { desc, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import BarChartDashBoard from './_component/BarChartDashboard.jsx'
import BudgetItem from './budgets/_components/BudgetItem.jsx'
import ExpenseListTable from './expenses/_components/ExpenseListTable.jsx'






function Dashboard() {

   const [budgetlist,setbudgetlist]=useState([]);
   const [expensesList,setExpensesList]=useState([]);
    const {user}=useUser();
    useEffect( function(){
      user&&getBudgetList();
  
    },[user])
    const getAllExpenses=async()=>{
      const result=await db.select({
        id:Expenses.id,
        name:Expenses.name,
        amount:Expenses.amount,
        createdAt:Expenses.createdAt
      }).from(Budgets)
      .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
      .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));
      console.log(result);
      setExpensesList(result)

    }
    const getBudgetList=async()=>{
      const result=await db.select({
        ...getTableColumns(Budgets),
      totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem:sql `count(${Expenses.id})`.mapWith(Number)
      }).from(Budgets)
      .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
      .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
      .groupBy(Budgets.id)
           setbudgetlist(result)
      console.log(result)
      console.log(budgetlist);
      getAllExpenses();
    }
  const getBudgetInfo=()=>{
  }
  return (
    <div className='p-8'>
       <h2 className='font-bold text-3xl'>Hi! {user?.fullName}</h2>
       <p className='text-gray-500'>
        Here's what happening with your Money,Lets Manage your expense
       </p>
       <Cards budgetlist={budgetlist}></Cards>
       <div className='grid grid-cols-1 md:grid-cols-3 mt-6'>
        <div className='md:col-span-2'>
        <BarChartDashBoard budgetlist={budgetlist}></BarChartDashBoard>
          <h2 className='font-bold text-lg'>Latest Expenses</h2>
        <ExpenseListTable ExpensesList={expensesList}
        refreshData={()=>getBudgetList}></ExpenseListTable>
        </div>
        <div className='ml-3 grid gap-5'>
        <h2 className='font-bold text-lg'>Latest Budget</h2>
          {budgetlist.map((budget,index)=>{
            return <BudgetItem budget={budget} key={index}></BudgetItem>
          })}
        </div>
       </div>

     </div>      
    
  )
}

export default Dashboard
