import { UseChatHelpers } from '@ai-sdk/react';
import { motion } from 'framer-motion';
import { memo } from 'react';
import { ChatSuggestions } from './chat-suggestions';

type OverviewProps = {
  chatId: string;
  append: UseChatHelpers['append'];
};

function Overview({ append }: OverviewProps) {
  return (
    <div className='w-full flex-1 pt-10 transition-all duration-300 ease-in-out'>
      <div className='flex items-center justify-center w-[calc(100%-32px)] max-w-2xl mx-auto rounded-xl text-center h-full min-h-fit'>
        <div className='flex flex-col gap-5 w-full'>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='text-xl sm:text-2xl font-semibold text-foreground'
            >
              Hi there!
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className='text-xl sm:text-2xl font-semibold text-muted-foreground'
            >
              How can I assist you today?
            </motion.h1>
          </div>

          <ChatSuggestions onSelect={append} />
        </div>
      </div>
    </div>
  );
}

export default memo(Overview);
