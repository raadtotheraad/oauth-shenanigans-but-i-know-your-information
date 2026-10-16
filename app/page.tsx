"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logOutOptionsExpanded, setLogOutOptionsExpanded] = useState<boolean>(false);
  const[selectedOption, setSelectedOption] = useState<string | null>(null);

  function discordOAuth() {
    window.location.href = "/api/discord/auth";
  }

  function logOut() {
    if (selectedOption === 'discord') {
      fetch('/api/discord/log-out')
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        setIsLoggedIn(false);
        setSelectedOption(null);
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
    }
  }

  return (
    <>
      <div className="flex flex-row items-end justify-end bg-zinc-50 font-sans dark:bg-black px-4 py-2">
        <p>
          You are logged in.
        </p>
        {logOutOptionsExpanded && (
          <button className={`ml-4 translate-y-[4px] px-4 py-2 transition ${selectedOption === 'discord' && 'bg-indigo-500'} outline-[2.5px] outline-indigo-700 ${!logOutOptionsExpanded && 'inset-shadow-2xs inset-shadow-white/10'} enabled:active:inset-shadow-sm enabled:active:inset-shadow-indigo-900 text-white enabled:hover:bg-indigo-600 enabled:hover:cursor-pointer ${!logOutOptionsExpanded && 'enabled:hover:translate-y-[-2px]'}`} onClick={() => {setSelectedOption('discord');}}>
            Discord
          </button>
        )}
        <button className={`${logOutOptionsExpanded ? 'ml-1' : 'ml-4'} translate-y-[4px] px-4 py-2 transition outline-[2.5px] outline-gray-700 ${!logOutOptionsExpanded && 'inset-shadow-2xs inset-shadow-white/10'} enabled:active:inset-shadow-sm enabled:active:inset-shadow-gray-900 text-white ${logOutOptionsExpanded ? 'rounded-r-2xl' : 'rounded-2xl'} enabled:hover:bg-gray-600 enabled:hover:cursor-pointer ${!logOutOptionsExpanded && 'enabled:hover:translate-y-[-2px]'}`} onClick={() => setLogOutOptionsExpanded(!logOutOptionsExpanded)}>
          {logOutOptionsExpanded ? "Collapse Logout Options" : "Expand Logout Options"}
        </button>
        <button onClick={logOut} disabled={selectedOption === null} className="ml-4 translate-y-[4px] px-4 py-2 transition bg-red-500 outline-[2.5px] outline-red-700 inset-shadow-2xs inset-shadow-white/10 enabled:active:inset-shadow-sm enabled:active:inset-shadow-red-900 text-white rounded-2xl enabled:hover:bg-red-600 enabled:hover:cursor-pointer enabled:hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed">
          Log Out
        </button>
      </div>
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <Image className="rounded-xl" src="/evil-larry.jpg" alt="Evil Larry" width={300} height={300}/>
        <h1 className="text-2xl font-bold mt-4">Evil Larry is DEMANDING you sign in with OAuth</h1>
        <hr className="w-full max-w-md mt-4"></hr>
        <button onClick={discordOAuth} className="mt-4 px-4 py-2 transition bg-indigo-500 outline-[2.5px] outline-indigo-700 inset-shadow-2xs inset-shadow-white/10 enabled:active:inset-shadow-sm enabled:active:inset-shadow-indigo-900 text-white rounded-2xl enabled:hover:bg-indigo-600 enabled:hover:cursor-pointer enabled:hover:translate-y-[-2px]">
          Sign in with Discord OAuth
        </button>
        <hr className="w-full max-w-md mt-4"></hr>
        <button onClick={() => (window.location.href = "/view/discord")} className="mt-4 px-4 py-2 transition bg-indigo-500 outline-[2.5px] outline-indigo-700 inset-shadow-2xs inset-shadow-white/10 enabled:active:inset-shadow-sm enabled:active:inset-shadow-indigo-900 text-white rounded-2xl enabled:hover:bg-indigo-600 enabled:hover:cursor-pointer enabled:hover:translate-y-[-2px]">
          View Discord Information
        </button>
      </div>
    </>
  );
}
