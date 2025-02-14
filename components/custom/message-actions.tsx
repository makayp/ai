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
    <div className='flex items-center gap-3 w-fit rounded-lg mt-2 [&_svg]:size-3.5k'>
      <Copy
        text={message}
        description='Copy response'
        variant='outline'
        className='p-2 h-fit'
      />

      {showReload && <ReloadButton onClick={reload} className='p-2 h-fit' />}
    </div>
  );
}
