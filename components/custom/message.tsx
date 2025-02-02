import { type Message as MessageType } from 'ai';
import { cx } from 'class-variance-authority';
import { motion } from 'framer-motion';
import Markdown from './markdown';

type MessageProps = {
  message: MessageType;
};

export default function Message({ message }: MessageProps) {
  const isUserMessage = message.role === 'user';

  return (
    <div className='w-full group/message' data-role={message.role}>
      <div className='flex gap-4 group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-[70%] group-data-[role=user]/message:w-fit'>
        {!isUserMessage && (
          <div className='size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border'>
            🤖
          </div>
        )}
        {message.content &&
          (isUserMessage ? (
            <article className='bg-gray-100 px-4 py-3 rounded-xl overflow-hidden'>
              <div className='whitespace-pre-wrap'>{message.content}</div>
            </article>
          ) : (
            <article
              className={'flex flex-col prose max-w-none overflow-hidden pt-1'}
            >
              <Markdown>{message.content}</Markdown>
            </article>
          ))}
      </div>
    </div>
  );
}

export const ThinkingMessage = () => {
  const role = 'assistant';

  return (
    <motion.div
      className='w-full mx-auto max-w-3xl group/message '
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
      data-role={role}
    >
      <div
        className={cx(
          'flex gap-4 group-data-[role=user]/message:px-3 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl',
          {
            'group-data-[role=user]/message:bg-muted': true,
          }
        )}
      >
        <div className='size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border'>
          🤖
        </div>

        <div className='flex flex-col gap-2 w-full pt-1'>
          <div className='flex flex-col gap-4 text-muted-foreground animate-pulse'>
            Thinking...
          </div>
        </div>
      </div>
    </motion.div>
  );
};
