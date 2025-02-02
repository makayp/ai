import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './code-block';
import Link from 'next/link';

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

    return (
      <CodeBlock
        language={className?.split('-')[1]}
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

export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
