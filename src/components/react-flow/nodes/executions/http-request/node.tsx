"use client"

import BaseExecutionNode from "@/components/react-flow/base-exexution-node";
import { Node, NodeProps } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo, useState } from "react";
import HttpRequestDialog from "./dialog";
import { useNodeStatus } from "@/hooks/use-node-status";
import { fetchHttpRequestRealtimeToken } from "@/inngest/actions";
import { NodeStatus } from "@/components/node-status-indicator";

export type HttpRequestNodeProps = {
    variableName?:string
    endpoint?:string,
    method?:"GET"|"POST"|"PUT"|"DELETE"|"PATCH";
    body?:string;

}

type HttpRequestNodeType = Node<HttpRequestNodeProps>

export const HttpRequestNode = memo((props:NodeProps<HttpRequestNodeType>)=>{
     const [open ,setOpen] = useState(false)
    const nodeData = props.data as HttpRequestNodeProps;
    const desc = nodeData?.endpoint ;
    const status = useNodeStatus(
        {
            nodeId:props.id,
            channel:"http-request-execution",
            topic:"status",
            refreshToken:fetchHttpRequestRealtimeToken
        }
    )
    
    return (
     <>
     <HttpRequestDialog
      id={props.id}
      open={open}
      onOpenChange={setOpen}
      defaultBody={props.data.body}
      method={props.data.method}
      defaultEndpoint={props.data.endpoint}
      variableName={props.data.variableName}
     />
      <BaseExecutionNode
      {...props}
      id={props.id}
      icon={GlobeIcon}
      name="HTTP Request"
      descritpion={desc}
      onDoubleClick={()=>{setOpen(!open)}}
      onSettings={()=>{setOpen(!open)}}
      status={status as NodeStatus}
      />
     </>
    )
})