import React, { useState, useEffect } from 'react';
import './App.css';


function App() {



  return (
    <>
      <div className='  '>
        <p id='div' className='text-3xl'>Hi 👋🏻 </p>
        <h2> I am
          <span
            className='cursor-pointer mx-1 text-yellow-300 font-bold'
            onClick={() => window.open('https://github.com/Csb-218/ReplyIn')}
          >

            ReplyIn
          </span>


          - An AI text generator</h2>

        <h2>
          Open
          <span
            className='cursor-pointer mx-1 underline'
            onClick={() => window.open('https://linkedin.com')}
          >
            LinkedIn
          </span>
          to start !
        </h2>
      </div>

    </>
  );
}

export default App;
