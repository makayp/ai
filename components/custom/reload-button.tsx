import { Button } from '../ui/button';
import Tooltip from './tooltip';
import { ChatRequestOptions } from 'ai';
import { RefreshCcw } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type ReloadButtonProps = {
  onClick: (
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  className?: string;
};

export default function ReloadButton({
  onClick,
  className,
}: ReloadButtonProps) {
  return (
    <Tooltip content='Regenerate'>
      <Button
        size='icon'
        variant='outline'
        onClick={() => onClick()}
        className={twMerge('text-gray-700', className)}
      >
        <RefreshCcw className='stroke-[2.2px]' />
      </Button>
    </Tooltip>
  );
}
