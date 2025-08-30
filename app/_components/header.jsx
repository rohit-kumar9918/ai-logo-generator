"use client"
import React from 'react'
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';

const header = () => {
  const {user}=useUser();
  return (
    <div className='px-10 lg:px-32 xl:px-48 2xl:px-56 flex justify-between items-center'>
      <Image src="/logo.svg" alt="logo" width={180} height={100} />
      <div className='flex gap-5 items-center'>
        {user?<Button variant="outline">DashBoard</Button>:
        <Button>Get Started</Button>}
        <UserButton/>
      </div>
      
    </div>
  )
}

export default header
