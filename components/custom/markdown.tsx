import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import CodeBlock from './code-block';
import { memo } from 'react';

const components: Partial<Components> = {
  table(props) {
    return (
      <div className='overflow-x-auto'>
        <table>{props.children}</table>
      </div>
    );
  },
  code(props) {
    const { children, className } = props;
    const match = /language-(\w+)/.exec(className || '');

    return (
      <CodeBlock
        isBlockCode={!!match}
        language={match?.[1]}
        codeString={String(children).replace(/\n$/, '')}
      />
    );
  },

  pre: ({ children }) => <>{children}</>,

  p: ({ children }) => <p className='my-0 mb-4 '>{children}</p>,

  li: ({ children, ...props }) => {
    return (
      <li className='py-1 marker:text-gray-600' {...props}>
        {children}
      </li>
    );
  },

  a: ({ children, ...props }) => {
    return (
      <a
        className='text-blue-500 no-underline hover:underline font-normal'
        target='_blank'
        rel='noreferrer'
        {...props}
      >
        {children}
      </a>
    );
  },
  h1: ({ children }) => <h1 className='mt-0 mb-7'>{children}</h1>,
  h2: ({ children }) => <h2 className='mt-0 mb-6'>{children}</h2>,
  h3: ({ children }) => <h3 className='mt-0 mb-5'>{children}</h3>,
  h4: ({ children }) => <h4 className='mt-0 mb-2'>{children}</h4>,
  h5: ({ children }) => <h5 className='mt-0 mb-2'>{children}</h5>,
  h6: ({ children }) => <h6 className='mt-0 mb-2'>{children}</h6>,
};

function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSanitize]}
      components={components}
      className='text-gray-700'
    >
      {children}
    </ReactMarkdown>
  );
}

export default memo(Markdown);
