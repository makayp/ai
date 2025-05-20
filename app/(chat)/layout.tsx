export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className='flex flex-col h-dvh overflow-hidden'>{children}</div>;
}
