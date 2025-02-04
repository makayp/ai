'use client';

import { Check, CopyIcon } from 'lucide-react';
import { Button } from '../ui/button';
import Tooltip from './tooltip';
import { useState } from 'react';
import clsx from 'clsx';

export default function Copy({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  async function copyToClipboard() {
    if (!navigator?.clipboard || isCopied) return;

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Tooltip content='copy'>
      <Button
        asChild
        variant='ghost'
        onClick={copyToClipboard}
        className={clsx('h-fit p-1 text-gray-600', {
          'hover:text-gray-500': !isCopied,
        })}
      >
        {isCopied ? (
          <Check className='size-[23px]' />
        ) : (
          <CopyIcon className='size-[23px]' />
        )}
      </Button>
    </Tooltip>
  );
}
