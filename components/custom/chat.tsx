'use client';

import { useScrollToBottom } from '@/hooks/use-scroll-to-bottom';
import { messages } from '@/lib/dummy-chat';
import { useChat } from 'ai/react';
import { useRef } from 'react';
import ChatInput from './chat-input';

const initialMessages = messages;

export default function Chat() {
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
    initialMessages,
  });

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  console.log(messages);

  return (
    <div className='flex flex-col h-full w-fullh max-w-4xl mx-auto px-4'>
      <div className='overflow-auto w-full flex-1'>
        <div className='space-y-8'>
          {messages.map((message) => (
            <div key={message.id}>
              {message.role === 'user' && (
                <div className='max-w-[70%] ml-auto bg-gray-100 p-4 rounded-xl w-fit my-5'>
                  <p>{message.content}</p>
                </div>
              )}

              {message.role === 'assistant' && (
                <div className='flex gap-2'>
                  <span className='flex items-center justify-center size-5 rounded-full border p-4 text-xl'>
                    🤖
                  </span>
                  <p>{message.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div
          ref={messagesEndRef}
          className='shrink-0 min-w-[24px] min-h-[24px]'
        />
      </div>

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
