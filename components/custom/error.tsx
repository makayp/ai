import { useChat } from 'ai/react';

type ErrorProps = {
  chatId: string;
};

export default function ChatError({ chatId }: ErrorProps) {
  const { append, reload, messages } = useChat({ id: chatId });

  return (
    <div className='text-center text-red-500'>
      <p className='text-red-500'>Something went wrong.</p>

      <button
        onClick={() => {
          const lastMessage = messages[messages.length - 1];

          if (lastMessage && lastMessage.role === 'user') {
            append(messages.pop()!);
          } else {
            reload();
          }
        }}
        className='text-gray-700 underline'
      >
        Try again?
      </button>
    </div>
  );
}
