"use client"
import lookup from '@/app/_Data/LookUp'
import React, { useState } from 'react'
import HeadingDescription from './HeadingDescription'
import { useSearchParams } from 'next/navigation'

const logoTitle = ({onHandleInputChange,formData}) => {
    const searchParam=useSearchParams();
    const [title , setTitle]=useState(searchParam?.get('title')??"")
  return (
    <div className='mt-10'>
      <HeadingDescription title={lookup.logoTitle}
      description={lookup.logoTitleDescription}
      />

      <input type='text' placeholder={lookup.inputPlaceholder}
      className='p-4 border rounded-lg mt-5 w-full'
      defaultValue={formData?.title}
      onChange={(e)=>onHandleInputChange(e.target.value)}
      />
    </div>
  )
}

export default logoTitle
