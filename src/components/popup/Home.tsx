import React from 'react'
import { user } from '../../types'


const Home = (
  {
    setUser,
    user
  }: 

  { 
    setUser: React.Dispatch<React.SetStateAction<user | null>> ,
    user: user
  }) => {

  const handleLogout = () => {
    chrome.storage.local.remove(['user'], () => {
      setUser(null);
    });
  };

  return (
    <div className='p-4'>
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
        <div className="mt-4">
             <p className="text-sm">Logged in as: {user.email}</p>
             <button
              onClick={handleLogout}
              className="mt-2 text-sm text-red-500 hover:text-red-600"
            >
              Logout
            </button>
          </div>
          <h2 className="mt-4">
           Open
           <span
            className='cursor-pointer mx-1 underline'
            onClick={() => window.open('https://linkedin.com')}
          >
            LinkedIn
          </span>
          to start!
        </h2>
      </div>

  )
}

export default Home