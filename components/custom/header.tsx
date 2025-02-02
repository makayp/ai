'use client';

import { Edit } from 'lucide-react';
import { ModelSelector } from './model-selector';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <header className='flex items-center justify-between min-h-16 sticky top-0 left-0 right-0 z-10 pl-2 pr-5 md:px-10 h-[64px]'>
      <div className='inline-flex items-centerh gap-2h'>
        <ModelSelector selectedModelId='gpt-4o-mini' />
      </div>

      <div className='flex items-center justify-center text-stone-700 text-[17px]'>
        <button
          className='flex gap-1 items-center'
          onClick={() => {
            router.push('/');
          }}
        >
          <Edit className='size-5' />
          <span className='sm:inline-flex'>New chat</span>
        </button>
      </div>
    </header>
  );
}
