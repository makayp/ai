'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import { ArrowUpIcon, StopCircle } from 'lucide-react';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import clsx from 'clsx';

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

function ChatInput({
  inputValue,
  setInput,
  isLoading,
  stop,
  messages,
  append,
  className,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const isMobile = useIsMobile();
  const [isTextAreaFocused, setIsTextAreaFocused] = useState<boolean>(true);

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, [inputValue]);

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
  };

  const submitForm = useCallback(() => {
    if (!inputValue.trim()) return;
    append({
      role: 'user',
      content: inputValue,
    });
    setInput('');

    if (!isMobile) {
      textareaRef.current?.focus();
    }
  }, [append, inputValue, isMobile, setInput]);

  return (
    <form
      ref={formRef}
      className={clsx(
        'relative flex flex-col items-center gap-4 mx-auto w-[calc(100dvw-32px)] sm:w-[calc(100%-70px)] max-w-3xl',
        {
          'sm:pl-5': messages.length > 0,
        }
      )}
    >
      <div
        className={clsx(
          'relative px-3 w-full rounded-2xl bg-gray-100 pt-2.5 pb-12 cursor-text',
          {
            'ring-2 ring-ring ring-offset-2': isTextAreaFocused,
          }
        )}
        onClick={() => {
          textareaRef.current?.focus();
        }}
      >
        <Textarea
          ref={textareaRef}
          placeholder='Send a Message...'
          value={inputValue}
          onChange={handleInputChange}
          className={twMerge(
            'min-h-[45px] max-h-[calc(40dvh)] overflow-auto resize-none text-base border-none bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500',
            className
          )}
          rows={1}
          autoFocus
          onFocus={() => {
            setIsTextAreaFocused(true);
          }}
          onBlur={() => {
            setIsTextAreaFocused(false);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              if (isMobile) return;
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
            type='button'
            className='rounded-full p-2 h-fit absolute bottom-2 right-2 m-0.5 text-white'
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              stop();
            }}
          >
            <StopCircle size={14} />
          </Button>
        ) : (
          <Button
            className='rounded-full p-2 h-fit absolute bottom-2 right-2 m-0.5 text-white disabled:pointer-events-auto'
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              submitForm();
            }}
            disabled={inputValue.trim().length === 0}
          >
            <ArrowUpIcon size={14} />
          </Button>
        )}
      </div>
    </form>
  );
}

export default memo(ChatInput);
