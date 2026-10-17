import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const clientId = process.env.ROBLOX_CLIENT_ID;
    const siteURL = process.env.SITE_URL;

    if (!clientId || !siteURL) {
        console.error("ROBLOX_CLIENT_ID or SITE_URL is not defined in the environment variables.");
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }

    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const scope = "openid profile";
    const responseType = "code";

    const robloxAuthUrl = `https://apis.roblox.com/oauth/v1/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(siteURL)}/api/roblox/callback&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;

    res.redirect(robloxAuthUrl);
}