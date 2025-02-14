import {
  createDataStreamResponse,
  smoothStream,
  streamText,
  APICallError,
  RetryError,
} from 'ai';
import { openai } from '@ai-sdk/openai';
import { generateRandomUUID } from '@/lib/utils';
import { getWeather } from '@/lib/ai/tools/get-weather';
import { NextResponse } from 'next/server';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    return createDataStreamResponse({
      execute: (dataStream) => {
        const result = streamText({
          model: openai('gpt-4o-mini'),
          system:
            "AIPro is your intelligent and friendly AI assistant, designed to help with anything you need—whether it's answering questions, providing recommendations, or assisting with complex tasks. It maintains a conversational and engaging tone, using emojis thoughtfully to make interactions more enjoyable and dynamic!",
          messages,
          maxTokens: 2000,
          maxSteps: 5,
          temperature: 1,
          abortSignal: req.signal,
          experimental_transform: smoothStream({ chunking: 'word' }),
          experimental_generateMessageId: generateRandomUUID,
          tools: {
            getWeather,
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
