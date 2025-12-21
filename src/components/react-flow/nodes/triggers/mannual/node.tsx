"use client"

import BaseExecutionNode from "@/components/react-flow/base-exexution-node";
import BaseTriggerNode from "@/components/react-flow/base-trigger-node";
import { Node, NodeProps } from "@xyflow/react";
import { GlobeIcon, MouseIcon } from "lucide-react";
import { memo } from "react";

export const ManualTriggerNode = memo((props:NodeProps)=>{
    

    return (
      <BaseTriggerNode
      {...props}
      id={props.id}
      icon={MouseIcon}
      name="Manual Trigger"
      descritpion={"When Clicking Execute Workflow"}
      onDoubleClick={()=>{}}
      onSettings={()=>{}}
      />
    )
})