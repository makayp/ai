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
