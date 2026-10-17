import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import { Noto_Sans_Rejang } from 'next/font/google';

type ResponseData = {
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const clientId = process.env.MICROSOFT_CLIENT_ID;
    const siteURL = process.env.SITE_URL;

    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    function base64URLEncode(str: string) {
        return str.toString()
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    }

    function sha256(value: string) {
        return crypto.createHash('sha256').update(value).digest(`base64`);
    }

    var code_verifier = crypto.randomBytes(32).toString("base64url");
    var code_challenge = base64URLEncode(sha256(code_verifier));

    const scope = "openid profile";
    const responseType = "code";

    const microsoftAuthUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(siteURL)}/api/microsoft/callback&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;

    res.redirect(microsoftAuthUrl);
}