'use client';

import { Message, useChat } from 'ai/react';
import ChatInput from './chat-input';
import Messages from './messages';
import { generateRandomUUID } from '@/lib/utils';
import { toast } from 'sonner';
import Overview from './overview';
import { useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

type ChatProps = {
  id: string;
  initialMessages: Message[];
};

export default function Chat({ id, initialMessages }: ChatProps) {
  const {
    id: chatId,
    messages,
    handleSubmit,
    input,
    setInput,
    append,
    isLoading,
    stop,
    reload,
    error,
  } = useChat({
    id,
    initialMessages,
    maxSteps: 5,
    sendExtraMessageFields: true,
    generateId: generateRandomUUID,
  });

  useEffect(() => {
    stop();
  }, [chatId, stop]);

  useEffect(() => {
    if (error) {
      try {
        const parsedError = JSON.parse(error.message);
        if (parsedError.rateLimit) {
          const { type, reset } = parsedError.rateLimit;

          if (type === 'request-per-minute' || type === 'too-many-requests') {
            toast.error('Too many requests. Try again in a few minutes.');
          } else if (type === 'request-per-day') {
            const timeRemaining = formatDistanceToNow(new Date(reset), {
              addSuffix: true,
            });
            toast.error(
              `Daily request limit reached. Try again ${timeRemaining}.`
            );
          }
        } else {
          toast.error('Something went wrong.');
        }
      } catch (error) {
        console.error('Error parsing error message:', error);
        toast.error('An error occurred.');
      }
    }
  }, [error]);

  return (
    <div className='flex flex-col h-full w-full'>
      {messages.length === 0 && <Overview chatId={chatId} append={append} />}

      {messages.length > 0 && (
        <Messages
          chatId={chatId}
          append={append}
          messages={messages}
          isLoading={isLoading}
          reload={reload}
        />
      )}

      <ChatInput
        append={append}
        inputValue={input}
        setInput={setInput}
        isLoading={isLoading}
        stop={stop}
        chatId={chatId}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
