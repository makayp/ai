'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../ui/button';
import { ChatRequestOptions, CreateMessage, Message } from 'ai';

interface SuggestedActionsProps {
  chatId: string;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
}

export default function SuggestedActions({ append }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: 'Write code to',
      label: `implement binary search`,
      action: `Write code to implement binary search`,
    },
    {
      title: 'Help me write an essay',
      label: `about silicon valley`,
      action: `Help me write an essay about silicon valley`,
    },
    {
      title: 'What is the weather',
      label: 'in Paris?',
      action: 'What is the weather in Paris?',
    },
    {
      title: 'Help me to draft out',
      label: 'a gym plan',
      action: 'Help me draft out a gym plan',
    },
  ];

  return (
    <div className='grid sm:grid-cols-2 gap-2 w-full'>
      {suggestedActions.map((suggestedAction, index) => (
        <AnimatePresence
          key={`suggested-action-${suggestedAction.title}-${index}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.08 * (index + 1) }}
          >
            <Button
              variant='ghost'
              onClick={() => {
                append({
                  role: 'user',
                  content: suggestedAction.action,
                });
              }}
              className='text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start'
            >
              <span className='font-medium'>{suggestedAction.title}</span>
              <span className='text-muted-foreground'>
                {suggestedAction.label}
              </span>
            </Button>
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
}
