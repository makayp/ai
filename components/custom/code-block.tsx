import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Copy from './copy';
import { memo } from 'react';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type CodeBoxProps = {
  codeString: string;
  language: string | undefined;
  isBlockCode: boolean;
};

function CodeBlock({ language, codeString, isBlockCode }: CodeBoxProps) {
  return (
    <>
      {isBlockCode && (
        <div className='bg-neutral-50 rounded-lg border border-gray-200 text-sm'>
          <div className='flex justify-between  items-center h-[40px] bg-neutral-100 py-3 pl-4 rounded-t-lg font-medium font-sans'>
            <span className='text-gray-600'>
              {language ? language : 'text'}
            </span>
            <Copy text={codeString} className='text-gray-600' />
          </div>

          <div className='overflow-x-auto not-prose leading-6'>
            <SyntaxHighlighter
              PreTag='div'
              className='!bg-transparent !px-5 !py-5'
              language={language}
              style={oneLight}
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
      {!isBlockCode && (
        <code className='bg-neutral-200 text-gray-950 rounded py-0.5 px-1.5 text-sm w-fit not-prose'>
          {codeString}
        </code>
      )}
    </>
  );
}

export default memo(CodeBlock);
