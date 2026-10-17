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

    fetch('https://hackatime.hackclub.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: process.env.HACKATIME_CLIENT_ID || '',
            client_secret: process.env.HACKATIME_CLIENT_SECRET || '',
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.SITE_URL + '/api/hackatime/callback'
        })
    })
    .then(response => response.json())
    .then(data => {
        fetch('https://hackatime.hackclub.com/api/v1/authenticated/me', {
            headers: {
                'Authorization': `Bearer ${data.access_token}`
            }
        })
        .then(response => response.json())
        .then(async userData => {
           res.setHeader("Set-Cookie", `hackatime_information=${encodeURIComponent(JSON.stringify(userData))}; Path=/`);
           res.redirect('/');
        })

    })
    .catch(error => {
        console.error('Error authenticating with Hackatime:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    });
}