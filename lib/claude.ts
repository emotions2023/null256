import { Anthropic } from '@anthropic-ai/sdk';
import type { APIMessage } from '@/types/chat';
import { getSystemPrompt } from './chat-prompt';

const ANTHROPIC_API_KEY = process.env["ANTHROPIC_API_KEY"];
if (!ANTHROPIC_API_KEY) {
  throw new Error('ANTHROPIC_API_KEY is not configured');
}

const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY
});

export async function sendMessageToClaude(messages: APIMessage[]): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      messages: messages,
      system: getSystemPrompt(),
      max_tokens: 1024,
    });

    const content = response.content[0];
    if (content.type === 'text') {
      return content.text;
    }
    throw new Error('Unexpected response format from Claude API');
  } catch (error) {
    console.error("Claude API error:", error);
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('Authentication failed');
      }
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
}