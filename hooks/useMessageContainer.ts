import { useEffect, useState } from 'react';
import { useScrollToBottom } from './use-scroll-to-bottom';
import { UseChatHelpers } from '@ai-sdk/react';

interface UseMessagesContainerProps {
  chatId: string;
  status: UseChatHelpers['status'];
}

export function useMessagesContainer({ status }: UseMessagesContainerProps) {
  const { isAtBottom, setIsAtBottom, scrollToBottom, containerRef, endRef } =
    useScrollToBottom();

  const [isMessageSent, setIsMessageSent] = useState(false);

  useEffect(() => {
    if (status === 'submitted') {
      setIsMessageSent(true);
      scrollToBottom();
    }
  }, [scrollToBottom, status]);

  return {
    containerRef,
    endRef,
    isMessageSent,
    isAtBottom,
    setIsAtBottom,
    scrollToBottom,
  };
}
