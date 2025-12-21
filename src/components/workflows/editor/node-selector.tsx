"use client"
import React, { useCallback } from 'react'
import {createId} from '@paralleldrive/cuid2'
import {NodeTypes, useReactFlow} from '@xyflow/react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { NodeTypeDb, NodeTypeTs } from '../../../../drizzle/schema'
import { GlobeIcon, MousePointer2Icon } from 'lucide-react'
import { toast } from 'sonner'

interface NodeSelectorProps {
    children:React.ReactNode;
    open:boolean;
    onOpenChange:(open:boolean)=>void
}
export type NodeTypeOptions ={
    type:NodeTypeTs,
     lable:string,
     description:string,
     icon:React.ComponentType<{className?:string}> |string
}
const triggerNodes:NodeTypeOptions[] = [
    {
        type:"manual",
        lable:'Trigger Manually',
        description:"Runs flow by clicking the button,Good for getting started quicly",
        icon:MousePointer2Icon
    }
]
const executionNodes:NodeTypeOptions[] = [
    {
        type:"http",
        lable:'HTTP Request',
        description:"Make an HTTP request",
        icon:GlobeIcon
    }
]

const nodes = [
    {
        name:'Trigger Nodes',
        nodes:triggerNodes
    },
    {
        name:'Execution Nodes',
        nodes:executionNodes
    },
]
const NodeSelector:React.FC<NodeSelectorProps> = ({children,open,onOpenChange}) => {
    const {setNodes,getNodes,screenToFlowPosition} = useReactFlow()
    const handleNodeSelect = useCallback((nodeType:NodeTypeOptions)=>{
         setNodes((n)=>{
               const nodes = getNodes()
        if(nodeType.type==="manual"){
            const hansManualTriggle = nodes.some((n)=>n.type==="manual")
            if(hansManualTriggle){
                toast.error("only one manual trigger is allowed");
                return nodes;
            }   
        }
        const hasInitialNode = nodes.some(n=>(n.type as NodeTypeTs)==="initial")
        if(hasInitialNode){
           const cx = window.innerWidth/2;
           const cy = window.innerHeight/2;
           const flowPosition = screenToFlowPosition({
            x:cx+(Math.random()-0.5)*200,
            y:cy+(Math.random()-0.5)*200,
           });
           const newNode = {
            id:createId(),
            data:{},
            position:flowPosition,
            type:nodeType.type
           };
                   onOpenChange(false)

           return [newNode]
        }else{
               const cx = window.innerWidth/2;
           const cy = window.innerHeight/2;
           const flowPosition = screenToFlowPosition({
            x:cx+(Math.random()-0.5)*200,
            y:cy+(Math.random()-0.5)*200,
           });
           const newNode = {
            id:createId(),
            data:{},
            position:flowPosition,
            type:nodeType.type
           };
        onOpenChange(false)

           return [...nodes,newNode]
        }
         })


    },[setNodes,getNodes,screenToFlowPosition, onOpenChange])
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent side='right'>
            <SheetHeader>
                <SheetTitle>
                     What Triggers the workflow 
                </SheetTitle>
                <SheetDescription>
                    A trigger is a step that starts your workflow
                </SheetDescription>
            </SheetHeader>
            <div className=''>
              {nodes.map((n,i)=>{
                return(
                    <React.Fragment key={i}>
                        <div className='flex flex-col w-full py-2'>
                            <p className='text-sm px-4 text-muted-foreground py-2.5'>
                                {n.name}
                            </p>

                              {n.nodes.map((n,i)=>{
                    return (
                        <div key={i}
                        onClick={()=>handleNodeSelect(n)}
                        className='flex items-center gap-3 px-3 w-full py-3 border-b cursor-pointer'
                        >
                           {typeof n.icon==='string' ? <img src={n.icon} className='w-10 h-10'/>: <n.icon />}
                            <div className="info flex flex-col ">

                            <p className='font-semibold '>{n.lable}</p>
                            <p className='text-muted-foreground text-sm'>{n.description}</p>
                            </div>
                        </div> 
                    )
                })}
                        </div>
                    </React.Fragment>
                )
              })}
            </div>
        </SheetContent>
    </Sheet>
  )
}

export default NodeSelector