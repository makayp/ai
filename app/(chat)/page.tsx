import { generateRandomUUID } from '@/lib/utils';
import Chat from '../../components/custom/chat';

export const revalidate = 0;

export default async function Home() {
  const id = generateRandomUUID();

  return (
    <div className='relative min-h-dvh overflow-hidden'>
      <Chat key={id} id={id} initialMessages={[]} />
    </div>
  );
}
