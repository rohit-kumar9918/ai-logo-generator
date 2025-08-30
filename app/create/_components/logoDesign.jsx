import lookup from '@/app/_Data/lookup'
import React, { useState } from 'react'
import HeadingDescription from './headingDescription'
import Image from 'next/image'
import logoDesin from '@/app/_Data/logoDesin'

const LogoDesign = ({onHandleInputChange, formData}) => {
    const [selectedOption, setSelectedOption]=useState(formData?.design?.title);
  return (
    <div>
      <HeadingDescription
      title={lookup.LogoDesignTitle}
      description={lookup.LogoDesignDesc}
      />

      <div className='grid grid-cols-2 md:grid-cols-3 gap-10 mt-10'>
        {logoDesin.map((design, index)=>(
            <div key={index}
            onClick={()=>{setSelectedOption(design.title),
                onHandleInputChange(design)
            }}
            className={`${selectedOption==design.title && 'border rounded-xl border-red-500'} p-3 hover:border-2 border-primary rounded-xl`}
            >
                <Image src={design.image} alt={design.title} width={300}
                height={200}
                className='w-full rounded-xl h-[150] object-cover'
                />
            </div>
        ))}
      </div>
    </div>
  )
}

export default LogoDesign
