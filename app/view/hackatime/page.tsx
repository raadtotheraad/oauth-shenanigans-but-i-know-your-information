"use client";
import { useEffect, useState } from "react";
import { Google_Sans_Code } from "next/font/google";

const googleSansCode = Google_Sans_Code({ subsets: ["latin"] });

export default function DiscordPage() {
    const [hackatimeInfo, setHackClubInfo] = useState<object | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("hackatime_information="));

        if (!cookie) {
            setLoading(false);
            return;
        }

        try {
            const value = cookie.split("=")[1];
            const decoded = decodeURIComponent(value);
            setHackClubInfo(JSON.parse(decoded));
            setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Failed to parse Hackatime information:", error);
            }
        },
    []);
    
  return (
    <div className={`flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black`}>
      <h1 className="text-2xl font-bold mt-4">Hackatime Information</h1>
      <hr className="w-full max-w-md mt-4"></hr>
      <div className={`${!loading ? 'mt-4 my-4 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 outline-zinc-300 dark:outline-zinc-600 outline-1 rounded-xl ${googleSansCode.className}' : 'mt-4 my-4 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 rounded-xl w-[350px] h-[400px] animate-pulse'}`}>
        {loading ? (
          null
        ) : hackatimeInfo ? (
          <pre>{JSON.stringify(hackatimeInfo, null, 2)}</pre>
        ) : (
          <p>No Hackatime information available. Please log in.</p>
        )}
      </div>
    </div>
  );
}