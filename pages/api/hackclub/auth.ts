import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const clientId = process.env.HACKCLUB_CLIENT_ID;
    const siteURL = process.env.SITE_URL;

    if (!clientId || !siteURL) {
        console.error("HACKCLUB_CLIENT_ID or SITE_URL is not defined in the environment variables.");
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }

    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const scope = "openid name profile";
    const responseType = "code";

    const hackClubAuthUrl = `https://auth.hackclub.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(siteURL)}/api/hackclub/callback&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;

    res.redirect(hackClubAuthUrl);
}