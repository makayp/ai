import { useEffect, useRef, useState } from 'react';

export function useScrollToBottom<T extends HTMLElement>({
  scrollOnLoad,
}: {
  scrollOnLoad?: boolean;
} = {}): [React.RefObject<T | null>, React.RefObject<T | null>] {
  const containerRef = useRef<T>(null);
  const endRef = useRef<T>(null);

  const [isAtBottom, setIsAtBottom] = useState(false);

  console.log(isAtBottom);

  useEffect(() => {
    const container = containerRef.current;
    const end = endRef.current;
    if (container && end && scrollOnLoad) {
      end.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scrollOnLoad]);

  useEffect(() => {
    const container = containerRef.current;
    const end = endRef.current;
    if (container && end) {
      const handleScroll = () => {
        if (
          container.scrollTop >=
          container.scrollHeight - container.clientHeight - 5
        ) {
          setIsAtBottom(true);
        } else {
          setIsAtBottom(false);
        }
      };

      container.addEventListener('scroll', handleScroll);

      const observer = new MutationObserver(() => {
        if (isAtBottom) {
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
  }, [isAtBottom]);

  return [containerRef, endRef];
}
