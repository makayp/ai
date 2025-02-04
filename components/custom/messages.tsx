import { useScrollToBottom } from '@/hooks/use-scroll-to-bottom';
import {
  ChatRequestOptions,
  CreateMessage,
  type Message as MessageType,
} from 'ai';
import Message, { ThinkingMessage } from './message';
import { memo } from 'react';
import Overview from './overview';

type MessagesProps = {
  chatId: string;
  append: (
    message: MessageType | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  messages: MessageType[];
  isLoading: boolean;
  className?: string;
};

function Messages({ chatId, append, messages, isLoading }: MessagesProps) {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>({
      scrollOnLoad: messages.length > 0,
    });

  return (
    <div
      ref={messagesContainerRef}
      className='overflow-auto w-full flex-1 pt-6 pb-16'
    >
      {messages.length === 0 && <Overview chatId={chatId} append={append} />}

      <div className='space-y-8 w-[calc(100dvw-32px)] max-w-3xl sm:w-[calc(100dvw-70px)] mx-auto'>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <ThinkingMessage />
        )}
      </div>
      <div
        ref={messagesEndRef}
        className='shrink-0 bg-blue-300 min-w-[24px] min-h-[0px]'
      />
    </div>
  );
}
export default memo(Messages);
