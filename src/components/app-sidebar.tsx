import React, { Suspense } from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarRail } from '@/components/ui/sidebar'
import Link from 'next/link'
import Image from 'next/image'
import SidebarUser from './sidebar-user'
import { LoaderIcon, UserIcon } from 'lucide-react'
import SidebarLinks from './sidebar-links'
import CheckoutBtn from './polar/checkout-btn'
import PotralBtn from './polar/potral-btn'
import { ModeToggle } from './mode-toggle'

const AppSidebar = () => {
  return (
   <Sidebar collapsible='icon'>
    <SidebarRail/>
    <SidebarHeader>
        <Link href={'/'} prefetch className='flex items-center gap-2'>
        <Image src={'/logo.svg'} alt='logo' width={40} height={30}/>
        <h1 className='font-semibold  group-data-[collapsible=icon]:hidden'>Nodebase</h1>
        </Link>
    </SidebarHeader>
 <SidebarContent>
  <SidebarLinks/>
 <ModeToggle/>
 </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <CheckoutBtn/>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <PotralBtn/>
        </SidebarMenuItem>
      </SidebarMenu>
        <Suspense fallback={<div className='w-full flex p-3  items-center gap-2'>
    
                   <LoaderIcon className='animate-spin'/>

        </div>}>
        <SidebarUser/>
        </Suspense>
    </SidebarFooter>
   </Sidebar>
  )
}

export default AppSidebar
