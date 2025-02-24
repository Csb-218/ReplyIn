import { useState, useEffect } from 'react';
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { user } from "../../types"
import Home from "../../components/popup/Home"
import './App.css';


function App() {

  const [user, setUser] = useState<user | null>(null);

  const handleLogin = async () => {
    chrome.runtime.sendMessage({ type: 'GOOGLE_LOGIN' });
  };

  const handleLogout = () => {
    chrome.storage.local.remove(['user'], () => {
      setUser(null);
    });
  };

  useEffect(() => {
    // Check if user is already logged in
    chrome.storage.local.get(['user'], (result) => {
      if (result.user) {
        setUser(result.user);
      }
    });
  }, [user]);



  if (!user) {
    return (
      <>
        <button
          onClick={handleLogin}
          className="mt-4 flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-lg border hover:bg-gray-50"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-4 h-4"
          />
          Sign in with Google
        </button>
      </>

    )
  }


  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={
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
          </>
        }>
          <Route
            index
            element={<Home setUser={setUser} user={user} />}
            // hydrateFallbackElement={<div>Loading...</div>}
          />
        </Route>
      </Routes>
    </MemoryRouter>
    // <>
    //   <div className='p-4'>
    //     <p id='div' className='text-3xl'>Hi 👋🏻 </p>
    //     <h2> I am
    //       <span
    //         className='cursor-pointer mx-1 text-yellow-300 font-bold'
    //         onClick={() => window.open('https://github.com/Csb-218/ReplyIn')}
    //       >
    //         ReplyIn
    //       </span>
    //       - An AI text generator
    //     </h2>

    //     {!user ? (
    //       <button
    //         onClick={handleLogin}
    //         className="mt-4 flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-lg border hover:bg-gray-50"
    //       >
    //         <img 
    //           src="https://www.google.com/favicon.ico" 
    //           alt="Google" 
    //           className="w-4 h-4" 
    //         />
    //         Sign in with Google
    //       </button>
    //     ) : (
    // <div className="mt-4">
    //   <p className="text-sm">Logged in as: {user.email}</p>
    //   <button
    //     onClick={handleLogout}
    //     className="mt-2 text-sm text-red-500 hover:text-red-600"
    //   >
    //     Logout
    //   </button>
    // </div>
    //     )}

    //     <h2 className="mt-4">
    //       Open
    //       <span
    //         className='cursor-pointer mx-1 underline'
    //         onClick={() => window.open('https://linkedin.com')}
    //       >
    //         LinkedIn
    //       </span>
    //       to start!
    //     </h2>
    //   </div>
    // </>
  );
}

export default App;
