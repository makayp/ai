'use client';

import { Edit } from 'lucide-react';
import { ModelSelector } from './model-selector';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <header className='flex items-center justify-between min-h-16 sticky top-0 left-0 right-0 z-10 pl-2 pr-5 md:pl-4 md:pr-10 h-[64px]'>
      <div className='inline-flex items-center gap-2h'>
        <ModelSelector selectedModelId='gpt-4o-mini' />
      </div>

      <div className='flex items-center justify-center text-gray-600 text-[17px]'>
        <button
          className='flex gap-2 items-center'
          onClick={() => {
            router.push('/');
          }}
        >
          <Edit className='size-5 sm:size-[22px]' />
          <span className='hidden sm:inline-flex font-medium'>New chat</span>
        </button>
      </div>
    </header>
  );
}
