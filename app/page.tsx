"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  const [discordLoggedIn, setDiscordLoggedIn] = useState(false)
  const [hackClubLoggedIn, setHackClubLoggedIn] = useState(false)
  const [hackatimeLoggedIn, setHackatimeLoggedIn] = useState(false)
  const [robloxLoggedIn, setRobloxLoggedIn] = useState(false)
  const [gitHubLoggedIn, setGitHubLoggedIn] = useState(false)
  const [logOutOptionsExpanded, setLogOutOptionsExpanded] = useState<boolean>(false);
  const[selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    const discordCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('discord_information='))
      const hackClubCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('hackclub_information='))
      const hackatimeCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('hackatime_information='))
      const robloxCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('roblox_information='))
      const gitHubCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('github_information='))

      if (discordCookie) {
        setDiscordLoggedIn(true)
      }

      if (hackClubCookie) {
        setHackClubLoggedIn(true)
      }

      if (hackatimeCookie) {
        setHackatimeLoggedIn(true)
      }

      if (robloxCookie) {
        setRobloxLoggedIn(true)
      }

      if (gitHubCookie) {
        setGitHubLoggedIn(true)
      }
  }, [])

  function logOut() {
    if (selectedOption === 'discord') {
      fetch('/api/discord/log-out')
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        setDiscordLoggedIn(false)
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
        setHackClubLoggedIn(false)
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
        setHackatimeLoggedIn(false)
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
        setRobloxLoggedIn(false)
        setSelectedOption(null);
      })
      .catch(error => {
        console.error('Error logging out on Roblox:', error);
      });
    } else if (selectedOption === 'github') {
      fetch('/api/github/log-out')
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        setGitHubLoggedIn(false)
        setSelectedOption(null);
      })
      .catch(error => {
        console.error('Error logging out on GitHub:', error);
      });
    }
  }

  return (
    <>
    {(discordLoggedIn || hackClubLoggedIn || hackatimeLoggedIn || robloxLoggedIn || gitHubLoggedIn) && (
      <div className={`overflox-x-auto overflow-y-auto flex flex-row items-end justify-end bg-zinc-50 font-sans dark:bg-black px-4 py-2 mb-4 ${montserrat.className}`}>
        <p>
          You are logged in.
        </p>
        {logOutOptionsExpanded && (
          <>
            <button disabled={!gitHubLoggedIn} className={`ml-4 rounded-l-2xl translate-y-[4px] px-4 py-2 transition ${selectedOption === 'github' && 'bg-green-500'} outline-[2.5px] outline-green-700 ${!logOutOptionsExpanded && 'inset-shadow-2xs inset-shadow-white/10'} enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-green-900 text-white enabled:hover:bg-green-600 enabled:hover:cursor-pointer ${!logOutOptionsExpanded && 'enabled:hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed'}`} onClick={() => {setSelectedOption('github');}}>
              GitHub
            </button>
            <button disabled={!robloxLoggedIn} className={`ml-1 translate-y-[4px] px-4 py-2 transition ${selectedOption === 'roblox' && 'bg-blue-500'} outline-[2.5px] outline-blue-700 ${!logOutOptionsExpanded && 'inset-shadow-2xs inset-shadow-white/10'} enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-blue-900 text-white enabled:hover:bg-blue-600 enabled:hover:cursor-pointer ${!logOutOptionsExpanded && 'enabled:hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed'}`} onClick={() => {setSelectedOption('roblox');}}>
              Roblox
            </button>
            <button disabled={!hackatimeLoggedIn} className={`ml-1 translate-y-[4px] px-4 py-2 transition ${selectedOption === 'hackatime' && 'bg-gray-500'} outline-[2.5px] outline-gray-700 ${!logOutOptionsExpanded && 'inset-shadow-2xs inset-shadow-white/10'} enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-gray-900 text-white enabled:hover:bg-gray-600 enabled:hover:cursor-pointer ${!logOutOptionsExpanded && 'enabled:hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed'}`} onClick={() => {setSelectedOption('hackatime');}}>
              Hackatime
            </button>
            <button disabled={!hackClubLoggedIn} className={`ml-1 translate-y-[4px] px-4 py-2 transition ${selectedOption === 'hackclub' && 'bg-rose-500'} outline-[2.5px] outline-rose-700 ${!logOutOptionsExpanded && 'inset-shadow-2xs inset-shadow-white/10'} enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-rose-900 text-white enabled:hover:bg-rose-600 enabled:hover:cursor-pointer ${!logOutOptionsExpanded && 'enabled:hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed'}`} onClick={() => {setSelectedOption('hackclub');}}>
              Hack Club
            </button>
            <button disabled={!discordLoggedIn} className={`ml-1 translate-y-[4px] px-4 py-2 transition ${selectedOption === 'discord' && 'bg-indigo-500'} outline-[2.5px] outline-indigo-700 ${!logOutOptionsExpanded && 'inset-shadow-2xs inset-shadow-white/10'} enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-indigo-900 text-white enabled:hover:bg-indigo-600 enabled:hover:cursor-pointer ${!logOutOptionsExpanded && 'enabled:hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed'}`} onClick={() => {setSelectedOption('discord');}}>
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
      )}
      <div className={`flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black ${montserrat.className}`}>
        <Image className="rounded-xl" src="/evil-larry.jpg" alt="Evil Larry" width={300} height={300}/>
        <h1 className="text-2xl font-bold mt-4">Evil Larry is DEMANDING you sign in with OAuth</h1>
        <hr className="w-full max-w-md mt-4"></hr>
        <button onClick={() => { window.location.href = "/api/discord/auth" }} className="mt-4 px-4 py-2 transition bg-indigo-500 outline-[2.5px] outline-indigo-700 inset-shadow-2xs inset-shadow-white/10 enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-indigo-900 text-white rounded-2xl enabled:hover:bg-indigo-600 enabled:hover:cursor-pointer enabled:hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed">
          Sign in with Discord OAuth
        </button>
        <div className="w-fit flex flex-col">
          <button onClick={() => { window.location.href = "/api/hackclub/auth" }} className="mt-4 px-4 py-2 transition bg-rose-500 outline-[2.5px] outline-rose-700 inset-shadow-2xs inset-shadow-white/10 enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-rose-900 text-white rounded-t-2xl enabled:hover:bg-rose-600 enabled:hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            Sign in with Hack Club OAuth
          </button>
          <button onClick={() => { window.location.href = "/api/hackatime/auth" }} className="mt-1 px-4 py-2 transition bg-gray-500 outline-[2.5px] outline-gray-700 inset-shadow-2xs inset-shadow-white/10 enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-gray-900 text-white rounded-b-2xl enabled:hover:bg-gray-600 enabled:hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            Sign in with Hackatime OAuth
          </button>
        </div>
        <button onClick={() => { window.location.href = "/api/roblox/auth" }} className="mt-4 px-4 py-2 transition bg-blue-500 outline-[2.5px] outline-blue-700 inset-shadow-2xs inset-shadow-white/10 enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-blue-900 text-white rounded-2xl enabled:hover:bg-blue-600 enabled:hover:cursor-pointer enabled:hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed">
          Sign in with Roblox OAuth
        </button>
        <button onClick={() => { window.location.href = "/api/github/auth" }} className="mt-4 px-4 py-2 transition bg-green-500 outline-[2.5px] outline-green-700 inset-shadow-2xs inset-shadow-white/10 enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-green-900 text-white rounded-2xl enabled:hover:bg-green-600 enabled:hover:cursor-pointer enabled:hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed">
          Sign in with GitHub OAuth
        </button>
        <hr className="w-full max-w-md mt-4"></hr>
        <button disabled={!discordLoggedIn} onClick={() => (window.location.href = "/view/discord")} className="mt-4 px-4 py-2 transition bg-indigo-500 outline-[2.5px] outline-indigo-700 inset-shadow-2xs inset-shadow-white/10 enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-indigo-900 text-white rounded-2xl enabled:hover:bg-indigo-600 enabled:hover:cursor-pointer enabled:hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed">
          View Discord Information
        </button>
        <div className="w-fit flex flex-col">
          <button disabled={!hackClubLoggedIn} onClick={() => { window.location.href = "/view/hackclub" }} className="mt-4 px-4 py-2 transition bg-rose-500 outline-[2.5px] outline-rose-700 inset-shadow-2xs inset-shadow-white/10 enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-rose-900 text-white rounded-t-2xl enabled:hover:bg-rose-600 enabled:hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            View Hack Club Information
          </button>
          <button disabled={!hackatimeLoggedIn} onClick={() => { window.location.href = "/view/hackatime" }} className="mt-1 px-4 py-2 transition bg-gray-500 outline-[2.5px] outline-gray-700 inset-shadow-2xs inset-shadow-white/10 enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-gray-900 text-white rounded-b-2xl enabled:hover:bg-gray-600 enabled:hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            View Hackatime Information
          </button>
        </div>
        <button disabled={!robloxLoggedIn} onClick={() => { window.location.href = "/view/roblox" }} className="mt-4 px-4 py-2 transition bg-blue-500 outline-[2.5px] outline-blue-700 inset-shadow-2xs inset-shadow-white/10 enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-blue-900 text-white rounded-2xl enabled:hover:bg-blue-600 enabled:hover:cursor-pointer enabled:hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed">
          View Roblox Information
        </button>
        <button disabled={!gitHubLoggedIn} onClick={() => { window.location.href = "/view/github" }} className="mt-4 px-4 py-2 transition bg-green-500 outline-[2.5px] outline-green-700 inset-shadow-2xs inset-shadow-white/10 enabled:hover:active:inset-shadow-sm enabled:hover:active:inset-shadow-green-900 text-white rounded-2xl enabled:hover:bg-green-600 enabled:hover:cursor-pointer enabled:hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed">
          View GitHub Information
        </button>
        <hr className="w-full max-w-md mt-4"></hr>
        <p className="mt-4 mb-4">
          All information is stored in your browser under your cookies. Nothing is stored on any servers.
        </p>
      </div>
    </>
  );
}
