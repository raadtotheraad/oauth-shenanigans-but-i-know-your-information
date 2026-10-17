import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const code = req.query.code as string | undefined;

    if (!code) {
        res.status(400).json({ message: 'Missing code parameter' });
        return;
    }

    fetch('https://apis.roblox.com/oauth/v1/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: process.env.ROBLOX_CLIENT_ID || '',
            client_secret: process.env.ROBLOX_CLIENT_SECRET || '',
            grant_type: 'authorization_code',
            code: code,
        })
    })
    .then(response => response.json())
    .then(data => {
        fetch('https://apis.roblox.com/oauth/v1/userinfo', {
            headers: {
                'Authorization': `Bearer ${data.access_token}`
            }
        })
        .then(response => response.json())
        .then(async userData => {
           res.setHeader("Set-Cookie", `roblox_information=${encodeURIComponent(JSON.stringify(userData))}; Path=/`);
           res.redirect('/');
        })

    })
    .catch(error => {
        console.error('Error authenticating with Roblox:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    });
}