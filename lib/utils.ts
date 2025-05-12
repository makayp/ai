import { Attachment, Message } from 'ai';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';
import { ALLOWED_ATTACHMENT_TYPES, MAX_ATTACHMENT_SIZE } from './config';
import { toast } from 'sonner';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomUUID(): string {
  return uuidv4();
}

export function isLastMessage({
  messages,
  message,
}: {
  messages: Message[];
  message: Message;
}): boolean {
  return messages[messages.length - 1]?.id === message.id;
}

export function preprocessLaTeX(content: string) {
  // Escape LaTeX-specific backslashes first, to avoid issues with escaped delimiters
  const escapedContent = content.replace(/\\([\\()[]{}^$&])/g, '\\$1');

  // Replace block-level LaTeX delimiters \[ \] with $$ $$
  const blockProcessedContent = escapedContent.replace(
    /\\\[(.*?)\\\]/gs,
    (_, equation) => `$$${equation}$$`
  );

  // Replace inline LaTeX delimiters \( \) with $ $
  const inlineProcessedContent = blockProcessedContent.replace(
    /\\\((.*?)\\\)/gs,
    (_, equation) => `$${equation}$`
  );

  return inlineProcessedContent;
}

export function processFiles(files: File[]): Promise<Attachment[]> {
  if (files.some((file) => !ALLOWED_ATTACHMENT_TYPES.includes(file.type))) {
    toast.error('Only JPEG, PNG, and WEBP image formats are allowed.');
  }
  if (files.some((file) => file.size > MAX_ATTACHMENT_SIZE)) {
    toast.error(`One or more files are too large. Max size is 5MB.`);
  }

  const allowedFiles = files.filter(
    (file) =>
      ALLOWED_ATTACHMENT_TYPES.includes(file.type) &&
      file.size <= MAX_ATTACHMENT_SIZE
  );

  return convertFilesToAttachments(allowedFiles);
}

export function convertFilesToAttachments(
  files: File[]
): Promise<Attachment[]> {
  return Promise.all(
    files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () =>
          resolve({
            url: reader.result as string,
            name: file.name,
            contentType: file.type,
          });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      }) as Promise<Attachment>;
    })
  );
}
