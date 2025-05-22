import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Copy from './copy';
import { memo } from 'react';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type CodeBoxProps = {
  codeString: string;
  language: string | undefined;
};

function CodeBlock({ language, codeString }: CodeBoxProps) {
  return (
    <div className='relative bg-neutral-50 rounded-lg border border-gray-200 text-sm'>
      <div className='flex justify-between  items-center h-[40px] bg-neutral-100 py-3 pl-4 rounded-t-lg font-medium font-sans'>
        <span className='text-gray-600'>{language ? language : 'text'}</span>
        <Copy text={codeString} className='text-gray-600' />
      </div>

      <div className='overflow-x-auto not-prose'>
        <SyntaxHighlighter
          PreTag='div'
          className='!bg-transparent !px-5 !py-5 !m-0 !leading-6'
          language={language}
          style={oneLight}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default memo(CodeBlock);
