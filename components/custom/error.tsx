import { useChat } from '@ai-sdk/react';

type ErrorProps = {
  chatId: string;
};

export default function ChatError({ chatId }: ErrorProps) {
  const { reload } = useChat({ id: chatId });

  return (
    <div className='text-center text-red-500'>
      <p className='text-red-500'>Something went wrong.</p>

      <button onClick={() => reload()} className='text-gray-700 underline'>
        Try again?
      </button>
    </div>
  );
}
