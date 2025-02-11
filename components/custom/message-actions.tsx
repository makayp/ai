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
    <div className='flex items-center gap-3 bg-gray-100 w-fit px-3 py-1 rounded-lg'>
      <Copy text={message} />

      {showReload && <ReloadButton onClick={reload} />}
    </div>
  );
}
