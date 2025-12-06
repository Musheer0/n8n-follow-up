import Image from 'next/image';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
  <div className='w-full 
  bg-gradient-to-b 
  from-primary
  flex-col
  to-foreground
  h-screen flex items-center justify-center
  p-5
  '>
    <div className=' flex w-full max-w-md  items-center py-3 gap-2'>
        <Image
        src={'/logo.svg'}
        alt='logo'
        width={45}
        height={45}
        />
        <p className='text-background font-semibold text-lg'>Node Base</p>
    </div>
    {children}
  </div>
  );
};

export default Layout;