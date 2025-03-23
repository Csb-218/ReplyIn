import React from 'react'
import {Outlet} from "react-router-dom"

const Layout = () => {
  return (
    <>
    <p id='div' className='text-3xl'>Hi 👋🏻 </p>
    <h2> I am
      <span
        className='cursor-pointer mx-1 text-yellow-300 font-bold'
        onClick={() => window.open('https://github.com/Csb-218/ReplyIn')}
      >
        ReplyIn
      </span>
      - An AI text generator
    </h2>
    <Outlet/>
  </>
  )
}

export default Layout