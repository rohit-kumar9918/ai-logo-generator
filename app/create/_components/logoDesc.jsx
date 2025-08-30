import React from 'react'
import HeadingDescription from './HeadingDescription'
import lookup from '@/app/_Data/LookUp'
const logoDesc = ({onHandleInputChange,FormData}) => {
  return (
    <div className='my-10'>
      <HeadingDescription
      title={lookup.LogoDescTitle}
      description={lookup.LogoDescDesc}/>

      <input type="text" placeholder={lookup.inputPlaceholder} 
      className='p-4 border rounded-xl mt-5 w-full' 
      defaultValue={FormData?.desc}
      onChange={(e)=>onHandleInputChange(e.target.value)}/>
    </div>
  )
}

export default logoDesc
