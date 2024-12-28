import { NextResponse, NextRequest } from 'next/server';
import { sendMessageToClaude } from '@/lib/claude';
import { checkRateLimit } from '@/lib/rateLimit';
import type { Message, APIMessage } from '@/types/chat';
export const dynamic = 'force-dynamic';

const createErrorResponse = (message: string, status: number) => {
  return new Response(
    JSON.stringify({ error: message }),
    { status, headers: { 'Content-Type': 'application/json' } }
  );
};

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  
  if (!checkRateLimit(ip)) {
    return createErrorResponse('本日の質問回数制限に達しました。また1時間後に話しかけてください。', 429);
  }

  if (!process.env["ANTHROPIC_API_KEY"]) {
    return NextResponse.json(
      { error: 'API key is not configured' },
      { status: 500 }
    );
  }

  try {
    const { messages }: { messages: Message[] } = await request.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    const apiMessages: APIMessage[] = messages.map(msg => ({
      role: msg.isUser ? 'user' as const : 'assistant' as const,
      content: [{
        type: "text" as const,
        text: msg.content
      }]
    }));

    const response = await sendMessageToClaude(apiMessages);
    return NextResponse.json({ response });
  } catch (error) {
    console.error('API Route error:', error);
    
    // エラー型の詳細な処理
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return createErrorResponse('Authentication failed', 401);
      }
      return createErrorResponse(error.message, 500);
    }
    
    return createErrorResponse('Internal Server Error', 500);
  }
}