import { useScrollToBottom } from '@/hooks/use-scroll-to-bottom';
import {
  ChatRequestOptions,
  CreateMessage,
  type Message as MessageType,
} from 'ai';
import Message, { ThinkingMessage } from './message';
import { memo } from 'react';
import { isLastMessage } from '@/lib/utils';
import { useChat } from '@ai-sdk/react';
import ChatError from './error';

type MessagesProps = {
  chatId: string;
  append: (
    message: MessageType | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  messages: MessageType[];
  isLoading: boolean;
  className?: string;
  reload: (
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
};

function Messages({ messages, isLoading, reload, chatId }: MessagesProps) {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>({
      scrollOnLoad: messages.length > 0,
    });

  const { error } = useChat({ id: chatId });

  return (
    <div
      ref={messagesContainerRef}
      className='overflow-auto w-full flex-1 pt-14 pb-16 -mb-5'
    >
      <div className='w-[calc(100dvw-32px)] max-w-3xl sm:w-[calc(100dvw-70px)] mx-auto'>
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            reload={reload}
            isLoading={isLoading}
            isLastMessage={isLastMessage({ messages, message })}
          />
        ))}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <ThinkingMessage />
        )}

        {error && <ChatError chatId={chatId} />}
      </div>
      <div ref={messagesEndRef} className='shrink-0 min-w-[24px] min-h-[0px]' />
    </div>
  );
}
export default memo(Messages);
