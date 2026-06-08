import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const query = req.url?.split('/api/naver')?.[1] || ''
  
  const response = await fetch(`https://openapi.naver.com${query}`, {
    headers: {
      'X-Naver-Client-Id': process.env.VITE_NAVER_CLIENT_ID || '',
      'X-Naver-Client-Secret': process.env.VITE_NAVER_CLIENT_SECRET || '',
    }
  })
  
  const data = await response.json()
  res.status(200).json(data)
}