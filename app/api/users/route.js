
import { db } from "@/config/Firebaseconfig"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req){
    const {userEmail, userName}=await req.json()
    try{
        const docRef=doc(db,"users",userEmail);
        const docSnap=await getDoc(docRef);
        if(docSnap.exists()){
            return NextResponse.json(docSnap.data());
        }
        else{
            const data={
                name:userName,
                email:userEmail,
                credits:5
            }
            await setDoc(doc(db,"users",userEmail),{
                ...data
            })
            return NextResponse.json(data)
        }
    }
    catch(e){
      console.error("Error in /api/users:", e); // ✅ log error
      return NextResponse.json(
        { error: "Internal Server Error", details: e.message },
        { status: 500 }
      );
    }
}

