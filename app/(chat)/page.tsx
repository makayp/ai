import { generateRandomUUID } from '@/lib/utils';
import Chat from '../../components/custom/chat';

export const revalidate = 0;

export default async function Home() {
  const id = generateRandomUUID();

  return (
    <div className='relative h-dvh pb-4'>
      <Chat id={id} initialMessages={[]} />
    </div>
  );
}
