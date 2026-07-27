export const runtime = 'edge';

import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const src = searchParams.get('src');

  if (!src) {
    return new Response('Missing image src', { status: 400 });
  }

  const websiteUrl = process.env.WEBSITE_URL;
  const imageUrl = websiteUrl + src;

  console.log(imageUrl);

  const res = await fetch(imageUrl);
  const contentType = res.headers.get('content-type') || 'image/jpeg';
  const buffer = await res.arrayBuffer();

  return new Response(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
