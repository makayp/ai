import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import CodeBlock from './code-block';
import Link from 'next/link';
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

  li: ({ children, ...props }) => {
    return (
      <li className='py-1' {...props}>
        {children}
      </li>
    );
  },

  a: ({ children, ...props }) => {
    return (
      // @ts-expect-error href property from props
      <Link
        className='text-blue-500 hover:underline'
        target='_blank'
        rel='noreferrer'
        {...props}
      >
        {children}
      </Link>
    );
  },
};

function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSanitize]}
      components={components}
    >
      {children}
    </ReactMarkdown>
  );
}

export default memo(Markdown);
