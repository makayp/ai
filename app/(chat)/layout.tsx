import Header from '@/components/custom/header';

export const dynamic = 'force-dynamic';

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col h-dvh overflow-hidden'>
      <Header />
      {children}
    </div>
  );
}
