import React, { memo } from 'react'
import {NodeProps} from '@xyflow/react'
import { PlaceholderNode } from './placeholder-node'
import { PlusIcon } from 'lucide-react'
import { WorkflowNode } from './workflow-node'
const InitialNode = memo((props:NodeProps) => {
  return (
    <WorkflowNode
    name='Initial'
    showToolbar
    description='This is initial point'
    >
      <PlaceholderNode{...props}
      onClick={()=>{}}
      >
    <div className='cursor-pointer flex items-center justify-center'>
        <PlusIcon className='size-4'/>
    </div></PlaceholderNode>
    </WorkflowNode>
  )
}
)
export default InitialNode