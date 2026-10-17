"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logOutOptionsExpanded, setLogOutOptionsExpanded] = useState<boolean>(false);
  const[selectedOption, setSelectedOption] = useState<string | null>(null);

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
        console.error('Error logging out on Discord:', error);
      });
    } else if (selectedOption === 'hackclub') {
      fetch('/api/hackclub/log-out')
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        setIsLoggedIn(false);
        setSelectedOption(null);
      })
      .catch(error => {
        console.error('Error logging out on Hack Club:', error);
      });
    } else if (selectedOption === 'hackatime') {
      fetch('/api/hackatime/log-out')
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        setIsLoggedIn(false);
        setSelectedOption(null);
      })
      .catch(error => {
        console.error('Error logging out on Hackatime:', error);
      });
    } else if (selectedOption === 'roblox') {
      fetch('/api/roblox/log-out')
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        setIsLoggedIn(false);
        setSelectedOption(null);
      })
      .catch(error => {
        console.error('Error logging out on Roblox:', error);
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
          <>
            <button className={`ml-4 translate-y-[4px] px-4 py-2 transition ${selectedOption === 'roblox' && 'bg-blue-500'} outline-[2.5px] outline-blue-700 ${!logOutOptionsExpanded && 'inset-shadow-2xs inset-shadow-white/10'} enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-blue-900 text-white enabled:hover:bg-blue-600 enabled:hover:cursor-pointer ${!logOutOptionsExpanded && 'enabled:hover:translate-y-[-2px]'}`} onClick={() => {setSelectedOption('roblox');}}>
              Roblox
            </button>
            <button className={`ml-1 translate-y-[4px] px-4 py-2 transition ${selectedOption === 'hackatime' && 'bg-gray-500'} outline-[2.5px] outline-gray-700 ${!logOutOptionsExpanded && 'inset-shadow-2xs inset-shadow-white/10'} enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-gray-900 text-white enabled:hover:bg-gray-600 enabled:hover:cursor-pointer ${!logOutOptionsExpanded && 'enabled:hover:translate-y-[-2px]'}`} onClick={() => {setSelectedOption('hackatime');}}>
              Hackatime
            </button>
            <button className={`ml-1 translate-y-[4px] px-4 py-2 transition ${selectedOption === 'hackclub' && 'bg-rose-500'} outline-[2.5px] outline-rose-700 ${!logOutOptionsExpanded && 'inset-shadow-2xs inset-shadow-white/10'} enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-rose-900 text-white enabled:hover:bg-rose-600 enabled:hover:cursor-pointer ${!logOutOptionsExpanded && 'enabled:hover:translate-y-[-2px]'}`} onClick={() => {setSelectedOption('hackclub');}}>
              Hack Club
            </button>
            <button className={`ml-1 translate-y-[4px] px-4 py-2 transition ${selectedOption === 'discord' && 'bg-indigo-500'} outline-[2.5px] outline-indigo-700 ${!logOutOptionsExpanded && 'inset-shadow-2xs inset-shadow-white/10'} enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-indigo-900 text-white enabled:hover:bg-indigo-600 enabled:hover:cursor-pointer ${!logOutOptionsExpanded && 'enabled:hover:translate-y-[-2px]'}`} onClick={() => {setSelectedOption('discord');}}>
              Discord
            </button>
          </>
        )}
        <button className={`${logOutOptionsExpanded ? 'ml-1' : 'ml-4'} translate-y-[4px] px-4 py-2 transition outline-[2.5px] outline-gray-700 ${!logOutOptionsExpanded && 'inset-shadow-2xs inset-shadow-white/10'} enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-gray-900 text-white ${logOutOptionsExpanded ? 'rounded-r-2xl' : 'rounded-2xl'} enabled:hover:bg-gray-600 enabled:hover:cursor-pointer ${!logOutOptionsExpanded && 'enabled:hover:translate-y-[-2px]'}`} onClick={() => setLogOutOptionsExpanded(!logOutOptionsExpanded)}>
          {logOutOptionsExpanded ? "Collapse Logout Options" : "Expand Logout Options"}
        </button>
        <button onClick={logOut} disabled={selectedOption === null} className="ml-4 translate-y-[4px] px-4 py-2 transition bg-red-500 outline-[2.5px] outline-red-700 inset-shadow-2xs inset-shadow-white/10 enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-red-900 text-white rounded-2xl enabled:hover:bg-red-600 enabled:hover:cursor-pointer enabled:hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed">
          Log Out
        </button>
      </div>
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <Image className="rounded-xl" src="/evil-larry.jpg" alt="Evil Larry" width={300} height={300}/>
        <h1 className="text-2xl font-bold mt-4">Evil Larry is DEMANDING you sign in with OAuth</h1>
        <hr className="w-full max-w-md mt-4"></hr>
        <button onClick={() => { window.location.href = "/api/discord/auth" }} className="mt-4 px-4 py-2 transition bg-indigo-500 outline-[2.5px] outline-indigo-700 inset-shadow-2xs inset-shadow-white/10 enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-indigo-900 text-white rounded-2xl enabled:hover:bg-indigo-600 enabled:hover:cursor-pointer enabled:hover:translate-y-[-2px]">
          Sign in with Discord OAuth
        </button>
        <div className="w-fit flex flex-col">
          <button onClick={() => { window.location.href = "/api/hackclub/auth" }} className="mt-4 px-4 py-2 transition bg-rose-500 outline-[2.5px] outline-rose-700 inset-shadow-2xs inset-shadow-white/10 enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-rose-900 text-white rounded-t-2xl enabled:hover:bg-rose-600 enabled:hover:cursor-pointer">
            Sign in with Hack Club OAuth
          </button>
          <button onClick={() => { window.location.href = "/api/hackatime/auth" }} className="mt-1 px-4 py-2 transition bg-gray-500 outline-[2.5px] outline-gray-700 inset-shadow-2xs inset-shadow-white/10 enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-gray-900 text-white rounded-b-2xl enabled:hover:bg-gray-600 enabled:hover:cursor-pointer">
            Sign in with Hackatime OAuth
          </button>
        </div>
        <button onClick={() => { window.location.href = "/api/roblox/auth" }} className="mt-4 px-4 py-2 transition bg-blue-500 outline-[2.5px] outline-blue-700 inset-shadow-2xs inset-shadow-white/10 enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-blue-900 text-white rounded-2xl enabled:hover:bg-blue-600 enabled:hover:cursor-pointer enabled:hover:translate-y-[-2px]">
          Sign in with Roblox OAuth
        </button>
        <hr className="w-full max-w-md mt-4"></hr>
        <button onClick={() => (window.location.href = "/view/discord")} className="mt-4 px-4 py-2 transition bg-indigo-500 outline-[2.5px] outline-indigo-700 inset-shadow-2xs inset-shadow-white/10 enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-indigo-900 text-white rounded-2xl enabled:hover:bg-indigo-600 enabled:hover:cursor-pointer enabled:hover:translate-y-[-2px]">
          View Discord Information
        </button>
        <div className="w-fit flex flex-col">
          <button onClick={() => { window.location.href = "/view/hackclub" }} className="mt-4 px-4 py-2 transition bg-rose-500 outline-[2.5px] outline-rose-700 inset-shadow-2xs inset-shadow-white/10 enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-rose-900 text-white rounded-t-2xl enabled:hover:bg-rose-600 enabled:hover:cursor-pointer">
            View Hack Club Information
          </button>
          <button onClick={() => { window.location.href = "/view/hackatime" }} className="mt-1 px-4 py-2 transition bg-gray-500 outline-[2.5px] outline-gray-700 inset-shadow-2xs inset-shadow-white/10 enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-gray-900 text-white rounded-b-2xl enabled:hover:bg-gray-600 enabled:hover:cursor-pointer">
            View Hackatime Information
          </button>
        </div>
        <button onClick={() => { window.location.href = "/view/roblox" }} className="mt-4 px-4 py-2 transition bg-blue-500 outline-[2.5px] outline-blue-700 inset-shadow-2xs inset-shadow-white/10 enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-blue-900 text-white rounded-2xl enabled:hover:bg-blue-600 enabled:hover:cursor-pointer enabled:hover:translate-y-[-2px]">
          View Roblox Information
        </button>
      </div>
    </>
  );
}
