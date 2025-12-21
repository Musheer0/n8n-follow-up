import React, { memo, useState } from 'react'
import {NodeProps} from '@xyflow/react'
import { PlaceholderNode } from './placeholder-node'
import { PlusIcon } from 'lucide-react'
import { WorkflowNode } from './workflow-node'
import NodeSelector from '../workflows/editor/node-selector'
const InitialNode = memo((props:NodeProps) => {
  const [open,setOpen] = useState(false)
  return (
  <NodeSelector open={open} onOpenChange={setOpen}>
      <WorkflowNode
    name='Initial'
    showToolbar
    description='This is initial point'
    >
      <PlaceholderNode{...props}
      onClick={()=>setOpen(!open)}
      >
    <div className='cursor-pointer flex items-center justify-center'>
        <PlusIcon className='size-4'/>
    </div></PlaceholderNode>
    </WorkflowNode>
  </NodeSelector>
  )
}
)
export default InitialNode