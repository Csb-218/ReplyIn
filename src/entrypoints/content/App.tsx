import { useState, useRef } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Mistral } from "@mistralai/mistralai";
import {  getCandidate } from "@/server/API";
import { convert_to_readable, convert_to_readable_input ,toInputBox } from "@/utils/helpers";
import {JD} from '@/types'
import { jsPDF } from "jspdf";

const MistralApiKey1 = import.meta.env.WXT_MISTRAL_API_KEY1

const App = ({ JD, messageBox }: JD) => {

  const [content, setContent] = useState<string>(`Crafting your letter ... \n`);
  const [hide, setHide] = useState<boolean>(false);
  const [streaming,setStreaming] = useState<boolean>(false);

  const client = new Mistral({
    apiKey:  MistralApiKey1
  });

  let fullResponse:string = "";
  let cleanResponse : string;
  
  async function generateChatResponseStream(data: any, JD: string, client: any) {

    try {
      console.log(JD,data)

      const response = await client.chat.stream({
        model: 'mistral-large-latest',
        messages: [{
          role: 'user',
          content: `
          # Job description : ${JD} 
          # Candidate : ${JSON.stringify(data)} 
          
          # Write a suitable cover letter for the candidate using candidate's information. Don't provide a template. Tailor it according to the provided candidate's information. Use minute details such as candidate's address , phone number, candidate's name etc. to write a good cover letter. 
          ###Caution : Wherever you find null leave that field.
          ###Caution : Do not exceed more than 250 words

          - Avoid using "null" in any part of the cover letter. Skip missing fields without mentioning them.
          - Format the letter properly with paragraphs and line breaks.
          - Tailor the letter according to the job description and candidate's profile.
          
          `
        }],
      });

      setStreaming(true)

      for await (const chunk of response) {
        // console.log(chunk)
        const streamText = chunk.data.choices[0].delta.content;
        // Append the new chunk to the buffer
        fullResponse += streamText;
        // Filter null fields and clean up formatting
        cleanResponse = fullResponse
          .replace(/\n/g,"<br>")
          .trim(); // Trim whitespace from the beginning and end
        // Update the state with the full response so far
        setContent(cleanResponse); // Set the state with the accumulated response

      }

    } catch (err) {
      setStreaming(false)
      setContent((content) => content + 'error')
      alert(err)
    }finally{
      setStreaming(false)
      return cleanResponse
    }

    

  }

  async function generateCover() {

    const user = await chrome.storage.local.get(['user'])
    const email = user.user.email
    const candidate = await getCandidate(email)
    // console.log(candidate)
    
    const result = await generateChatResponseStream(candidate, JD, client)

    const readable_input = convert_to_readable_input(result)
    const readable = convert_to_readable(readable_input)
    setContent(readable)
    
  }



  useEffect(() => {

    generateCover()

  }, [JD])

  const downloadPDF = () => {
        // Initialize PDF document
        const doc = new jsPDF();
    
        // Set document properties
        const fontSize = 12;
        const lineHeight = fontSize * 1.2; // 1.2 is the default line height ratio
        const margin = 20;
        const pageWidth = doc.internal.pageSize.getWidth();
        const maxWidth = pageWidth - (margin * 2);
        
        // Configure text settings
        doc.setFont("helvetica"); // Default font
        doc.setFontSize(fontSize);
        doc.setLineHeightFactor(1.2);
    
        // Split text into paragraphs first
    const paragraphs = content.split('\n');
    let yPosition = margin;

    paragraphs.forEach(paragraph => {
        // Split each paragraph into multiple lines
        const lines = doc.splitTextToSize(paragraph, maxWidth);
        
        // Handle empty lines for spacing
        if (lines.length === 0) {
            yPosition += lineHeight;
            return;
        }

        lines.forEach((line: string | string[]) => {
            if (yPosition + lineHeight > doc.internal.pageSize.getHeight() - margin) {
                doc.addPage();
                yPosition = margin;
            }
            doc.text(line, margin, yPosition);
            yPosition += lineHeight;
        });
        
        // Add extra space between paragraphs
        yPosition += lineHeight * 0.5;
    });
    doc.save("cover_letter.pdf");
  };

  if( hide !== false){
    return <></>
    
  }
 

  return (
   
    <>
      {/* Modal */}
      <div
        id='modal backdrop'
        style={{
          zIndex: 500
        }}
        className={`fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-slate-300/20 backdrop-blur-sm`}
        aria-labelledby="header-2a content-2a"
        aria-modal="true"
        tab-index="-1"
        role="dialog">


        <div
          id='modal'
          className="flex max-h-[90vh] w-6/12  flex-col gap-6 overflow-hidden rounded-xl bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10">

          <header
            id="modal-header"
            className="flex items-center gap-4">
            <h3 className="flex-1 text-xl font-medium text-slate-700">Tailor your cover letter</h3>
            <button onClick={() => setHide(true)} className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded-full focus-visible:outline-none justify-self-center whitespace-nowrap text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent" id="modal" role="document" aria-label="close dialog">
              <span className="relative only:-mx-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" role="graphics-symbol" aria-labelledby="title-79 desc-79">
                  <title id="title-79">Icon title</title>
                  <desc id="desc-79">A more detailed description of the icon</desc>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
            </button>
          </header>

          {/* modal body */}
          <div id="content-2a" className="flex-1 overflow-auto">
            {/* text editor */}
            <ReactQuill theme="snow" value={content} onChange={setContent} />

            
          </div>

          <div className="flex justify-end gap-2">

            <button
              className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
              disabled={streaming}
              onClick={() => {
                setHide(true)
                messageBox.innerHTML = toInputBox(content)
              }}
            >
              <span>Continue</span>
            </button>

            <button
              className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
              onClick={downloadPDF}
            >
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </>

  );
};

export default App