"use client"

import BaseExecutionNode from "@/components/react-flow/base-exexution-node";
import { Node, NodeProps } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo } from "react";

type HttpRequestNodeProps = {
    endpoint?:string,
    method?:"GET"|"POST"|"PUT"|"DELETE";
    body?:string|Record<string,unknown>;

}

type HttpRequestNodeType = Node<HttpRequestNodeProps>

export const HttpRequestNode = memo((props:NodeProps<HttpRequestNodeType>)=>{
    
    const nodeData = props.data as HttpRequestNodeProps;
    const desc = nodeData?.endpoint 
    ? `${nodeData?.method}| ${nodeData.endpoint}`:"Not Configured"
    return (
      <BaseExecutionNode
      {...props}
      id={props.id}
      icon={GlobeIcon}
      name="HTTP Request"
      descritpion={desc}
      onDoubleClick={()=>{}}
      onSettings={()=>{}}
      />
    )
})