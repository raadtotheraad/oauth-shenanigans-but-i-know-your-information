import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const siteURL = process.env.SITE_URL;

    if (!clientId || !siteURL) {
        console.error("GITHUB_CLIENT_ID or SITE_URL is not defined in the environment variables.");
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }

    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const scope = "read:user";
    const responseType = "code";

    const gitHubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(siteURL)}/api/github/callback&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;

    res.redirect(gitHubAuthUrl);
}