"use client"
import React, { useEffect } from 'react'
import HeadingDescription from './HeadingDescription'
import lookup from '@/app/_Data/LookUp'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SignInButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
// import generatelogo from '@/app/generate-logo/page'

const pricingModel = ({formData}) => {
    const {user}=useUser();
    useEffect(()=>{
        console.log("formData received:", formData);
        if(formData?.title && typeof window!=undefined){
            localStorage.setItem('formData', JSON.stringify(formData));
        }
    },[formData]);



  return (
    <div className='my-10'>
      <HeadingDescription
      title={lookup.LogoPricingModelTitle}
      description={lookup.LogoPricingModelDesc}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-5'>
        {lookup.pricingOption.map((pricing,index)=>(
            <div className='flex flex-col items-center p-5 border-4' key={index}>
                <Image src={pricing.icon} alt={pricing.title}
                width={60}
                height={60}
                />
                <h2 className='font-medium text-2xl'>{pricing.title}</h2>
                <div>
                    {pricing.features.map((feature,index)=>(
                        <h2 className='text-lg mt-3' key={index}>{feature}</h2>
                    ))}
                </div>
                {user?
                <Link href={'/generate-logo?type='+pricing.title}>
                <Button className='mt-5 'forceRedirectUrl={'/generate-logo?type='+pricing.title} >{pricing.button}</Button>
                </Link>
                :<SignInButton mode='modal' forceRedirectUrl={'/generate-logo?type='+pricing.title}>
                    <Button className='mt-5 '>{pricing.button}</Button>
                </SignInButton>}
                
            </div>
        ))}
      </div>
    </div>
  )
}

export default pricingModel
