import { useIsMobile } from '@/hooks/use-mobile';
import { ChatRequestOptions, type Message as MessageType } from 'ai';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { memo } from 'react';
import Markdown from './markdown';
import MessageActions from './message-actions';
import { Weather } from './weather';

type MessageProps = {
  message: MessageType;
  isLastMessage: boolean;
  isLoading: boolean;
  reload: (
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
};

function Message({ message, isLastMessage, isLoading, reload }: MessageProps) {
  const isMobile = useIsMobile();
  return (
    <div
      className='text-gray-900 w-full data-[role=user]:my-5 group/message mt-10'
      data-role={message.role}
    >
      {message.role === 'user' &&
        message.parts &&
        message.parts.map(
          (part) =>
            part.type === 'text' && (
              <motion.div
                key={message.id}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className='bg-gray-100 px-4 py-3 rounded-xl overflow-hidden ml-auto max-w-[80%] w-fit'
              >
                <article data-role={message.role}>
                  <div className='whitespace-pre-wrap'>{part.text}</div>
                </article>
              </motion.div>
            )
        )}

      {message.parts && message.role === 'assistant' && (
        <motion.div
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={isLoading ? { duration: 0 } : {}}
          className={clsx('flex gap-3 md:gap-5 w-full rounded-xl')}
        >
          <div>
            <Bot className='size-6 md:size-7 md:-mt-[3px] stroke-[1.5px]' />
          </div>
          <div className='flex flex-col w-full overflow-hidden'>
            <article className={'flex flex-col w-full overflow-hidden'}>
              {message.parts.map((part) => {
                if (
                  part.type === 'tool-invocation' &&
                  part.toolInvocation.state === 'result'
                ) {
                  const { result } = part.toolInvocation;

                  if (part.toolInvocation.toolName === 'getWeather') {
                    return (
                      <div
                        key={part.toolInvocation.toolCallId}
                        className='w-full mb-5'
                      >
                        {!result.error && (
                          <Weather
                            key={part.toolInvocation.toolCallId}
                            weatherAtLocation={result}
                          />
                        )}
                      </div>
                    );
                  }
                }

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
        </motion.div>
      )}
    </div>
  );
}

export default memo(Message);

export const ThinkingMessage = () => {
  const role = 'assistant';

  return (
    <div
      className='w-full mx-auto max-w-3xl group/message mt-10'
      data-role={role}
    >
      <div className='flex gap-3 md:gap-5'>
        <div>
          <Bot className='size-6 md:size-7 md:-mt-[3px] stroke-[1.5px]' />
        </div>

        <div className='flex flex-col gap-2 w-full pt-0.5'>
          <motion.div
            initial={{
              y: 5,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{ delay: 2 }}
            className='flex flex-col gap-4 text-muted-foreground animate-pulse'
          >
            Thinking
          </motion.div>
        </div>
      </div>
    </div>
  );
};
