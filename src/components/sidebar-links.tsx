"use client"

import { HexagonIcon, KeyIcon, WorkflowIcon } from "lucide-react"
import { usePathname } from "next/navigation"


const menuLinks = [
    {
        name: 'Workflows',
        href:'/workflows',
        icon: WorkflowIcon
    },
      {
        name: 'Credentials',
        href:'/credentials',
        icon: KeyIcon
    },
       {
        name: 'Executions',
        href:'/executions',
        icon: HexagonIcon
    },
]

import React from 'react'
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import Link from "next/link"

const SidebarLinks = () => {
    const pathname = usePathname();
  return (
    <SidebarMenu>
        <SidebarGroup>
            <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
                  {menuLinks.map((link,i)=>{
                return (
                    <React.Fragment key={i}>
                        <SidebarMenuItem
                        
                        >
                                <SidebarMenuButton
                            isActive={pathname.startsWith(link.href)}
                            asChild
                            tooltip={link.name}
                            >
                           <Link href={link.href} prefetch>
                                <link.icon/>
                                {link.name}
                           </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </React.Fragment>
                )
            })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
    </SidebarMenu>
  )
}

export default SidebarLinks
