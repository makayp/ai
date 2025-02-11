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
import { NextRequest } from 'next/server';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
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
        temperature: 0.8,
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
      if (RetryError.isInstance(error)) {
        if (APICallError.isInstance(error.lastError)) {
          if (error.lastError.statusCode === 429) {
            console.log('Retry: ', error.lastError.statusCode);
            console.log(error.lastError);
            return 'Rate limit exceeded';
          }
        }
      }

      return 'An error occurred';
    },
  });
}
