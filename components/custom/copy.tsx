'use client';

import { Check, CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '../ui/button';
import Tooltip from './tooltip';

type CopyProps = {
  text: string;
  description?: string;
  variant?: 'ghost' | 'outline';
  className?: string;
};

export default function Copy({
  text,
  description,
  variant = 'ghost',
  className,
}: CopyProps) {
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
    <Tooltip content={isCopied ? 'Copied' : description || 'Copy'}>
      <Button
        size='icon'
        variant={variant}
        onClick={copyToClipboard}
        className={twMerge('text-gray-700', className)}
      >
        {isCopied ? (
          <Check className='stroke-[2.2px]' />
        ) : (
          <CopyIcon className='stroke-[2.2px]' />
        )}
      </Button>
    </Tooltip>
  );
}
