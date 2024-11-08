import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import generateIcon from '~/assets/Frame.svg';
import type { ContentScriptContext } from "wxt/client";
import './styles.css'


let AboutTheJobSection : string;

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
          ui.mount()
          alert('mounted')
        }

        // mutation observer
        const observer = new MutationObserver((mutations, observer) => {

          const messageBox = document.getElementsByTagName("textarea")[0]

          // alert(messageBox)
          console.log(messageBox)

          if (messageBox) {

            messageBox.parentElement?.appendChild(img)

            // Select the <h2> element that contains the text "About the job"
          const heading = Array.from(document.querySelectorAll('h2')).find(
            el => el.textContent?.trim() === "About the job"
          );

            AboutTheJobSection = heading?.parentNode?.textContent ? heading?.parentNode?.textContent : "";

            // chrome.runtime.sendMessage({ AboutTheJobSection });
            // Stop observing once the element is found
            observer.disconnect();

            console.log('disconnected')
            
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
    name: "generative-text-editor-modal",
    position: "inline",
    anchor: "body",
    append: "first",
    onMount: (container) => {
      
      alert('mount')
      // Don't mount react app directly on <body>
      const wrapper = document.createElement("div");
      container.append(wrapper);

      const root = ReactDOM.createRoot(wrapper);
        root.render(<App JD={AboutTheJobSection}/>);
        return { root, wrapper };

    },
    onRemove: (elements) => {
      elements?.root.unmount();
      elements?.wrapper.remove();
    },
  });
}
