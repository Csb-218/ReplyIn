import React, { useState, useEffect } from 'react';
import './App.css';


function App(){

  const [count, setCount] = useState(0);
  const [permitted, setPermission] = useState<boolean>(false);
  const [colour, setColour] = useState<string>('yellow')
  const [tab, setTab] = useState<any>(0)

  var x: any
 

  function help(colour:string){
    const form = document.getElementById("msg-form-ember137") as HTMLFormElement;

    const img = document.createElement('img');
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDIiIGhlaWdodD0iNDIiIHZpZXdCb3g9IjAgMCA0MiA0MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZGRfM18zNykiPgo8cmVjdCB4PSI1IiB5PSIxIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSIxNiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTI4LjQ2NjcgMTguNzMzM0MyOC40NjY3IDE4Ljg4NjYgMjguNDA2MyAxOS4wMzM1IDI4LjI5ODkgMTkuMTQxOUMyOC4xOTE1IDE5LjI1MDIgMjguMDQ1OCAxOS4zMTExIDI3Ljg5MzggMTkuMzExMUgyNi43NDgyVjIwLjQ2NjdDMjYuNzQ4MiAyMC42MTk5IDI2LjY4NzkgMjAuNzY2OCAyNi41ODA0IDIwLjg3NTJDMjYuNDczIDIwLjk4MzYgMjYuMzI3MyAyMS4wNDQ0IDI2LjE3NTQgMjEuMDQ0NEMyNi4wMjM1IDIxLjA0NDQgMjUuODc3OCAyMC45ODM2IDI1Ljc3MDMgMjAuODc1MkMyNS42NjI5IDIwLjc2NjggMjUuNjAyNiAyMC42MTk5IDI1LjYwMjYgMjAuNDY2N1YxOS4zMTExSDI0LjQ1NjlDMjQuMzA1IDE5LjMxMTEgMjQuMTU5MyAxOS4yNTAyIDI0LjA1MTkgMTkuMTQxOUMyMy45NDQ1IDE5LjAzMzUgMjMuODg0MSAxOC44ODY2IDIzLjg4NDEgMTguNzMzM0MyMy44ODQxIDE4LjU4MDEgMjMuOTQ0NSAxOC40MzMxIDI0LjA1MTkgMTguMzI0OEMyNC4xNTkzIDE4LjIxNjQgMjQuMzA1IDE4LjE1NTUgMjQuNDU2OSAxOC4xNTU1SDI1LjYwMjZWMTdDMjUuNjAyNiAxNi44NDY3IDI1LjY2MjkgMTYuNjk5OCAyNS43NzAzIDE2LjU5MTRDMjUuODc3OCAxNi40ODMxIDI2LjAyMzUgMTYuNDIyMiAyNi4xNzU0IDE2LjQyMjJDMjYuMzI3MyAxNi40MjIyIDI2LjQ3MyAxNi40ODMxIDI2LjU4MDQgMTYuNTkxNEMyNi42ODc5IDE2LjY5OTggMjYuNzQ4MiAxNi44NDY3IDI2Ljc0ODIgMTdWMTguMTU1NUgyNy44OTM4QzI4LjA0NTggMTguMTU1NSAyOC4xOTE1IDE4LjIxNjQgMjguMjk4OSAxOC4zMjQ4QzI4LjQwNjMgMTguNDMzMSAyOC40NjY3IDE4LjU4MDEgMjguNDY2NyAxOC43MzMzWk0xNC43MTkgMTIuOTU1NUgxNS44NjQ2VjE0LjExMTFDMTUuODY0NiAxNC4yNjQzIDE1LjkyNSAxNC40MTEzIDE2LjAzMjQgMTQuNTE5NkMxNi4xMzk4IDE0LjYyOCAxNi4yODU1IDE0LjY4ODkgMTYuNDM3NSAxNC42ODg5QzE2LjU4OTQgMTQuNjg4OSAxNi43MzUxIDE0LjYyOCAxNi44NDI1IDE0LjUxOTZDMTYuOTQ5OSAxNC40MTEzIDE3LjAxMDMgMTQuMjY0MyAxNy4wMTAzIDE0LjExMTFWMTIuOTU1NUgxOC4xNTU5QzE4LjMwNzggMTIuOTU1NSAxOC40NTM1IDEyLjg5NDcgMTguNTYxIDEyLjc4NjNDMTguNjY4NCAxMi42NzggMTguNzI4NyAxMi41MzEgMTguNzI4NyAxMi4zNzc4QzE4LjcyODcgMTIuMjI0NSAxOC42Njg0IDEyLjA3NzYgMTguNTYxIDExLjk2OTJDMTguNDUzNSAxMS44NjA5IDE4LjMwNzggMTEuOCAxOC4xNTU5IDExLjhIMTcuMDEwM1YxMC42NDQ0QzE3LjAxMDMgMTAuNDkxMiAxNi45NDk5IDEwLjM0NDIgMTYuODQyNSAxMC4yMzU5QzE2LjczNTEgMTAuMTI3NSAxNi41ODk0IDEwLjA2NjcgMTYuNDM3NSAxMC4wNjY3QzE2LjI4NTUgMTAuMDY2NyAxNi4xMzk4IDEwLjEyNzUgMTYuMDMyNCAxMC4yMzU5QzE1LjkyNSAxMC4zNDQyIDE1Ljg2NDYgMTAuNDkxMiAxNS44NjQ2IDEwLjY0NDRWMTEuOEgxNC43MTlDMTQuNTY3MSAxMS44IDE0LjQyMTQgMTEuODYwOSAxNC4zMTQgMTEuOTY5MkMxNC4yMDY1IDEyLjA3NzYgMTQuMTQ2MiAxMi4yMjQ1IDE0LjE0NjIgMTIuMzc3OEMxNC4xNDYyIDEyLjUzMSAxNC4yMDY1IDEyLjY3OCAxNC4zMTQgMTIuNzg2M0MxNC40MjE0IDEyLjg5NDcgMTQuNTY3MSAxMi45NTU1IDE0LjcxOSAxMi45NTU1Wk0yMy44ODQxIDIxLjYyMjJIMjMuMzExM1YyMS4wNDQ0QzIzLjMxMTMgMjAuODkxMiAyMy4yNTA5IDIwLjc0NDIgMjMuMTQzNSAyMC42MzU5QzIzLjAzNjEgMjAuNTI3NSAyMi44OTA0IDIwLjQ2NjcgMjIuNzM4NSAyMC40NjY3QzIyLjU4NjYgMjAuNDY2NyAyMi40NDA5IDIwLjUyNzUgMjIuMzMzNCAyMC42MzU5QzIyLjIyNiAyMC43NDQyIDIyLjE2NTcgMjAuODkxMiAyMi4xNjU3IDIxLjA0NDRWMjEuNjIyMkgyMS41OTI4QzIxLjQ0MDkgMjEuNjIyMiAyMS4yOTUyIDIxLjY4MzEgMjEuMTg3OCAyMS43OTE0QzIxLjA4MDQgMjEuODk5OCAyMS4wMiAyMi4wNDY3IDIxLjAyIDIyLjJDMjEuMDIgMjIuMzUzMiAyMS4wODA0IDIyLjUwMDIgMjEuMTg3OCAyMi42MDg1QzIxLjI5NTIgMjIuNzE2OSAyMS40NDA5IDIyLjc3NzggMjEuNTkyOCAyMi43Nzc4SDIyLjE2NTdWMjMuMzU1NUMyMi4xNjU3IDIzLjUwODggMjIuMjI2IDIzLjY1NTcgMjIuMzMzNCAyMy43NjQxQzIyLjQ0MDkgMjMuODcyNCAyMi41ODY2IDIzLjkzMzMgMjIuNzM4NSAyMy45MzMzQzIyLjg5MDQgMjMuOTMzMyAyMy4wMzYxIDIzLjg3MjQgMjMuMTQzNSAyMy43NjQxQzIzLjI1MDkgMjMuNjU1NyAyMy4zMTEzIDIzLjUwODggMjMuMzExMyAyMy4zNTU1VjIyLjc3NzhIMjMuODg0MUMyNC4wMzYgMjIuNzc3OCAyNC4xODE3IDIyLjcxNjkgMjQuMjg5MiAyMi42MDg1QzI0LjM5NjYgMjIuNTAwMiAyNC40NTY5IDIyLjM1MzIgMjQuNDU2OSAyMi4yQzI0LjQ1NjkgMjIuMDQ2NyAyNC4zOTY2IDIxLjg5OTggMjQuMjg5MiAyMS43OTE0QzI0LjE4MTcgMjEuNjgzMSAyNC4wMzYgMjEuNjIyMiAyMy44ODQxIDIxLjYyMjJaTTI2LjQxMjQgMTMuNTMzM0wxNi40Mzc1IDIzLjU5NDZDMTYuMjIyNiAyMy44MTExIDE1LjkzMTMgMjMuOTMyOCAxNS42Mjc2IDIzLjkzMjhDMTUuMzIzOSAyMy45MzI4IDE1LjAzMjYgMjMuODExMSAxNC44MTc4IDIzLjU5NDZMMTMuMzM1NiAyMi4xMDFDMTMuMjI5MiAyMS45OTM3IDEzLjE0NDggMjEuODY2MyAxMy4wODcyIDIxLjcyNjFDMTMuMDI5NiAyMS41ODU5IDEzIDIxLjQzNTYgMTMgMjEuMjgzOEMxMyAyMS4xMzIxIDEzLjAyOTYgMjAuOTgxOCAxMy4wODcyIDIwLjg0MTZDMTMuMTQ0OCAyMC43MDE0IDEzLjIyOTIgMjAuNTc0IDEzLjMzNTYgMjAuNDY2N0wyMy4zMTEzIDEwLjQwNTRDMjMuNDE3NyAxMC4yOTggMjMuNTQ0IDEwLjIxMjkgMjMuNjgzIDEwLjE1NDhDMjMuODIyIDEwLjA5NjcgMjMuOTcxIDEwLjA2NjggMjQuMTIxNSAxMC4wNjY4QzI0LjI3MTkgMTAuMDY2OCAyNC40MjA5IDEwLjA5NjcgMjQuNTU5OSAxMC4xNTQ4QzI0LjY5OSAxMC4yMTI5IDI0LjgyNTMgMTAuMjk4IDI0LjkzMTcgMTAuNDA1NEwyNi40MTI0IDExLjg5ODlDMjYuNTE4OCAxMi4wMDYyIDI2LjYwMzIgMTIuMTMzNiAyNi42NjA4IDEyLjI3MzhDMjYuNzE4NCAxMi40MTQxIDI2Ljc0OCAxMi41NjQ0IDI2Ljc0OCAxMi43MTYxQzI2Ljc0OCAxMi44Njc5IDI2LjcxODQgMTMuMDE4MiAyNi42NjA4IDEzLjE1ODRDMjYuNjAzMiAxMy4yOTg2IDI2LjUxODggMTMuNDI2IDI2LjQxMjQgMTMuNTMzM1pNMjUuNjAyNiAxMi43MTY1TDI0LjEyMTEgMTEuMjIyMkwyMS44Mjk4IDEzLjUzMzNMMjMuMzExMyAxNS4wMjc2TDI1LjYwMjYgMTIuNzE2NVoiIGZpbGw9IiMyNTYzRUIiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kZF8zXzM3IiB4PSIwIiB5PSIwIiB3aWR0aD0iNDIiIGhlaWdodD0iNDIiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU1vcnBob2xvZ3kgcmFkaXVzPSIxIiBvcGVyYXRvcj0iZXJvZGUiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3dfM18zNyIvPgo8ZmVPZmZzZXQgZHk9IjQiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMyIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4xIDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3dfM18zNyIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz4KPGZlTW9ycGhvbG9neSByYWRpdXM9IjIiIG9wZXJhdG9yPSJlcm9kZSIgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9ImVmZmVjdDJfZHJvcFNoYWRvd18zXzM3Ii8+CjxmZU9mZnNldCBkeT0iMiIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjEgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93XzNfMzciIHJlc3VsdD0iZWZmZWN0Ml9kcm9wU2hhZG93XzNfMzciLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QyX2Ryb3BTaGFkb3dfM18zNyIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K'
    img.alt = 'generate'
    img.style.width = '32px'
    img.style.height = '32px'
    img.style.position = 'absolute'
    img.style.bottom = '0px'
    img.style.right = '2px'
    img.style.cursor = 'pointer'  

  
    const p = document.querySelector('div.msg-form__contenteditable ') as HTMLInputElement;

    p.innerHTML = `<p>Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.</p>`

    p.value = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."

    p.appendChild(img)

    p.dispatchEvent(new Event('change', { bubbles: true }));
    p.dispatchEvent(new Event('input', { bubbles: true }))

    const q = document.querySelector('div.msg-form__placeholder ') as HTMLElement;
    q.innerHTML = " "
    q.dataset.placeholder = " "

    const button = document.querySelector('button.msg-form__send-button') as HTMLButtonElement;
    button.disabled = false

  }

  function changeBackgroundColor(colour: string) {

    chrome.scripting.executeScript({
      target: { tabId: tab },
      func: help ,
      args: [colour],
    })
      .then(() => {
        const p = document.querySelectorAll('div');
        console.log(p)
        console.log("injected a " + colour)
      })
      .catch(err => console.log(err));
  }


  async function getPermission() {
    chrome.permissions.request(
      {
        permissions: ["tabs"],
        origins: ["https://www.linkedin.com/*", "https://www.google.com/*"]
      }, (granted) => {
        console.log(granted)

        setPermission(!permitted)
      }

    )
    // alert("yes")

  }

  async function jake() {

    let queryOptions = {};
    // `tab` will either be a `tabs.Tab` instance or `undefined`.

    let [tab] = await chrome.tabs.query(queryOptions);
    let { id } = tab

    setTab(id)

    console.log(tab, 'hi', id)
  }

  useEffect(() => {

    permitted && jake()

  }, [permitted])



  return (
    <>
      <h1 id='div'>ReplyI 519</h1>

      <p className="text-orange-400">ReplyIn </p>

      <div className="w-full bg-pink-950 rounded border-2 border-neutral-950">
        text

    </div>

      <button onClick={getPermission}>
        yes
      </button>
      <button onClick={() => changeBackgroundColor('red')}>
        red</button>

      <button onClick={() => changeBackgroundColor('green')}>
        green</button>
    </>
  );
}

export default App;
