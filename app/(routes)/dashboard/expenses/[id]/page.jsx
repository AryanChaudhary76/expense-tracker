

"use client"
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useEffect,use,useState } from 'react'
import { getTableColumns,sql } from 'drizzle-orm';
import { Expenses } from '@/utils/schema';
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import { refresh } from 'next/cache';
import { desc } from 'drizzle-orm';
import ExpenseListTable from '../_components/ExpenseListTable.jsx';
import { Button } from '@/components/ui/button';
import { Pen, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditBudget from '../_components/EditBudget';
function ExpensesScreen({params}) {
  const {user}=useUser();
  const[budgetInfo,setBudgetInfo]=useState();
  const [ExpensesList,setExpensesList]=useState();
  const route=useRouter();
   const resolvedParams = use(params)
    useEffect(() => {
  
  }, [budgetInfo])
  useEffect(()=>{

    user&&getBudgetInfo()
  },[resolvedParams,user]);
  /**Get budget information */
  const getBudgetInfo=async()=>{
    const result=await db.select({
          ...getTableColumns(Budgets),
        totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
        totalItem:sql `count(${Expenses.id})`.mapWith(Number)
        }).from(Budgets)
        .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
        .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
        .where(eq(Budgets.id,resolvedParams.id))
        .groupBy(Budgets.id)
        setBudgetInfo(result[0])
        getExpensesList()
  }
   /**Get Latest Expenses */
  const getExpensesList=async()=>{
    const result=await db.select().from(Expenses)
    .where(eq(Expenses.budgetId,resolvedParams.id))
    .orderBy(desc(Expenses.id))
   
    setExpensesList(result)
  

  }
  const deletebudget=async()=>{
    const deleteExpenseResult=await db.delete(Expenses)
    .where(eq(Expenses.budgetId,resolvedParams.id))
    .returning()
    if(deleteExpenseResult){

        const result=await db.delete(Budgets)
    .where(eq(Budgets.id,resolvedParams.id))
    .returning();
   

    }
    toast("Budget Deleted Successfully")
    route.replace(('/dashboard/budgets'))
  
  }
  return (
    <div className='p-10'>
    <div className='flex justify-between'>
       <h2 className='text-2xl font-bold'>My Expenses</h2>
       <div className='flex gap-2 items-center'>
      {budgetInfo&& <EditBudget budgetInfo={budgetInfo} refreshData={()=>getBudgetInfo()}></EditBudget>}
         
      <AlertDialog>
  <AlertDialogTrigger asChild>
  <Button variant='destructive' className='flex p-3 items-center justify-center font-bold gap-2 cursor-pointer '> <Trash className='font-bold'></Trash> Delete</Button>
 
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your current budget and remove your data 
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>deletebudget()}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
     </AlertDialog>
       </div>
     
    </div>
    
     
     <div className='grid grid-cols-1 md:grid-cols-2 mt-3'>
     {budgetInfo && <BudgetItem budget={budgetInfo} />}
     <AddExpense budgetID={resolvedParams.id} user={user} refreshData={()=>getBudgetInfo()}></AddExpense>
     </div>
     <div className='mt-4'>
      <h2 className='font-bold text-lg'>Latest Expenses</h2>
     {ExpensesList&& <ExpenseListTable ExpensesList={ExpensesList} refreshData={()=>getBudgetInfo()}></ExpenseListTable>}
     </div>

    </div>
  )
}

export default ExpensesScreen
