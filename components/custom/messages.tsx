import { useScrollToBottom } from '@/hooks/use-scroll-to-bottom';
import { type Message as MessageType } from 'ai';
import Message, { ThinkingMessage } from './message';
import { memo } from 'react';

type MessagesProps = {
  messages: MessageType[];
  isLoading: boolean;
  className?: string;
};

function PureMessages({ messages, isLoading }: MessagesProps) {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  return (
    <div
      ref={messagesContainerRef}
      className='overflow-auto w-full flex-1 pt-6  pb-16'
    >
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
        className='shrink-0 min-w-[24px] min-h-[24px]'
      />
    </div>
  );
}
const Messages = memo(PureMessages);
export default Messages;
