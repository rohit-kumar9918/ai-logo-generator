"use client"
import { userDetailContext } from '@/app/_context/UserDetailContext';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react'

const Info = () => {
    const {userDetail, setUserDetail}=useContext(userDetailContext);

  return (
    <div>
      <div className='flex justify-between items-center mt-8'>
        <h2 className='font-bold text-3xl text-red-600'>Hello, {userDetail?.name}</h2>
        <div className='flex items-center gap-2'>
            <Image src={'/coin.png'} alt='coin' width={40} height={40}/>
            <h1 className='font-bold text-3xl'>{userDetail?.credits} Credit Left</h1>
        </div>
      </div>

      <div className='flex justify-between items-center mt-6'>
        <h2 className='font-bold text-2xl'>Dashboard</h2>
        <Link href='/create'><Button>+ Create New Logo</Button></Link>

      </div>
    </div>
  )
}

export default Info
