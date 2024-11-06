import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import generateIcon from '~/assets/Frame.svg';
import type { ContentScriptContext } from "wxt/client";
import "~/assets/tailwind.css";
import { Mistral } from "@mistralai/mistralai";
import { createClient } from '@supabase/supabase-js';
import { Database } from "@/utils/supabase";
import { getCandidate,generateChatResponse } from '@/server/API';


// Load environment variables from .env file


const client = new Mistral({
  apiKey: 'PyBqviCN1xwhAv2V6677tjxsl19Pk9ka'
});

const db_url: string = 'https://bxmbmbjyekriyoefgxwq.supabase.co'
const db_api_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4bWJtYmp5ZWtyaXlvZWZneHdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg3NTE4ODMsImV4cCI6MjA0NDMyNzg4M30.jZmls3wISihsyNtXc6TNK7JCaFimqa0i15f-_ELJsqs'
// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(db_url, db_api_key)



export default defineContentScript({
  matches: ["*://*.linkedin.com/*", '*://*.wellfound.com/*'],
  cssInjectionMode: 'ui',
  runAt: 'document_end',

  async main(ctx) {

    chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {

      // message recieved
      if (request.message === "PageUpdated") {

        // icon initialization
        const img: HTMLImageElement = document.createElement('img');
        img.src = generateIcon
        img.id = 'generateIcon'
        img.alt = 'generate'
        img.style.width = '32px'
        img.style.height = '32px'
        img.style.position = 'relative'
        img.style.bottom='40px',
        img.style.left='340px'
        img.style.cursor = 'pointer'

        img.onclick = () => {
          alert('listening')
          ui.mount();


          
          // messageBox.textContent = '' 
        }

        // document.body.style.backgroundColor = 'black'
        alert(document.body.style.backgroundColor)
        document.body.style.backgroundImage = generateIcon
        // document.body.appendChild(img)

        // async function getCandidate() {

        //   const { data, error } = await supabase
        //     .from('candidates')
        //     .select()
        //     .eq('id', 1)

        //   return data

        // }

        // async function generateChatResponse(data: any, JD: string) {

        //   console.log(JSON.stringify(data))

        //   const response = await client.chat.complete({
        //     model: 'mistral-large-latest',
        //     messages: [{
        //       role: 'user',
        //       content: `
        //          # Job description : ${JD} 
        //          # Candidate : ${JSON.stringify(data)} 
                 
        //          # Write a suitable cover letter for the candidate using candidate's information. Don't provide a template. Tailor it according to the provided candidate's information. Use minute details such as candidate's address , phone number, candidate's name etc. to write a good cover letter. 
        //          ###Caution : Wherever you find null leave that field.`
        //     }],
        //   });

        //   alert(response)
        //   if (response.choices && response.choices.length > 0 && response.choices[0].message) {
        //     return response.choices[0].message.content;
        //   } else {
        //     console.error("API response is missing 'choices' or 'message' content.");
        //     return ""; // or handle the error as needed
        //   }


        // }
        


        // insert generate icon on focus
        async function listenFocus(event: Event) {
          // alert('listening')
          const messageBox = event.currentTarget as HTMLElement;
          img.onclick = () => {
            alert('listening')
            // ui.mount();


            
            // messageBox.textContent = '' 
          }
          const blank:HTMLDivElement = document.createElement('div');
          blank.innerHTML = `
          Hi
          `
          blank.style.position = 'absolute'
          blank.style.top = '10px'
          blank.style.left = '10px'
          blank.style.height = '767px'
          blank.style.backgroundColor = 'blue'

          // document.body.innerHTML = '<></>'
          // document.body.appendChild(img)

          // Select the <h2> element that contains the text "About the job"
          const heading = Array.from(document.querySelectorAll('h2')).find(
            el => el.textContent?.trim() === "About the job"
          );

          if (heading) {
            console.log(heading);
            // messageBox.innerText = "csb"
            const AboutTheJobSection = heading.parentNode?.textContent ? heading.parentNode?.textContent : "";

            // alert("start")
            const candidate: any = await getCandidate(supabase)
            // alert(candidate)
            ui.mount();
            const chat: any = await generateChatResponse(candidate, AboutTheJobSection,client)
            alert(chat+' hi')
            messageBox.innerText = chat ? chat : AboutTheJobSection

          }
        }

        // remove generate icon on blur
        function removeFocus(event: Event) {
          const messageBox = event.currentTarget as HTMLElement;
          // img && messageBox.removeChild(img)
        }

        // mutation observer
        const observer = new MutationObserver((mutations, observer) => {

          const messageBox = document.getElementsByTagName("textarea")[0]

          // alert(messageBox)
          console.log(messageBox)

          if (messageBox) {

            messageBox.parentElement?.appendChild(img)
           
            alert(messageBox.toString())
            // listen to focus
            // messageBox?.addEventListener("focus", listenFocus)
            // Stop observing once the element is found
            observer.disconnect();
            // listen to blur
            // messageBox?.addEventListener("blur", removeFocus)
          }
        });

        observer.observe(document, {
          childList: true,
          subtree: true
        });

        // Send a response back
        sendResponse({
          status: "success",
          response: "message recieved"
        });

        return true

      }
    })

    const ui = await createUi(ctx);


  }
});

function createUi(ctx: ContentScriptContext) {
  return createShadowRootUi(ctx, {
    name: "Generative Text Editor Modal",
    position: "inline",
    anchor: "body",
    append: "first",
    onMount: (container) => {

      // Don't mount react app directly on <body>
      const wrapper = document.createElement("div");
      container.append(wrapper);

      const root = ReactDOM.createRoot(wrapper);
        root.render(<App />);
        return { root, wrapper };

    },
  });
}
