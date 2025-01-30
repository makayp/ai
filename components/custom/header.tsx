import { Edit } from 'lucide-react';
import { ModelSelector } from './model-selector';

export default function Header() {
  return (
    <header className='flex items-center justify-center min-h-16 shadow-smb sticky top-0 left-0 right-0 bg-gray-50b z-10'>
      <div className='absolute left-0 top-0 bottom-0 flex items-center justify-center ml-5'>
        <button className='flex gap-2 items-center'>
          <Edit className='size-5' />
          <span className='hidden sm:inline-flex'>New chat</span>
        </button>
      </div>

      <div className='inline-flex font-[var(--font-geist-sans)]'>
        <h1 className='text-[20px] font-semibold tracking-wide'>AIPro</h1>
      </div>

      <div className='absolute right-0 top-0 bottom-0 flex items-center justify-center mr-5'>
        <ModelSelector selectedModelId='gpt-4o-mini' />
      </div>
    </header>
  );
}
