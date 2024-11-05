import generateIcon from '~/assets/Frame.svg';
import sendIcon from '~/assets/Vector.svg'
import insertIcon from '~/assets/insertIcon.svg'
import regenerateIcon from '~/assets/regenerateIcon.svg'
import type { ContentScriptContext } from "wxt/client";
import "~/assets/tailwind.css";
import { Mistral } from "@mistralai/mistralai";
import { createClient } from '@supabase/supabase-js';
import { Database } from "@/utils/supabase";


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
        img.style.position = 'absolute'
        img.style.bottom = '0px'
        img.style.right = '2px'
        img.style.cursor = 'pointer'

        async function getCandidate() {


          const { data, error } = await supabase
            .from('candidates')
            .select()
            .eq('id', 1)

          // alert(error)

          // console.error(error)
          return data

        }

        async function generateChatResponse(data: any, JD: string) {

          console.log(JSON.stringify(data))

          const response = await client.chat.complete({
            model: 'mistral-large-latest',
            messages: [{
              role: 'user',

              // content:Hey Mistral, Can you read and print a json ? If yes read and print it . ### JSON: ${JSON.stringify(data)}

              content: `
                 # Job description : ${JD} 
                 # Candidate : ${JSON.stringify(data)} 
                 
                 # Write a suitable cover letter for the candidate using candidate's information. Don't provide a template. Tailor it according to the provided candidate's information. Use minute details such as candidate's address , phone number, candidate's name etc. to write a good cover letter. 
                 ###Caution : Wherever you find null leave that field.`
            }],
          });

          alert(response)
          if (response.choices && response.choices.length > 0 && response.choices[0].message) {
            return response.choices[0].message.content;
          } else {
            console.error("API response is missing 'choices' or 'message' content.");
            return ""; // or handle the error as needed
          }


        }
        


        // insert generate icon on focus
        async function listenFocus(event: Event) {
          // alert('listening')
          const messageBox = event.currentTarget as HTMLElement;
          img.onclick = () => {
            alert('listening')
            ui.mount();


            
            // messageBox.textContent = '' 
          }

          messageBox.parentNode?.appendChild(img)

          // Select the <h2> element that contains the text "About the job"
          const heading = Array.from(document.querySelectorAll('h2')).find(
            el => el.textContent?.trim() === "About the job"
          );

          if (heading) {
            console.log(heading);
            // messageBox.innerText = "csb"
            const AboutTheJobSection = heading.parentNode?.textContent ? heading.parentNode?.textContent : "";

            // alert("start")
            const candidate: any = await getCandidate()
            // alert(candidate)
            ui.mount();
            const chat: any = await generateChatResponse(candidate, AboutTheJobSection)
            alert(chat)
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

            alert(messageBox.toString())
            // listen to focus
            messageBox?.addEventListener("focus", listenFocus)
            // Stop observing once the element is found
            observer.disconnect();
            // listen to blur
            messageBox?.addEventListener("blur", removeFocus)
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
    name: "tailwind-shadow-root-example",
    position: "inline",
    anchor: "body",
    append: "first",
    onMount: (uiContainer) => {

      // modal backdrop
      const ModalBackdrop = document.createElement('div')
      ModalBackdrop.className = "fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-slate-300/20 backdrop-blur-sm"
      ModalBackdrop.ariaLabel = 'header-3a content-3a'
      ModalBackdrop.ariaModal = 'true'
      ModalBackdrop.tabIndex = -1
      ModalBackdrop.role = 'dialog'
      ModalBackdrop.addEventListener('click', function (event) {
        if (event.target === ModalBackdrop) {
          ModalBackdrop.classList.add('hidden');
        }
      });

      // modal container
      const Modal = document.createElement('div')
      Modal.className = "flex max-h-[90vh] w-4/12  flex-col gap-6 overflow-hidden rounded-xl bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
      Modal.id = "modal"
      Modal.role = "dialog"

      // modal body
      const ModalBody = document.createElement('div')
      ModalBody.id = 'content-3a'
      ModalBody.className = "flex-1 overflow-auto"

      // modal input
      const ModalInput = document.createElement('input')
      ModalInput.value = "Reply thanking for the opportunity"
      ModalInput.className = 'p-2 w-full border-[0.5px] rounded-md border-gray-200 text-lg'

      // modal actions container
      const ModalActions = document.createElement("div")
      ModalActions.className = "flex justify-end gap-2 "

      // insert button
      const insertButton = document.createElement("button")
      insertButton.className = 'hidden inline-flex flex-row-reverse items-center justify-center h-10 gap-2 px-5 text-base font-medium tracking-wide text-gray-500 border-gray-500 border-[1px] transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-white hover:bg-gray-100 focus:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-100 disabled:shadow-none'
      insertButton.textContent = 'Insert'
      // insert icon
      const insertsvg = document.createElement("img")
      insertsvg.src = insertIcon
      insertsvg.className = "h-3"
      insertButton.appendChild(insertsvg)
      // insert button action
      insertButton.onclick = () => {

        const messageBox: HTMLInputElement = document.querySelector('div.msg-form__contenteditable ') as HTMLInputElement;

        messageBox.innerHTML = `<p>Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.</p>`
        messageBox.value = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."

        messageBox.dispatchEvent(new Event('change', { bubbles: true }));
        messageBox.dispatchEvent(new Event('input', { bubbles: true }))

        const messageBoxPlace: HTMLElement = document.querySelector('div.msg-form__placeholder ') as HTMLElement;
        messageBoxPlace.innerHTML = " "
        messageBoxPlace.dataset.placeholder = " "

        const button = document.querySelector('button.msg-form__send-button') as HTMLButtonElement;
        button.disabled = false

        ModalBackdrop.classList.add("hidden")
      }

      // regenerate button
      const regenerateButton = document.createElement("button")
      regenerateButton.className = 'hidden inline-flex flex-row-reverse items-center justify-center h-10 gap-2 px-5 text-base font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none'
      regenerateButton.innerText = "Regenerate"
      // send icon
      const regeneratesvg = document.createElement("img")
      regeneratesvg.src = regenerateIcon
      regeneratesvg.className = "h-6"
      regenerateButton.appendChild(regeneratesvg)


      // generate button
      const GenerateButton = document.createElement("button")
      GenerateButton.className = 'inline-flex flex-row-reverse items-center justify-center h-10 gap-2 px-5 text-base font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none'
      GenerateButton.innerText = "Generate"
      // send icon
      const Iconsvg = document.createElement("img")
      Iconsvg.src = sendIcon
      Iconsvg.className = "h-6"
      GenerateButton.appendChild(Iconsvg)

      // generate button action
      GenerateButton.onclick = () => {
        DummyResponse.classList.remove("hidden")
        GenerateButton.classList.add("hidden")
        insertButton.classList.remove("hidden")
        regenerateButton.classList.remove("hidden")
        ModalInput.value = ''
        ModalInput.placeholder = 'Your Prompt'
      }

      // dummy responses
      const DummyResponse = document.createElement("div")
      DummyResponse.className = "grid grid-cols-6 gap-6 hidden mb-4"
      // user text
      const userText = document.createElement('p')
      userText.textContent = 'Reply thanking for the opportunity'
      userText.className = "bg-gray-100 text-gray-500 text-lg p-2 rounded-md col-end-7 col-span-4"
      // reply text
      const ReplyText = document.createElement('p')
      ReplyText.textContent = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
      ReplyText.className = "bg-[#DBEAFE] text-gray-500 text-lg p-2 rounded-md col-start-1 col-span-5"




      ModalBackdrop.appendChild(Modal)

      Modal.appendChild(ModalBody)

      ModalBody.appendChild(DummyResponse)

      DummyResponse.appendChild(userText)
      DummyResponse.appendChild(ReplyText)

      ModalBody.appendChild(ModalInput)

      Modal.appendChild(ModalActions)

      ModalActions.appendChild(GenerateButton)
      ModalActions.appendChild(insertButton)
      ModalActions.appendChild(regenerateButton)

      uiContainer.append(ModalBackdrop);
    },
  });
}
