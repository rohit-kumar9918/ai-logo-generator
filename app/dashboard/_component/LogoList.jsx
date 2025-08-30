"use client"
import { userDetailContext } from '@/app/_context/UserDetailContext'
import { db } from '@/config/Firebaseconfig';
import { collection, doc, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'

const LogoList = () => {
    const {userDetail, setUserDetail}=useContext(userDetailContext);
    const [LogoList, setLogoList]=useState([]);
    useEffect(()=>{
        console.log(" user Details is ", userDetail);
        userDetail&&GetUserLogos();
    },[userDetail])

    const GetUserLogos=async()=>{
        const querySnapshot=await getDocs(collection(db,"users", userDetail?.email,"logos"))
        console.log("dffefef");
        console.log("Docs found:", querySnapshot.size);
        setLogoList([]);
        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setLogoList(prev=>[...prev,doc.data()])
        })
    }

    const viewLogo=(image)=>{
        const imageWindow=window.open();
        imageWindow.document.write(`<img src="${image}" alt="base64 Image"/>`);
    }

  return (
    <div className='mt-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {LogoList?.length>0?LogoList.map((logo,index)=>(
            <div key={index} className='hover:scale-105 transition-all cursor-pointer'
            onClick={()=>viewLogo(logo?.image)}>
                <Image src={logo?.image} width={400} height={200} className='w-full rounded-xl' alt={logo?.title}/>
                <h2 className='text-center text-lg font-medium mt-2'>{logo?.title}</h2>
                <p className='text-sm text-gray-500 text-center'>{logo?.desc}</p>
            </div>
        )):
        [1,2,3,4,5,6].map((item,index)=>(
            <div key={index} className='bg-slate-200  rounded-xl w-full h-[200]'>
                <Image src={`/design_${index+1}.png`} width={400} height={200} className='w-full rounded-xl' alt={`Design preview ${index + 1}`} />
            </div>
        ))
    }
      </div>
    </div>
  )
}

export default LogoList
