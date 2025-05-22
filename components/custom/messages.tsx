import { UIMessage } from 'ai';
import Message, { ThinkingMessage } from './message';
import { memo } from 'react';
import { UseChatHelpers } from '@ai-sdk/react';
import ChatError from './error';
import { motion } from 'framer-motion';
import { useMessagesContainer } from '@/hooks/useMessageContainer';
import Overview from './overview';

type MessagesProps = {
  chatId: string;
  append: UseChatHelpers['append'];
  messages: Array<UIMessage>;
  status: UseChatHelpers['status'];
  error: UseChatHelpers['error'];
  reload: UseChatHelpers['reload'];
};

function Messages({
  messages,
  status,
  append,
  reload,
  chatId,
  error,
}: MessagesProps) {
  const { containerRef, endRef, isMessageSent, setIsAtBottom } =
    useMessagesContainer({
      chatId,
      status,
      shouldScrollToBottom: messages.length > 0,
    });

  return (
    <div
      ref={containerRef}
      className='w-full flex-1 flex flex-col pt-14 pb-12 -mb-5 overflow-y-auto'
    >
      {messages.length === 0 && <Overview chatId={chatId} append={append} />}

      <div className='w-[calc(100dvw-32px)] max-w-3xl sm:w-[calc(100dvw-70px)] mx-auto'>
        {messages.map((message, index) => {
          const isLastMessage = messages.length - 1 === index;
          return (
            <Message
              key={message.id}
              message={message}
              reload={reload}
              isLoading={status === 'streaming' && isLastMessage}
              isLastMessage={isLastMessage}
              requiresScrollPadding={isMessageSent && isLastMessage}
            />
          );
        })}
        {status === 'submitted' &&
          messages[messages.length - 1]?.role === 'user' && <ThinkingMessage />}

        {error && <ChatError reload={reload} />}
      </div>
      <motion.div
        ref={endRef}
        className='shrink-0 min-w-[24px] min-h-[24px]'
        onViewportEnter={() => setIsAtBottom(true)}
        onViewportLeave={() => setIsAtBottom(false)}
      />
    </div>
  );
}
export default memo(Messages);
