import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const clientId = process.env.DISCORD_CLIENT_ID;
    const siteURL = process.env.SITE_URL;

    console.log("CLIENT ID:", process.env.DISCORD_CLIENT_ID);
    console.log("SITE URL:", process.env.SITE_URL);

    if (!clientId || !siteURL) {
        console.error("DISCORD_CLIENT_ID or SITE_URL is not defined in the environment variables.");
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }

    const scope = "identify email";
    const responseType = "code";

    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(siteURL)}/callback/discord&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;

    res.redirect(discordAuthUrl);
}