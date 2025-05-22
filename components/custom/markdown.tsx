/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { preprocessLaTeX } from '@/lib/utils';
import { memo, useRef } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import CodeBlock from './code-block';
import 'katex/dist/katex.min.css';

const components: Partial<Components> = {
  table({ node, children, ...props }) {
    return (
      <div className='overflow-x-auto'>
        <table {...props}>{children}</table>
      </div>
    );
  },
  code(props) {
    const { children, className } = props;
    const match = /language-(\w+)/.exec(className || '');
    const isBlockCode = !!match || !!children?.toString().includes('\n');
    const code = String(children).replace(/\n$/, '');

    if (isBlockCode) {
      return <CodeBlock language={match?.[1]} codeString={code} />;
    }

    return (
      <code className='not-prose bg-neutral-200 rounded py-0.5 px-1 text-sm font-semibold text-foreground/80'>
        {code}
      </code>
    );
  },

  pre: ({ node, children }) => <pre className='not-prose'>{children}</pre>,

  a: ({ node, children, ...props }) => {
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
};

function Markdown({ children }: { children: string }) {
  const parsedLatex = preprocessLaTeX(children);
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={parentRef}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeSanitize, rehypeKatex]}
        components={components}
        className='markdown max-w-none text-foreground prose prose-li:marker:text-gray-600'
      >
        {parsedLatex}
      </ReactMarkdown>
    </div>
  );
}

export default memo(Markdown);
