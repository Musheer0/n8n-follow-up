"use client"
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { SaveIcon } from 'lucide-react'
import React from 'react'

const EditorHeader = ({id, name}:{id:string,name:string}) => {
  return (
    <div className='w-full py-3 px-4 border-b shadow-2xl flex items-center gap-5'>
        <SidebarTrigger/>
        <p className='text-sm text-muted-foreground'>{name}</p>

        <Button className='ml-auto'><SaveIcon/> Save</Button>
    </div>
  )
}

export default EditorHeader