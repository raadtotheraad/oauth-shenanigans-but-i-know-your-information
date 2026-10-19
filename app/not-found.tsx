import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function NotFound() {
    return (
        <div className={`flex flex-row min-h-screen justify-center items-center ${montserrat.className}`}>
            This page couldn't be found. Larry is dissapointed.
        </div>
    )
}