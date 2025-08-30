import { AIlogoPrompt } from "@/config/aimodel";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

// import { writeFile } from "fs/promises";
// import Replicate from "replicate";

export async function POST(req) {
  const { prompt , email,title,desc} = await req.json();

  try {
    const aiPromptText = await AIlogoPrompt(prompt);

    console.log("Raw AI response:", aiPromptText);

    let parsed;
    try {
      parsed = JSON.parse(aiPromptText);
    } catch {
      parsed = { prompt: aiPromptText }; 
    }
    console.log("ddfaefefaerferf");
    console.log(parsed);

    //generate logo from hugging face ai
    const response=await axios.post('https://router.huggingface.co/fal-ai/fal-ai/flux-lora',
        aiPromptText,{
            headers: {
				Authorization: "Bearer "+process.env.HUGGING_FACE_API,
				"Content-Type": "application/json",
			},
            responseType:"arraybuffer"
        }
    )

    const buffer=Buffer.from(response.data,"binary");
    const base64Image=buffer.toString("base64");

    const base64ImagewithMine=`data:image/png;base64,${base64Image}`;
    console.log(base64ImagewithMine);

    try{
        await setDoc(doc(db,"users",email,"logos",Date.now().toString()),{
            image:base64ImagewithMine,
            title:title,
            desc:desc
        })
    }
    catch(e){

    }

    return NextResponse.json({image:base64ImagewithMine});


    //logo generation by replica
    //   async function runReplicate() {
    //     const replicate = new Replicate({
    //       auth: process.env.REPLICATE_API_TOKEN,
    //     });

    //     const parsed = "Create a minimalist and elegant logo design for Rohit. The logo should incorporate a subtle flame silhouette, utilizing a color palette of earthy browns. The overall aesthetic should evoke a sense of luxury, tradition, and quality. Focus on typography and line art, with a touch of mystery and timelessness.  Emphasize a sophisticated and refined visual style suitable for Minimalist and Elegant branding.";

    //     try {
    //       const stream = await replicate.stream(
    //         "ideogram-ai/ideogram-v3-turbo",
    //         {
    //           input: {
    //             prompt: parsed,
    //             aspect_ratio: "3:2"
    //           }
    //         }
    //       );

    //       for await (const event of stream) {
    //         if (event.type === 'output') {
    //           console.log("Partial output received:", event.data);
    //         }
    //         if (event.type === 'done') {
    //           console.log("Final output:", event.data);
    //         }
    //       }
    //     } catch (error) {
    //       console.error("An error occurred during the Replicate API call:", error);
    //     }
    //   }

    //   runReplicate();

    // return NextResponse.json(parsed);

  } catch (e) {
    return NextResponse.json({error:e});
  }
}