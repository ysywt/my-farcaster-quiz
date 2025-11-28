import { ImageResponse } from '@vercel/og'; 
import { NextRequest } from 'next/server';

export const runtime = 'edge'; 

function FrameImage(text: string, bgColor: string) {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          color: 'white',
          background: bgColor,
          width: '100%',
          height: '100%',
          padding: 50,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          border: '10px solid #FFFFFF',
        }}
      >
        <p style={{ margin: 0, fontWeight: 'bold' }}>Farcaster 猜谜语</p>
        <h1 style={{ margin: '20px 0 0 0', lineHeight: 1.2 }}>{text}</h1>
      </div>
    ),
    {
      width: 1146,
      height: 600,
    },
  );
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get('text') || '加载中...';
    const bgColor = searchParams.get('bg') || '#000000';

    return FrameImage(decodeURIComponent(text), decodeURIComponent(bgColor));
}