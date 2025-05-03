import Chat from '../../components/custom/chat';
import { generateRandomUUID } from '@/lib/utils';

export default async function Home() {
  const id = generateRandomUUID();

  return (
    <div className='relative h-[calc(100%-64px)]fg h-dvh pb-4'>
      <Chat id={id} initialMessages={[]} />
    </div>
  );
}
