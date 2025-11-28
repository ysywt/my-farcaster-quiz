import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; 

// --- 谜题数据 ---
const QUIZ_DATA = {
    question: "什么样的“门”永远关不上？",
    answer: "足球门"
};

async function handleFrameRequest(req: NextRequest): Promise<Response> {
    const url = new URL(req.url);
    const currentState = url.searchParams.get('state') || 'question'; 

    let imageText = '';
    let buttonText = '';
    let nextState = '';
    let bgColor = '';
    
    if (currentState === 'question') {
        imageText = QUIZ_DATA.question;
        buttonText = '看答案';
        nextState = 'answer';
        bgColor = '#4a90e2'; 
    } else if (currentState === 'answer') {
        imageText = QUIZ_DATA.answer;
        buttonText = '再玩一次';
        nextState = 'question';
        bgColor = '#50e3c2'; 
    } else {
        imageText = 'Frame 加载错误，请重试。';
        buttonText = '重试';
        nextState = 'question';
        bgColor = '#ff6161';
    }
    
    const HOST = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : url.origin;

    const frameHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>猜谜语 Frame</title>
          <meta property="fc:frame" content="vNext" />
          
          <meta property="fc:frame:image" content="${HOST}/api/frame-quiz/image/route.ts?text=${encodeURIComponent(imageText)}&bg=${encodeURIComponent(bgColor)}" />
          
          <meta property="fc:frame:button:1" content="${buttonText}" />
          <meta property="fc:frame:button:1:action" content="post" />
          
          <meta property="fc:frame:post_url" content="${HOST}/api/frame-quiz/route.ts?state=${nextState}" />
        </head>
        <body>
          <h1>Frame is ready.</h1> 
        </body>
      </html>
    `;

    return new NextResponse(frameHtml, {
        headers: { 'Content-Type': 'text/html' },
    });
}

export async function POST(req: NextRequest): Promise<Response> {
    return handleFrameRequest(req);
}

export async function GET(req: NextRequest): Promise<Response> {
    return handleFrameRequest(req);
}
