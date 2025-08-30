"use client";
import { useContext, useEffect, useState } from "react";
import { userDetailContext } from "../_context/UserDetailContext";
import prompt from "../_Data/Prompt";
import axios from "axios";
import Image from "next/image";

export default function GenerateLogoPage() {
  const { userDetail, setuserDetail } = useContext(userDetailContext);
  const [loading, setLoading]=useState(false);
  // console.log(userDetail);
  const [formData, setFormData]=useState({});
  const [logoImage, setLogoImage]=useState();

  useEffect(()=>{
    if(typeof window!=undefined && userDetail?.email){
      const storage=localStorage.getItem('formData');
      if(storage){
        setFormData(JSON.parse(storage));
        console.log(JSON.parse(storage));
      }
    }
  },[userDetail])


  useEffect(()=>{
    if(formData?.title){
      GenerateAILogo();
    }
  },[formData])

  const GenerateAILogo=async()=>{
    setLoading(true);
    const PROMPT=prompt.LOGO_PROMPT
    .replace('{logoTitle}',formData?.title)
    .replace('{logoDesc}',formData?.desc)
    .replace('{logoColor}',formData?.color)
    .replace('{logoDesign}',formData?.design?.title)
    .replace('{logoIdea}', formData?.idea)
    .replace('{logoPrompt}',formData?.design?.prompt);

    console.log(PROMPT);

    const result =await axios.post('/api/ai-logo-model',{
      prompt:PROMPT,
      email:userDetail?.email,
      title:formData.title,
      desc:formData.desc
    });
    console.log(result?.data)
    setLogoImage(result.data?.image)
    setLoading(false);
  }

  return (
    <div>
      <h1>Generate logo</h1>
      {userDetail ? (
        <p>Welcome, {userDetail.name}</p>
        
      ) : (
        <p>Loading user details...</p>
      )}

      {!loading && logoImage && (
  <Image src={logoImage} alt="logo" width={200} height={200} />
)}
    </div>
  );
}