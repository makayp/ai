'use client';

import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import React, { useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { ArrowUpIcon, StopCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useIsMobile } from '@/hooks/use-mobile';
import { twMerge } from 'tailwind-merge';
import SuggestedActions from './suggested-actions';

type ChatInputProps = {
  inputValue: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  stop: () => void;
  messages: Array<Message>;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  chatId: string;
  className?: string;
};

export default function ChatInput({
  inputValue,
  setInput,
  isLoading,
  stop,
  messages,
  append,
  handleSubmit,
  chatId,
  className,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const isMobile = useIsMobile();

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, []);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + 0
      }px`;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  const submitForm = useCallback(() => {
    formRef.current?.requestSubmit();
    adjustHeight();

    if (!isMobile) {
      textareaRef.current?.focus();
    }
  }, [isMobile]);

  return (
    <form
      ref={formRef}
      className='flex flex-row gap-2 relative items-end w-full'
      onSubmit={handleSubmit}
    >
      <div className={'relative w-full flex flex-col gap-4'}>
        {messages.length === 0 && (
          <SuggestedActions append={append} chatId={chatId} />
        )}

        <Textarea
          ref={textareaRef}
          placeholder='Send a message...'
          value={inputValue}
          onChange={handleInputChange}
          className={twMerge(
            'min-h-[24px] max-h-[calc(60dvh)] overflow-auto resize-none rounded-xl text-base bg-muted border-none',
            className
          )}
          rows={3}
          autoFocus
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();

              if (isLoading) {
                toast.error(
                  'Please wait for the model to finish its response!'
                );
              } else {
                submitForm();
              }
            }
          }}
        />

        {isLoading ? (
          <Button
            className='rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5 text-white'
            onClick={(event) => {
              event.preventDefault();
              stop();
            }}
          >
            <StopCircle size={14} />
          </Button>
        ) : (
          <Button
            className='rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5 text-white'
            onClick={(event) => {
              event.preventDefault();
              submitForm();
            }}
            disabled={inputValue.length === 0}
          >
            <ArrowUpIcon size={14} />
          </Button>
        )}

        {/* <Button
        className='rounded-full p-1.5 h-fit absolute bottom-2 right-10 m-0.5 dark:border-zinc-700'
        onClick={(event) => {
          event.preventDefault();
          fileInputRef.current?.click();
        }}
        variant='outline'
        disabled={isLoading}
      >
        <PaperclipIcon size={14} />
      </Button> */}
      </div>
    </form>
  );
}
