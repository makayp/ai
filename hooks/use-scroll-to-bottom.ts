import { useEffect, useRef, useState } from 'react';

export function useScrollToBottom<T extends HTMLElement>(): [
  React.RefObject<T | null>,
  React.RefObject<T | null>
] {
  const containerRef = useRef<T>(null);
  const endRef = useRef<T>(null);
  const [isManualScroll, setIsManualScroll] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const end = endRef.current;

    if (container && end) {
      const handleScroll = () => {
        // Check if the user has manually scrolled away from the bottom
        if (
          container.scrollTop <
          container.scrollHeight - container.clientHeight - 10
        ) {
          setIsManualScroll(true); // User has scrolled manually
        } else {
          setIsManualScroll(false); // User is at the bottom
        }
      };

      container.addEventListener('scroll', handleScroll);

      // Set up MutationObserver to scroll to the bottom when new content is added (auto-scroll)
      const observer = new MutationObserver(() => {
        if (!isManualScroll) {
          // Only scroll if the user hasn't manually scrolled
          container.scrollTop = container.scrollHeight;
        }
      });

      observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });

      return () => {
        container.removeEventListener('scroll', handleScroll);
        observer.disconnect();
      };
    }
  }, [isManualScroll]);

  return [containerRef, endRef];
}
