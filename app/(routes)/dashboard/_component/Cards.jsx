import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function Cards({budgetlist}) {
  const [totalbudget,settotalbudget]=useState(0)
  const [totalSpend,settotalspend]=useState(0)
  
   const calculateCardInfo=()=>{
    console.log(budgetlist)
    
   
    let totalbudget_=0;
    let totalspend_=0
    budgetlist.forEach(element=>{
      totalbudget_=totalbudget_+Number(element.amount)
      totalspend_=totalspend_+element.totalSpend
      console.log(totalbudget_,totalspend_)
      settotalbudget(totalbudget_)
      settotalspend(totalspend_)

    })
  }
useEffect(()=>{
    calculateCardInfo()
  },[budgetlist])

  return (
    <div className='mt-7 grid grid-cols-1 md:grid-cols-3 gap-5'>
    <div className='p-7 border rounded-lg flex items-center justify-between'>
    <div>
      <h2 className='text-sm'>total Budget</h2>
      <h2 className='font-bold text-2xl'>₹{totalbudget}</h2>
    </div>
     <PiggyBank className='bg-black p-3 h-14 w-14 rounded-full text-white'></PiggyBank> 
    </div>
    <div className='p-7 border rounded-lg flex items-center justify-between'>
    <div>
      <h2 className='text-sm'>total spend</h2>
      <h2 className='font-bold text-2xl'>₹{totalSpend}</h2>
    </div>
     <ReceiptText className='bg-black p-3 h-14 w-14 rounded-full text-white'></ReceiptText> 
    </div>
    <div className='p-7 border rounded-lg flex items-center justify-between'>
    <div>
      <h2 className='text-sm'>no of budget</h2>
      <h2 className='font-bold text-2xl'>{budgetlist?.length}</h2>
    </div>
     <Wallet className='bg-black p-3 h-14 w-14 rounded-full text-white'></Wallet> 
    </div>
     
    </div>
  )
}

export default Cards
