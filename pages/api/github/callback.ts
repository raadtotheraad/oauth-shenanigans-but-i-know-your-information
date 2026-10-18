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
    fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json'
        },
        body: new URLSearchParams({
            client_id: process.env.GITHUB_CLIENT_ID || '',
            client_secret: process.env.GITHUB_CLIENT_SECRET || '',
            code: code,
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        console.log(data.access_token)
        fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${data.access_token}`,
                Accept: 'application/vnd.github+json',
            }
        })
        .then(response => response.json())
        .then(async userData => {
           res.setHeader("Set-Cookie", `github_information=${encodeURIComponent(JSON.stringify(userData))}; Path=/`);
           res.redirect('/');
        })

    })
    .catch(error => {
        console.error('Error authenticating with GitHub:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    });
}