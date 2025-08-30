import React, { useState } from 'react'
import HeadingDescription from './HeadingDescription'
import lookup from '@/app/_Data/LookUp'
import color from '@/app/_Data/color'


const logoColorPallet = ({onHandleInputChange, formData}) => {
    const [selectedOption, setSelectedOption]=useState(formData?.pallet)
  return (
    <div className='my-10'>
      <HeadingDescription
      title ={lookup.LogoColorPaletteTitle}
      description={lookup.LogoColorPaletteDesc}
      />

      <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
        {color.map((pallet,index)=>(
            <div key={index} className={`flex p-1 cursor-pointer ${selectedOption==pallet.name && 'border-2 border-red-500'}`}>
                {pallet?.colors.map((color,index)=>(
                    <div className='h-24 w-full' 
                    key={index}
                    onClick={()=>{setSelectedOption(pallet.name),
                        onHandleInputChange(pallet.name)
                    }}
                    style={{
                        backgroundColor:color
                    }}>
                    </div> 
                ))}
            </div>
        ))}
      </div>
    </div>
  )
}

export default logoColorPallet
