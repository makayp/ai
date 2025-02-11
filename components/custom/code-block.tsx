import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Copy from './copy';
import { memo } from 'react';

type CodeBoxProps = {
  codeString: string;
  language: string | undefined;
  isBlockCode: boolean;
};

function CodeBlock({ language, codeString, isBlockCode }: CodeBoxProps) {
  return (
    <>
      {isBlockCode && (
        <div className='bg-gray-50 rounded-lg border border-gray-200/80 mb-8'>
          <div className='flex justify-between  items-center h-[40px] bg-gray-100 py-3 px-4 rounded-t-xl text-sm font-semibold'>
            <span>{language ? language : 'code'}</span>
            <Copy text={codeString} />
          </div>

          <div className='overflow-x-auto text-sm not-prose leading-6'>
            <SyntaxHighlighter
              PreTag={'div'}
              className='!bg-transparent !px-5 !py-5'
              language={language}
              style={language ? atomOneLight : {}}
              // style={theme.colorBrewer}
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
      {!isBlockCode && (
        <code className='bg-gray-200/70 text-gray-800 rounded-md py-0.5 px-1.5 text-sm w-fit not-prose'>
          {codeString}
        </code>
      )}
    </>
  );
}

export default memo(CodeBlock);
