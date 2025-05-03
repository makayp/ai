'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export default function Header() {
  const router = useRouter();
  return (
    <header className='flex items-center justify-between absolute left-0 right-0 z-10 px-4 md:px-6 h-14 bg-background/90 backdrop-blur border-b border-muted lg:border-none xl:bg-transparent xl:backdrop-blur-none'>
      <h1 className='text-foreground/80 text-lg font-bold tracking-wider'>
        AIPRO
      </h1>

      <Button
        variant='outline'
        className='shadow-none px-3 rounded-3xl'
        onClick={() => {
          router.push('/');
          router.refresh();
        }}
      >
        <Plus className='size-4' />
        <span>New chat</span>
      </Button>
    </header>
  );
}
