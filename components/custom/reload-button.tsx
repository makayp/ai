import { Button } from '../ui/button';
import clsx from 'clsx';
import Tooltip from './tooltip';
import { ChatRequestOptions } from 'ai';
import { RefreshCcw } from 'lucide-react';

type ReloadButtonProps = {
  onClick: (
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
};

export default function ReloadButton({ onClick }: ReloadButtonProps) {
  return (
    <Tooltip content='Regenerate'>
      <Button
        asChild
        variant='ghost'
        onClick={() => onClick()}
        className={clsx('h-fit p-1 text-gray-700 hover:text-gray-500')}
      >
        <RefreshCcw className='size-[23px] stroke-[2.2px]' />
      </Button>
    </Tooltip>
  );
}
