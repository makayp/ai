'use client';

import { Message, useChat } from 'ai/react';
import ChatInput from './chat-input';
import Messages from './messages';
import { generateRandomUUID } from '@/lib/utils';

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
  } = useChat({
    id,
    initialMessages,
    generateId: generateRandomUUID,
    sendExtraMessageFields: true,
  });

  return (
    <div className='flex flex-col h-full w-full'>
      <Messages
        chatId={chatId}
        append={append}
        messages={messages}
        isLoading={isLoading}
      />

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
