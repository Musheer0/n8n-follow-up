"use client"

import { useSuspenseWorkflow } from '@/hooks/useSuspenseWorkflows'
import React from 'react'
import EditorHeader from './editor/editor-header';

const WorkflowPage = ({id}:{id:string}) => {
    const {data} = useSuspenseWorkflow(id);
  if(data)
  return (
    <div className='flex-1  h-full flex flex-col gap-2'>
      <EditorHeader id={data.id} name={data.name}/>
        {JSON.stringify(data,null,2)}
    </div>
  )
}

export default WorkflowPage