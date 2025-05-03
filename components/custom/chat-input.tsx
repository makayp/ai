'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { Attachment, ChatRequestOptions, CreateMessage, Message } from 'ai';
import {
  ArrowUpIcon,
  Bold,
  Brain,
  Lightbulb,
  PaperclipIcon,
  Plus,
  StopCircle,
} from 'lucide-react';
import React, {
  ChangeEvent,
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import clsx from 'clsx';
import { UseChatHelpers } from '@ai-sdk/react';
import { PreviewAttachment } from './preview-attachment';
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
  className?: string;
};

function ChatInput({
  chatId,
  inputValue,
  setInput,
  isLoading,
  status,
  stop,
  handleSubmit,
  attachments,
  setAttachments,
  className,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const isMobile = useIsMobile();
  const [isTextAreaFocused, setIsTextAreaFocused] = useState<boolean>(true);

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

  // const fileInputRef = useRef<HTMLInputElement>(null);
  // const [uploadQueue, setUploadQueue] = useState<Array<string>>([]);

  // const handleFileChange = useCallback(
  //   async (event: ChangeEvent<HTMLInputElement>) => {
  //     const files = Array.from(event.target.files || []);

  //     setUploadQueue(files.map((file) => file.name));

  //     try {
  //       files.map((file) => {
  //         const reader = new FileReader();
  //         reader.onload = async () => {
  //           const base64 = reader.result;

  //           setAttachments((currentAttachments) => [
  //             ...currentAttachments,
  //             {
  //               url: base64 as string,
  //               name: file.name,
  //               contentType: file.type,
  //             },
  //           ]);
  //         };
  //         reader.readAsDataURL(file);
  //       });
  //     } catch (error) {
  //       console.error('Error uploading files!', error);
  //     } finally {
  //       setUploadQueue([]);
  //     }
  //   },
  //   [setAttachments]
  // );

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
    <form
      ref={formRef}
      className={clsx(
        'relative flex flex-col items-center gap-4 mx-auto w-[calc(100dvw-32px)] sm:w-[calc(100dvw-70px)] max-w-3xl rounded-3xl overflow-hidden shadow border bg-background/90 backdrop-blur'
      )}
    >
      <div
        className='relative px-2.5 md:pl-4 w-full py-2 cursor-text'
        onClick={() => {
          textareaRef.current?.focus();
        }}
      >
        {/* <input
          type='file'
          className='fixed -top-4 -left-4 size-0.5 opacity-0 pointer-events-none'
          ref={fileInputRef}
          multiple
          onChange={handleFileChange}
          tabIndex={-1}
          onClick={(event) => {
            event.stopPropagation();
          }}
        /> */}

        {/* {(attachments.length > 0 || uploadQueue.length > 0) && (
          <div
            data-testid='attachments-preview'
            className='flex flex-row gap-2 overflow-x-scroll items-end'
          >
            {attachments.map((attachment) => (
              <PreviewAttachment key={attachment.url} attachment={attachment} />
            ))}

            {uploadQueue.map((filename) => (
              <PreviewAttachment
                key={filename}
                attachment={{
                  url: '',
                  name: filename,
                  contentType: '',
                }}
                isUploading={true}
              />
            ))}
          </div>
        )} */}

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

        <div className='flex flex-row justify-between items-end md:items-center'>
          <div>
            {/* <Button
              size='icon'
              variant='outline'
              className='shadow-none rounded-full mr-2'
              disabled={status !== 'ready'}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              <Plus size={14} />
            </Button> */}
            {/* <Toggle
              variant='outline'
              className='mr-2 rounded-full h-fit px-3 py-1 shadow-none text-foreground/80'
            >
              <Lightbulb size={14} />
              Reason
            </Toggle> */}
          </div>

          <div>
            {isLoading ? (
              <Button
                type='button'
                size='icon'
                className='rounded-full text-white'
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
                size='icon'
                className='rounded-full text-white disabled:pointer-events-auto'
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
        </div>
      </div>
    </form>
  );
}

export default memo(ChatInput);
