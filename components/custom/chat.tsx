'use client';

import { MAX_ATTACHMENTS } from '@/lib/config';
import { generateRandomUUID, processFiles, uploadFile } from '@/lib/utils';
import { Message, useChat } from '@ai-sdk/react';
import { Attachment } from 'ai';
import { formatDistanceToNow } from 'date-fns';
import { Upload } from 'lucide-react';
import { DragEvent, useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import ChatInput from './chat-input';
import ChatHeader from './chat-header';
import Messages from './messages';

type ChatProps = {
  id: string;
  initialMessages: Message[];
};

export default function Chat({ id, initialMessages }: ChatProps) {
  const {
    id: chatId,
    messages,
    handleSubmit,
    input,
    setInput,
    append,
    status,
    stop,
    reload,
    error,
  } = useChat({
    id,
    initialMessages,
    maxSteps: 5,
    sendExtraMessageFields: true,
    generateId: generateRandomUUID,
  });

  const [uploadQueue, setUploadQueue] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [attachments, setAttachments] = useState<Array<Attachment>>([]);

  useEffect(() => {
    if (error) {
      try {
        const parsedError = JSON.parse(error.message);
        if (parsedError.rateLimit) {
          const { type, reset } = parsedError.rateLimit;

          if (type === 'request-per-minute' || type === 'too-many-requests') {
            toast.error('Too many requests. Try again in a few minutes.');
          } else if (type === 'request-per-day') {
            const timeRemaining = formatDistanceToNow(new Date(reset), {
              addSuffix: true,
            });
            toast.error(
              `Daily request limit reached. Try again ${timeRemaining}.`
            );
          }
        } else {
          toast.error('Something went wrong.');
        }
      } catch (error) {
        console.error('Error parsing error message:', error);
        toast.error('An error occurred.');
      }
    }
  }, [error]);

  const uploadFiles = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return;

      setUploadQueue(files.map((file) => file.name));

      try {
        const allowedFiles = await processFiles(files);

        if (attachments.length + allowedFiles.length > MAX_ATTACHMENTS) {
          toast.error(
            `You can only attach up to ${MAX_ATTACHMENTS} files at a time.`
          );
        }

        const uploadPromises = allowedFiles
          .slice(0, MAX_ATTACHMENTS - attachments.length)
          .map((file) => uploadFile(file));
        const uploadedAttachments = await Promise.all(uploadPromises);
        const successfullyUploadedAttachments = uploadedAttachments.filter(
          (attachment) => attachment !== undefined
        );

        setAttachments((currentAttachments) => {
          const updatedAttachments = [
            ...currentAttachments,
            ...successfullyUploadedAttachments,
          ];

          return updatedAttachments;
        });
      } catch (error) {
        console.error('Error attaching files!', error);
      } finally {
        setUploadQueue([]);
      }
    },
    [attachments.length]
  );

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      const files = Array.from(event.dataTransfer.files);
      uploadFiles(files);
    },
    [uploadFiles]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={'flex flex-col h-full w-full pb-4'}
    >
      <ChatHeader messages={messages} />

      <Messages
        chatId={chatId}
        append={append}
        messages={messages}
        status={status}
        error={error}
        reload={reload}
      />

      <ChatInput
        append={append}
        inputValue={input}
        setInput={setInput}
        status={status}
        attachments={attachments}
        setAttachments={setAttachments}
        stop={stop}
        handleSubmit={handleSubmit}
        uploadQueue={uploadQueue}
        uploadFiles={uploadFiles}
      />

      {isDragging && (
        <div className='absolute inset-0 flex flex-col text-lg items-center justify-center gap-2 bg-background/90 text-foreground rounded-md z-50 border border-dashed border-primary/70'>
          <Upload className='size-8' />
          Drop files here to add them to the chat
        </div>
      )}
    </div>
  );
}
