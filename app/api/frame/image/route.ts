import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge'; 

/**
 * 动态生成 Frame 图片的函数 (用于 /api/frame/image 路由)
 */
function FrameImage(text: string, bgColor: string) {
  return new ImageResponse(
    (
      // 使用 JSX 描述图片内容和样式
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
          border: '10px solid #FFFFFF' 
        }}
      >
        <p style={{ margin: 0, fontWeight: 'bold' }}>Farcaster 猜谜语</p>
        <h1 style={{ margin: '20px 0 0 0', lineHeight: 1.2 }}>{text}</h1>
      </div>
    ),
    {
      width: 1146, // 标准 Frame 宽度
      height: 600, // 标准 Frame 高度
    },
  );
}

export async function GET(req: NextRequest): Promise<Response> {
    const { searchParams } = new URL(req.url);
    // 从 URL 参数获取文字和背景颜色
    const text = searchParams.get('text') || '加载中...';
    const bgColor = searchParams.get('bg') || '#000000';

    // 返回图片响应
    return FrameImage(decodeURIComponent(text), decodeURIComponent(bgColor));
}