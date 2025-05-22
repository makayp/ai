import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function AnimateText({
  staggerDelay = 0.05,
  duration = 0.5,
  children,
}: {
  staggerDelay?: number;
  duration?: number;
  children: string;
}) {
  const [done, setDone] = useState(false);
  const words = children.split(' ');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDone(true);
    }, (words.length * staggerDelay + duration) * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [staggerDelay, duration, words.length]);

  if (done) {
    return <>{children}</>;
  }

  return (
    <span>
      {words.map((word, index) => {
        return (
          <motion.span
            key={index + word}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration, delay: index * staggerDelay }}
          >
            {word}{' '}
          </motion.span>
        );
      })}
    </span>
  );
}
