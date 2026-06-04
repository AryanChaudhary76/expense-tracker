"use client"
import React, { useState } from 'react'

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
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { db } from '@/utils/dbConfig'



function CreateBudget( {refreshdata}) {
    const [emojiIcon,setEmojiIcon]=useState("😊")
    const [openEmojiPicker,setopenEmojiPicker]=useState(false)
    const [name,setname]=useState('')
    const [amount,setamount]= useState('')
    const {user}=useUser()
    const onclickbudget=async function() {
      const result =await db.insert(Budgets)
      .values({
        name:name,
        amount:amount,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        icon:emojiIcon

      }).returning({insertedID:Budgets.id})
      if(result){
        refreshdata()
        toast("New Budget Created")
        setname('')
        setamount('')
        setEmojiIcon("😊")


      }

    }

    
  return (
    <div className=''>
     
     <Dialog >
       <DialogTrigger asChild><div className='bg-slate-100 p-10 rounded-md flex items-center  flex-col border-2 border-dashed cursor-pointer hover:shadow-md w-full'>
        <h2 className='text-3xl'>+</h2>
        <h2>Create New budget</h2>
     </div></DialogTrigger>
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
            <h2 className='text-black font-medium my-1'>Budget Name</h2>
            <Input placeholder="e.g. House Rent" onChange={(e)=>setname(e.target.value)} value={name}></Input>
           </div>
           <div className='mt-2'>
            <h2 className='text-black font-medium my-1'>Budget Amount</h2>
            <Input type='number' placeholder="e.g. ₹6000" onChange={(e)=>setamount(e.target.value)} value={amount}></Input>
           </div>
           

        </div>
          </DialogDescription>
         </DialogHeader>
           <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
               <Button className='mt-5 w-full'
                disabled={!(name&&amount)} onClick={onclickbudget}>Create Budget</Button>

             </DialogClose>
           </DialogFooter>
       </DialogContent>
   </Dialog>
    </div>
  )
}

export default CreateBudget
