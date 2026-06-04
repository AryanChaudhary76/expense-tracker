"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import EmojiPicker from 'emoji-picker-react'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { refresh } from 'next/cache'

function EditBudget({budgetInfo,refreshData}) {
      const [emojiIcon,setEmojiIcon]=useState(budgetInfo.icon)
    const [openEmojiPicker,setopenEmojiPicker]=useState(false)
    const [name,setname]=useState(budgetInfo?.name)
    const [amount,setamount]= useState(budgetInfo?.amount)
    const {user}=useUser()
    const onUpdateBudget=async()=>{
        const result=await db.update(Budgets).set({
            name:name,
            amount:amount,
            icon:emojiIcon
        }).where(eq(Budgets.id,budgetInfo.id))
        .returning();
        if(result){
            toast('Budget Updated Successfully')
            refreshData()
        }
        console.log(budgetInfo)

    }
  return (

    <div>
      
    <Dialog>
       <DialogTrigger asChild>
       <Button className='flex gap-2'><PenBox></PenBox> Edit</Button>

       </DialogTrigger>
       <DialogContent>
         <DialogHeader>
          <DialogTitle>Create New Budget</DialogTitle>
          <DialogDescription>
          <div className='mt-5'>

            <Button size='lg' className='text-2xl' variant='outline' 
             onClick={()=>setopenEmojiPicker(!openEmojiPicker)}>{emojiIcon}</Button>


            <div className='absolute z-20'>
              <EmojiPicker  open={openEmojiPicker}
               onEmojiClick={(e)=>{
                setEmojiIcon(e.emoji)
                setopenEmojiPicker(false)
                }}>

              </EmojiPicker>
           </div>
           <div className='mt-2'>
            <h2 className='text-black font-medium my-1'> Update Budget Name</h2>
            <Input placeholder="e.g. House Rent" onChange={(e)=>setname(e.target.value)} defaultValue={budgetInfo.name}></Input>
           </div>
           <div className='mt-2'>
            <h2 className='text-black font-medium my-1'> Update Budget Amount</h2>
            <Input type='number' placeholder="e.g. ₹6000" onChange={(e)=>setamount(e.target.value)} defaultValue={budgetInfo.amount} ></Input>
           </div>
           

        </div>
          </DialogDescription>
         </DialogHeader>
           <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
               <Button className='mt-5 w-full'
                disabled={!(name&&amount)} onClick={onUpdateBudget}>update Budget</Button>

             </DialogClose>
           </DialogFooter>
       </DialogContent>
   </Dialog>
    </div>
  )
}

export default EditBudget
