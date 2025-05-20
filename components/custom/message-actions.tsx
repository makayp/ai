import Copy from './copy';
import ReloadButton from './reload-button';
import { UseChatHelpers } from '@ai-sdk/react';

type MessageActionsProps = {
  message: string;
  showReload?: boolean;
  reload: UseChatHelpers['reload'];
};

export default function MessageActions({
  message,
  reload,
  showReload,
}: MessageActionsProps) {
  return (
    <div className='flex items-center gap-2 w-fit rounded-lg mt-2 [&_svg]:size-[0.92rem]'>
      <Copy
        text={message}
        description='Copy response'
        variant='outline'
        className='p-1 h-fit shadow-none'
      />

      {showReload && (
        <ReloadButton onClick={reload} className='p-1 h-fit shadow-none' />
      )}
    </div>
  );
}
