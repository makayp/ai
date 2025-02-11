'use client';

import { Message, useChat } from 'ai/react';
import ChatInput from './chat-input';
import Messages from './messages';
import { generateRandomUUID } from '@/lib/utils';
import { toast } from 'sonner';
import Overview from './overview';
import { useEffect } from 'react';

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
    if (error) {
      console.log(JSON.stringify(error));
      toast.error(error.message);
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
        messages={messages}
        chatId={chatId}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
