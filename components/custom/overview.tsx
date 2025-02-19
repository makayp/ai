import { AnimatePresence, motion } from 'framer-motion';
import SuggestedActions from './suggested-actions';
import { ChatRequestOptions, CreateMessage, type Message } from 'ai';
import { memo } from 'react';

type OverviewProps = {
  chatId: string;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
};

function Overview({ chatId, append }: OverviewProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className='overflow-auto w-full flex-1 pt-6 pb-16'
      >
        <div className='flex items-center justify-center w-[calc(100%-32px)] sm:w-[calc(100%-70px)] max-w-3xl mx-auto rounded-xl text-center h-full min-h-fit'>
          <div className='flex flex-col gap-10 w-full'>
            <h1 className='text-xl sm:text-2xl font-semibold text-gray-600'>
              How Can I Assist You Today?
            </h1>

            <SuggestedActions chatId={chatId} append={append} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default memo(Overview);
