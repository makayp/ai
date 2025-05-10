import type { Attachment } from 'ai';

import { LoaderIcon } from './icons';
import { X } from 'lucide-react';

export const PreviewAttachment = ({
  id,
  attachment,
  onRemove,
  isUploading = false,
}: {
  id: number;
  attachment: Attachment;
  onRemove?: (index: number) => void;
  isUploading?: boolean;
}) => {
  const { name, url, contentType } = attachment;

  return (
    <div
      data-testid='input-attachment-preview'
      className='flex flex-col gap-2 group'
    >
      <div className='w-20 h-16 aspect-video bg-muted rounded-md relative flex flex-col items-center justify-center'>
        {contentType ? (
          contentType.startsWith('image') ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={url}
              src={url}
              alt={name ?? 'An image attachment'}
              className='rounded-md size-full object-cover'
            />
          ) : (
            <div className='' />
          )
        ) : (
          <div className='' />
        )}

        {isUploading && (
          <div
            data-testid='input-attachment-loader'
            className='animate-spin absolute text-zinc-500'
          >
            <LoaderIcon />
          </div>
        )}

        {onRemove && (
          <button
            type='button'
            className='hidden absolute top-1 right-1 text-zinc-500 hover:text-red-500 group-hover:flex bg-background/90 rounded-full'
            onClick={() => {
              onRemove(id);
            }}
          >
            <X className='size-4' />
          </button>
        )}
      </div>
      <div className='text-xs text-zinc-500 max-w-16 truncate'>{name}</div>
    </div>
  );
};
