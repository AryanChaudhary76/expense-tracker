"use client"

import ExpenseListTable from './_components/ExpenseListTable';


import React, { useEffect, useState } from 'react'

import { db } from '@/utils/dbConfig'
import { desc, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'








function Expensess() {
    
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
   
      getAllExpenses();
      
    }
  return (
    <div className='m-5'>
    <ExpenseListTable ExpensesList={expensesList}
        refreshData={()=>getBudgetList}></ExpenseListTable>
      
    </div>
  )
}

export default Expensess
