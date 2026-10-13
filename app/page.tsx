"use client";
import Image from "next/image";
import { useEffect } from "react"; // Import

function discordOAuth() {
  window.location.href = "/api/discord/start";
}

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Image className="rounded-xl" src="/evil-larry.jpg" alt="Evil Larry" width={300} height={300}/>
      <h1 className="text-2xl font-bold mt-4">Evil Larry is DEMANDING you sign in with OAuth</h1>
      <hr className="w-full max-w-md mt-4"></hr>
      <button onClick={discordOAuth} className="mt-4 px-4 py-2 transition bg-indigo-500 outline-[2.5px] outline-indigo-700 inset-shadow-xs inset-shadow-white/10 active:inset-shadow-sm active:inset-shadow-indigo-900 text-white rounded-2xl hover:bg-indigo-600 hover:cursor-pointer hover:translate-y-[-2px]">
        Sign in with Discord OAuth
      </button>
    </div>
  );
}
