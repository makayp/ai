import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Copy from './copy';

type CodeBoxProps = {
  language?: string;
  codeString: string;
};

export default function CodeBlock({ language, codeString }: CodeBoxProps) {
  const match = /(\w+)/.exec(language || '');

  language = language === 'js' ? 'javascript' : language;

  return (
    <>
      {match && (
        <div className='bg-gray-50 rounded-lg'>
          {language && (
            <div className='flex justify-between  items-center h-[45px] bg-gray-100 py-3 px-4 rounded-t-xl text-xs font-semibold'>
              <span>{language}</span>
              <Copy text={codeString} />
            </div>
          )}

          <div className='overflow-x-auto text-sm not-prose leading-6'>
            <SyntaxHighlighter
              PreTag={'div'}
              className='!bg-transparent !p-4'
              language={language}
              style={language ? atomOneLight : {}}
              // style={theme.colorBrewer}
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
      {!match && (
        <code className='bg-gray-900/10 rounded-md py-0.5 px-1 text-sm not-prose'>
          {codeString}
        </code>
      )}
    </>
  );
}
