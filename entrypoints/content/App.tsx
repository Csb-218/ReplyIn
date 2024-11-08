import { useState } from "react";
import ModalActionButton from "@/components/ModalActionButton";
import { Mistral } from "@mistralai/mistralai";
import { createClient } from '@supabase/supabase-js';
import { Database } from "@/utils/supabase";
import { generateChatResponse,getCandidate } from "@/server/API";

interface JD{
  JD : string
}

const App =({JD}:JD) => {

  const [generating,setGenerating] = useState<boolean>(false)
  const [coverLetter,setCoverLetter] = useState<string>('')
  // const [JD,setJD] = useState<string>(JD)
  const client = new Mistral({
    apiKey: 'PyBqviCN1xwhAv2V6677tjxsl19Pk9ka'
  });

  alert(import.meta.env.WXT_MISTRAL_API_KEY1)

  const db_url = 'https://bxmbmbjyekriyoefgxwq.supabase.co'!
  const db_api_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4bWJtYmp5ZWtyaXlvZWZneHdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg3NTE4ODMsImV4cCI6MjA0NDMyNzg4M30.jZmls3wISihsyNtXc6TNK7JCaFimqa0i15f-_ELJsqs'!
  // Create a single supabase client for interacting with your database
  const supabase = createClient<Database>(db_url, db_api_key)
  

  async function generateCover(){

    const candidate = await getCandidate(supabase)
    const cover_letter = await generateChatResponse(candidate,JD,client)
    setCoverLetter(cover_letter)
    setGenerating(false)
  }

  useEffect(()=>{
     setGenerating(true)
     generateCover()
    

  },[JD])
  

  return (
    <div>
      <ModalActionButton coverLetter={coverLetter} generating={generating}/>
    </div>
  );
};

export default App