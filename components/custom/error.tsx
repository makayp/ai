import { UseChatHelpers } from '@ai-sdk/react';

type ErrorProps = {
  reload: UseChatHelpers['reload'];
};

export default function ChatError({ reload }: ErrorProps) {
  return (
    <div className='text-center text-red-500 min-h-[calc(100dvh-300px)]'>
      <p className='text-red-500'>Something went wrong.</p>

      <button onClick={() => reload()} className='text-gray-700 underline'>
        Try again?
      </button>
    </div>
  );
}
