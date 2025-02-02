import Chat from '../../components/custom/chat';
import { generateRandomUUID } from '@/lib/utils';

export default function Home() {
  const id = generateRandomUUID();

  return (
    <div className='relative h-[calc(100%-64px)] pb-6'>
      <Chat id={id} initialMessages={[]} />
    </div>
  );
}
