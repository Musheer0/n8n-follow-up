import { requireAuth } from '@/lib/auth'
import { LogOutIcon, UserIcon } from 'lucide-react';
import React from 'react'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu';
import LogoutButton from './auth/shared/logout-button';

const SidebarUser = async() => {
    const auth = await requireAuth();
  return (
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger
                asChild>
            <SidebarMenuButton
            >             
                         <UserIcon/>
    <p>{auth.user.email.split('@')[0]}</p>     
            </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <p className='p-4'>Signed in as <br/><strong>{auth.user.email}</strong></p>
                   <LogoutButton>

                     <DropdownMenuItem>
                        <LogOutIcon/>
                        <DropdownMenuLabel>
                            Logout
                        </DropdownMenuLabel>
                    </DropdownMenuItem>
                   </LogoutButton>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default SidebarUser
