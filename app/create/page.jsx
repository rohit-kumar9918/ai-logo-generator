"use client"
import React, { useState } from 'react'
import Provider from './../provider'
import LogoTitle from './_components/logoTitle'
import LogoDesc from './_components/logoDesc'
import LogoColorPallet from './_components/logoColorPallet'
import LogoDesign from './_components/logoDesign'
import LogoIdea from './_components/logoIdea'
import PricingModel from './_components/pricingModel'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
const createLogo = () => {
    const [step, setStep]=useState(1);
    const [formData, setFormData]=useState();
    const onHandleInputChange=(field, value)=>{
        setFormData(prev=>({
            ...prev , 
            [field]:value
        }))
    }
  return (
    <div className='mt-28 p-10 border rounded-2xl'>
      {step==1?
        <LogoTitle onHandleInputChange={(v)=>onHandleInputChange('title',v)}
        formData={formData}/>:
        step==2?
        <LogoDesc onHandleInputChange={(v)=>onHandleInputChange('desc',v)}
        formData={formData}/>:
        step==3?
        <LogoColorPallet onHandleInputChange={(v)=>onHandleInputChange('color',v)}
        formData={formData}/>:
        step==4?
        <LogoDesign onHandleInputChange={(v)=>onHandleInputChange('design',v)}
        formData={formData}/>:
        step==5?
        <LogoIdea onHandleInputChange={(v)=>onHandleInputChange('idea',v)}
        formData={formData}/>:
        step==6?
        <PricingModel onHandleInputChange={(v)=>onHandleInputChange('idea',v)}
        formData={formData}/>:
        null
      }
      

      <div className='flex items-center justify-between mt-10'>
        {step!=1 &&<Button variant="outline" onClick={()=>setStep(step-1)}><ArrowLeft/>Previous</Button>}
        <Button onClick={()=>setStep(step+1)}><ArrowRight/>Continue</Button>
      </div>
    </div>
  )
}

export default createLogo
