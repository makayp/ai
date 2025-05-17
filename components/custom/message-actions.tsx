import { ChatRequestOptions } from 'ai';
import Copy from './copy';
import ReloadButton from './reload-button';

type MessageActionsProps = {
  message: string;
  showReload?: boolean;
  reload: (
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
};

export default function MessageActions({
  message,
  reload,
  showReload,
}: MessageActionsProps) {
  return (
    <div className='flex items-center gap-2 w-fit rounded-lg mt-2 [&_svg]:size-3.5'>
      <Copy
        text={message}
        description='Copy response'
        variant='outline'
        className='p-1.5 h-fit shadow-none'
      />

      {showReload && (
        <ReloadButton onClick={reload} className='p-1.5 h-fit shadow-none' />
      )}
    </div>
  );
}
