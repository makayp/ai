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

  a: ({ children, ...props }) => {
    return (
      <a
        className='text-blue-600 no-underline hover:underline font-normal'
        target='_blank'
        rel='noreferrer'
        {...props}
      >
        {children}
      </a>
    );
  },

  li: ({ children, ...props }) => {
    return (
      <li className='marker:text-gray-600' {...props}>
        {children}
      </li>
    );
  },
};

function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSanitize]}
      components={components}
      className='prose max-w-none text-gray-900'
    >
      {children}
    </ReactMarkdown>
  );
}

export default memo(Markdown);
