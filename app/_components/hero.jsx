"use client"
import React, { useState } from 'react'
import lookup from '../_Data/lookup'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const hero = () => {
    const [logoTitle, setLogoTitle]=useState("");
  return (
    <div className='flex items-center mt-24 flex-col gap-5'>
      <h2 className='text-pink-700 text-5xl text-center font-bold'>{lookup.heroHeading}</h2>
      <h2 className='text-5xl text-center font-bold'>{lookup.heroSubHeading}</h2>
      <p className='text-lg text-gray-500 text-center'>{lookup.heroDescription}</p>

      <div className='flex gap-6 w-full max-w-2xl mt-10' >
        <input placeholder={lookup.inputPlaceholder} type="text"
         className='p-3 border rounded-md w-full shadow-md' 
         onChange={(event)=>{setLogoTitle(event.target.value)}}/>
         <Link href={'/create?title='+logoTitle}>
            <Button className=' p-6'>Get Started</Button>
         </Link>
      </div>
    </div>

  )
}

export default hero
