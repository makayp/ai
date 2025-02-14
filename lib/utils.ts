import { Message } from 'ai';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';

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
