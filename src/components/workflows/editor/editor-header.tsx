"use client"
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { editorAtom } from '@/features/editor/store/atom'
import { useUpdateWorkflow } from '@/hooks/use-workflow'
import { useAtomValue } from 'jotai'
import { SaveIcon } from 'lucide-react'
import React from 'react'

const EditorHeader = ({id, name}:{id:string,name:string}) => {
  const saveChanges = useUpdateWorkflow()
  const editor = useAtomValue(editorAtom);
  const handleSave = ()=>{
    if(!editor) return ;
    const nodes = editor.getNodes();
    const edges = editor.getEdges();
    saveChanges.mutate({
      id,
      nodes,
      edges
    })
  }
  return (
    <div className='w-full py-3 px-4 border-b shadow-2xl flex items-center gap-5'>
        <SidebarTrigger/>
        <p className='text-sm text-muted-foreground'>{name}</p>

        <Button onClick={handleSave} disabled={saveChanges.isPending} className='ml-auto'>
          <SaveIcon/> {saveChanges.isPending ? "Saving":"Save"}
        </Button>
    </div>
  )
}

export default EditorHeader