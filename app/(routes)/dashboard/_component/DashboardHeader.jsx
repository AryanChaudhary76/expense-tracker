import React from 'react'
import { SignInButton,SignOutButton,Show,SignUpButton,UserButton, useUser } from '@clerk/nextjs'

function DashboardHeader() {
  return (
    <div className='p-5 shadow-sm border-b flex justify-between items-center  '>
    <div>
        searchbar
    </div>
    <div>
         <Show when="signed-in">
          <UserButton />   
         </Show>
    </div>
  
    </div>  
  )
}

export default DashboardHeader
