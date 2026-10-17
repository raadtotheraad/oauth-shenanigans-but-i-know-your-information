import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.headers.cookie?.includes('roblox_information')) {
        res.setHeader("Set-Cookie", "roblox_information=; Path=/; Max-Age=0");
        res.status(200).json({ message: 'Roblox information cleared successfully' });
    } else {
        res.status(400).json({ message: 'Not currently logged in' });
    }
}