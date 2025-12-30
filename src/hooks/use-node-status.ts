import { NodeStatus } from "@/components/node-status-indicator";
import { Realtime } from "@inngest/realtime";
import { useEffect, useState } from "react";
import { useInngestSubscription } from "@inngest/realtime/hooks";

interface useNodeStatusOptions{
    nodeId:string,
    channel:string,
    topic:string,
    refreshToken:()=>Promise<Realtime.Subscribe.Token>
}

export const useNodeStatus = ({refreshToken,nodeId,channel,topic}:useNodeStatusOptions)=>{
    const [status , setStatus] = useState<NodeStatus>("initial")
    const {data} = useInngestSubscription({
        refreshToken,
        enabled:true
    });
    useEffect(()=>{
        if(!data.length) return ;
       const nodeStatus = data.map((d)=>{
        if(d.channel===channel&&d.topic===topic){
            console.log(d.data)
            if(d.data?.nodeId===nodeId) setStatus(d.data.status)
        }
       })
    },[data,nodeId,channel,topic]);
 
    return status;
}