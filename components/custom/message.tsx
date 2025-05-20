import { useIsMobile } from '@/hooks/use-mobile';
import { UIMessage } from 'ai';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { memo } from 'react';
import Markdown from './markdown';
import MessageActions from './message-actions';
import PreviewAttachment from './preview-attachment';
import { UseChatHelpers } from '@ai-sdk/react';
import { cn } from '@/lib/utils';

type MessageProps = {
  message: UIMessage;
  isLastMessage: boolean;
  isLoading: boolean;
  reload: UseChatHelpers['reload'];
  requiresScrollPadding?: boolean;
};

function Message({
  message,
  isLastMessage,
  isLoading,
  reload,
  requiresScrollPadding,
}: MessageProps) {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className='relative text-gray-900 w-full data-[role=user]:my-5 group/message mt-10'
      data-role={message.role}
    >
      {message.role === 'user' && (
        <div
          key={message.id}
          className='overflow-hidden ml-auto max-w-[80%] w-fit'
        >
          {message.experimental_attachments &&
            message.experimental_attachments.length > 0 && (
              <div className='flex flex-row justify-end gap-2'>
                {message.experimental_attachments.map((attachment, index) => (
                  <PreviewAttachment
                    id={index}
                    key={attachment.url}
                    attachment={attachment}
                  />
                ))}
              </div>
            )}

          <article data-role={message.role}>
            <div className='whitespace-pre-wrap bg-secondary rounded-2xl px-4 py-3 mt-4'>
              {message.parts.map((part) => part.type === 'text' && part.text)}
            </div>
          </article>
        </div>
      )}

      {message.role === 'assistant' && (
        <div
          className={cn('flex gap-3 md:gap-5 w-full rounded-xl', {
            'min-h-[calc(100dvh-320px)]': requiresScrollPadding,
          })}
        >
          <div className='flex flex-col w-full overflow-hidden'>
            <article className={'flex flex-col w-full overflow-hidden'}>
              {message.parts.map((part) => {
                if (part.type === 'text') {
                  return <Markdown key={message.id}>{part.text}</Markdown>;
                }
              })}
            </article>
            <div
              className={clsx('transition-all duration-200 mt-2', {
                'opacity-0 focus-within:opacity-100 group-hover/message:opacity-100':
                  !isLastMessage,
                'opacity-100': isMobile,
              })}
            >
              {(!isLastMessage || !isLoading) && (
                <MessageActions
                  message={message.content}
                  showReload={isLastMessage}
                  reload={reload}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default memo(Message);

export const ThinkingMessage = () => {
  const role = 'assistant';

  return (
    <div
      className='w-full mx-auto max-w-3xl mt-10 min-h-[calc(100dvh-320px)]'
      data-role={role}
    >
      <div className='flex gap-3 md:gap-5'>
        <div className='flex flex-col gap-2 w-full pt-px'>
          <motion.div
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2 }}
            className='text-muted-foreground'
          >
            <p className='animate-pulse'>Thinking</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
