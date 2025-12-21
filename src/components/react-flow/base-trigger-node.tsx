"use client"

import { Handle, NodeProps, Position } from "@xyflow/react"
import { LucideIcon } from "lucide-react"

interface BaseTriggerNodeProps extends NodeProps {
    icon:LucideIcon|string,
    name?:string,
    descritpion?:string,
    status?:boolean,
    onSettings?:()=>void,
    onDoubleClick?:()=>void,
    children?:React.ReactNode
}


import React, { memo } from 'react'
import { WorkflowNode } from "./workflow-node"
import { BaseNode, BaseNodeContent } from "../base-node"

const BaseTriggerNode:React.FC<BaseTriggerNodeProps> = memo((
    {
        id,
        icon:Icon,
        name,
        descritpion,
        status,
        onDoubleClick,
        onSettings,
        children
    }
) => {
  return (
    <WorkflowNode
    name={name}
    description={descritpion}
    onDelete={()=>{}}
    onSettings={onSettings}
    >
   <BaseNode onDoubleClick={onDoubleClick}
   className="rounded-l-2xl relative group"
   >
   <BaseNodeContent>
   {typeof Icon ==="string"
   ? 
   <img src={Icon} className="w-10 h-10"/>
   :
   <Icon className="size-4 text-muted-foreground"/>
   }
   {children}

    <Handle
    id={"source-1"}
    type="source"
    position={Position.Right}
   /> 
   </BaseNodeContent>
   </BaseNode>
    </WorkflowNode>
  )
})

export default BaseTriggerNode