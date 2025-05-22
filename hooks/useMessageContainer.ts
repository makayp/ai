import { useEffect, useState } from 'react';
import { useScrollToBottom } from './use-scroll-to-bottom';
import { UseChatHelpers } from '@ai-sdk/react';

interface UseMessagesContainerProps {
  chatId: string;
  status: UseChatHelpers['status'];
  shouldScrollToBottom?: boolean;
}

export function useMessagesContainer({
  chatId,
  status,
  shouldScrollToBottom = true,
}: UseMessagesContainerProps) {
  const { isAtBottom, setIsAtBottom, scrollToBottom, containerRef, endRef } =
    useScrollToBottom();

  const [isMessageSent, setIsMessageSent] = useState(false);

  useEffect(() => {
    if (chatId && shouldScrollToBottom) {
      scrollToBottom('instant');
    }
  }, [chatId, scrollToBottom, shouldScrollToBottom]);

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
