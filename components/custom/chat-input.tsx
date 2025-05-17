'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { MAX_ATTACHMENTS } from '@/lib/config';
import { UseChatHelpers } from '@ai-sdk/react';
import { Attachment } from 'ai';
import clsx from 'clsx';
import { ArrowUpIcon, Lightbulb, Plus, StopCircle } from 'lucide-react';
import React, {
  ChangeEvent,
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import PreviewAttachment from './preview-attachment';
import { cn } from '@/lib/utils';
import { Tooltip } from './tooltip';
import { Toggle } from '../ui/toggle';

type ChatInputProps = {
  inputValue: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  status: UseChatHelpers['status'];
  stop: () => void;
  append: UseChatHelpers['append'];
  handleSubmit: UseChatHelpers['handleSubmit'];
  chatId: string;
  attachments: Array<Attachment>;
  setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
  uploadQueue: Array<string>;
  uploadFiles: (files: File[]) => Promise<void>;
  className?: string;
};

function ChatInput({
  chatId,
  inputValue,
  setInput,
  isLoading,
  stop,
  handleSubmit,
  attachments,
  setAttachments,
  uploadQueue,
  className,
  uploadFiles,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const isMobile = useIsMobile();

  useEffect(() => {
    setInput('');
  }, [setInput, chatId]);

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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const removeAttachment = useCallback(
    (index: number) => {
      setAttachments((currentAttachments) =>
        currentAttachments.filter(
          (a) => currentAttachments.indexOf(a) !== index
        )
      );
    },
    [setAttachments]
  );

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);

      await uploadFiles(files);

      fileInputRef.current!.value = '';
    },
    [uploadFiles]
  );

  const submitForm = useCallback(() => {
    if (!inputValue.trim()) return;
    handleSubmit(undefined, {
      experimental_attachments: attachments,
    });

    setInput('');
    setAttachments([]);

    if (!isMobile) {
      textareaRef.current?.focus();
    }
  }, [
    attachments,
    handleSubmit,
    inputValue,
    isMobile,
    setAttachments,
    setInput,
  ]);

  return (
    <div
      className={cn(
        'flex flex-col gap-2 w-[calc(100dvw-32px)] sm:w-[calc(100dvw-70px)] max-w-3xl mx-auto',
        {
          'bg-background': attachments.length > 0 || uploadQueue.length > 0,
        }
      )}
    >
      {(attachments.length > 0 || uploadQueue.length > 0) && (
        <div
          data-testid='attachments-preview'
          className='flex flex-row gap-2 overflow-x-scroll items-end'
        >
          {attachments.map((attachment, index) => (
            <PreviewAttachment
              id={index}
              key={index + (attachment.name || '')}
              attachment={attachment}
              onRemove={removeAttachment}
            />
          ))}

          {uploadQueue.map((filename, index) => (
            <PreviewAttachment
              id={index}
              key={filename + index}
              attachment={{
                url: '',
                name: filename,
                contentType: '',
              }}
              isUploading={true}
            />
          ))}
        </div>
      )}
      <form
        ref={formRef}
        className={clsx(
          'relative flex flex-col items-center gap-4 rounded-3xl overflow-hidden shadow border bg-background/90 backdrop-blur'
        )}
      >
        <div
          className='relative px-2.5 md:pl-4 w-full py-2'
          onClick={(e) => {
            if (
              ['BUTTON', 'INPUT'].includes((e.target as HTMLElement).tagName)
            ) {
              return;
            }
            textareaRef.current?.focus();
          }}
        >
          <input
            type='file'
            className='fixed -top-4 -left-4 size-0.5 opacity-0 pointer-events-none'
            ref={fileInputRef}
            multiple
            accept='image/jpeg,image/png,image/webp'
            onChange={handleFileChange}
            tabIndex={-1}
          />

          <Textarea
            ref={textareaRef}
            placeholder='Send a message...'
            value={inputValue}
            onChange={handleInputChange}
            className={twMerge(
              'min-h-0 max-h-[calc(30dvh)] overflow-auto resize-none text-base border-none bg-transparent p-0 pr-4 m-1 mb-4 focus-visible:ring-0 focus-visible:ring-offset-0',
              className
            )}
            rows={1}
            autoFocus
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

          <div className='flex flex-row justify-between items-end md:items-center'>
            <div>
              <Tooltip
                content={
                  isLoading
                    ? 'Generating...'
                    : attachments.length >= MAX_ATTACHMENTS
                    ? 'Limit reached'
                    : 'Add files'
                }
              >
                <Button
                  size='icon'
                  variant='outline'
                  className='shadow-none rounded-full mr-2 disabled:pointer-events-auto'
                  disabled={isLoading || attachments.length >= MAX_ATTACHMENTS}
                  onClick={(event) => {
                    event.preventDefault();
                    fileInputRef.current?.click();
                  }}
                >
                  <Plus size={14} />
                </Button>
              </Tooltip>

              <Tooltip content='Coming soon!'>
                <Toggle
                  variant='outline'
                  disabled
                  className='mr-2 rounded-full pl-3 pr-4 py-1 shadow-none text-foreground/80 disabled:pointer-events-auto gap-1'
                >
                  <Lightbulb size={14} />
                  Think
                </Toggle>
              </Tooltip>
            </div>

            <div>
              {isLoading ? (
                <Tooltip content='Stop generating'>
                  <Button
                    type='button'
                    size='icon'
                    className='rounded-full text-white'
                    onClick={(event) => {
                      event.preventDefault();
                      stop();
                    }}
                  >
                    <StopCircle size={14} />
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip content='Send message'>
                  <Button
                    size='icon'
                    className='rounded-full text-white'
                    onClick={(event) => {
                      event.preventDefault();
                      submitForm();
                    }}
                    disabled={inputValue.trim().length === 0}
                  >
                    <ArrowUpIcon size={14} />
                  </Button>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default memo(ChatInput);
