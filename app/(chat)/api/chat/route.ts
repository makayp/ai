import {
  createDataStreamResponse,
  smoothStream,
  streamText,
  APICallError,
  RetryError,
} from 'ai';
import { openai } from '@ai-sdk/openai';
import { generateRandomUUID } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import { base } from '@/lib/ai/system-prompts';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    return createDataStreamResponse({
      execute: (dataStream) => {
        const result = streamText({
          model: openai.responses('gpt-4.1-mini'),
          system: base,
          messages,
          maxTokens: 2000,
          maxSteps: 5,
          temperature: 1,
          abortSignal: req.signal,
          experimental_transform: smoothStream({ chunking: 'word' }),
          experimental_generateMessageId: generateRandomUUID,
          tools: {
            web_search_preview: openai.tools.webSearchPreview({
              searchContextSize: 'low',
            }),
          },
        });

        result.mergeIntoDataStream(dataStream, {
          sendReasoning: true,
        });
      },

      onError: (error) => {
        console.error('Error:', error);
        if (RetryError.isInstance(error)) {
          if (APICallError.isInstance(error.lastError)) {
            if (error.lastError.statusCode === 429) {
              console.log(error.lastError);
              return JSON.stringify({
                message: 'Daily request limit reached. Try again tomorrow.',
                rateLimit: { type: 'too-many-requests' },
              });
            }
          }
        }

        return JSON.stringify({
          message: 'An error occurred while processing your request.',
        });
      },
    });
  } catch (error) {
    console.error('Request handling error:', error);
    return NextResponse.json(
      { message: 'An error occurred while processing your request.' },
      {
        status: 500,
      }
    );
  }
}
