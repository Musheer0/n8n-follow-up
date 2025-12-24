"use client"

import BaseExecutionNode from "@/components/react-flow/base-exexution-node";
import BaseTriggerNode from "@/components/react-flow/base-trigger-node";
import { Node, NodeProps } from "@xyflow/react";
import { GlobeIcon, MouseIcon } from "lucide-react";
import { memo, useState } from "react";
import ManualTriggerDialog from "./dialog";

export const ManualTriggerNode = memo((props:NodeProps)=>{
    const [open ,setOpen] = useState(false)

    return (
     <>
     <ManualTriggerDialog open={open} onOpenChange={setOpen}/>
      <BaseTriggerNode
      {...props}
      id={props.id}
      icon={MouseIcon}
      name="Manual Trigger"
      descritpion={"When Clicking Execute Workflow"}
      onDoubleClick={()=>{setOpen(!open)}}
      onSettings={()=>{setOpen(!open)}}
      />
     </>
    )
})