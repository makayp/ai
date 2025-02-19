import { memo } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import CodeBlock from './code-block';
import { preprocessLaTeX } from '@/lib/utils';

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
        isBlockCode={!!match || !!children?.toString().includes('\n')}
        language={match?.[1]}
        codeString={String(children).replace(/\n$/, '')}
      />
    );
  },

  pre: ({ children }) => (
    <pre className='p-0 bg-transparent text-gray-800'>{children}</pre>
  ),

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
  const parsedLatex = preprocessLaTeX(children);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeSanitize, rehypeKatex]}
      components={components}
      className='prose max-w-none text-gray-900'
    >
      {parsedLatex}
    </ReactMarkdown>
  );
}

export default memo(Markdown);
