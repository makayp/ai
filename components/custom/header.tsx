import { Edit } from 'lucide-react';
import { LogoWithModelSelector } from './logo-with-model-selector';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='flex items-center justify-between min-h-16 sticky top-0 left-0 right-0 z-10 pl-2 pr-5 md:pl-4 md:pr-10 h-[64px]'>
      <LogoWithModelSelector selectedModelId='gpt-4o-mini' />

      <Link
        href='/'
        className='flex items-center gap-2 text-gray-600 text-[17px] font-medium w-fit'
      >
        <Edit className='size-5' />
        <span className='hidden sm:inline-flex font-medium'>New chat</span>
      </Link>
    </header>
  );
}
