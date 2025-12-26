/* eslint-disable  */
"use client"

import { useSuspenseWorkflow } from '@/hooks/useSuspenseWorkflows'
import React from 'react'
import EditorHeader from './editor/editor-header';
import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, 
  type Node,
  type Edge,
  type NodeChange,
  EdgeChange,
  Connection,
  Background,
  Controls,
  MiniMap,
  Panel
 } from '@xyflow/react'
import { nodeComponents } from '@/config/node-components';
import AddNodeButoon from '../react-flow/add-node-button';
import { useSetAtom } from 'jotai';
import { editorAtom } from '@/features/editor/store/atom';
import ExecuteWorkflowButton from '../execute-workflow-btn';

const Editor = ({id}:{id:string}) => {
    const {data} = useSuspenseWorkflow(id);
      const [nodes, setNodes] = useState<Node[]>(data.nodes);
      const setEditor = useSetAtom(editorAtom)
      //@ts-ignore
  const [edges, setEdges] = useState<Edge[]>(data.edges);
   const onNodesChange = useCallback(
    (changes:NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes:EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params:Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
 
  if(data)
  return (
    <div className='flex-1  h-full flex flex-col gap-2'>
      <EditorHeader id={data.id} name={data.name}/>
        <ReactFlow
         nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        proOptions={{
          hideAttribution:true
        }}
        nodeTypes={nodeComponents}
        onInit={setEditor}
        snapGrid={[10, 10]}
        snapToGrid
        panOnScroll
       

        >
          <Background/>
          <Controls/>
          <MiniMap/>
          <Panel>
            <AddNodeButoon/>
          </Panel>
          {data.nodes.map((e)=>e.type==="manual").length>0 &&
          <Panel position='bottom-center'>
            <ExecuteWorkflowButton id={data.id}/>
          </Panel>
          }
        </ReactFlow>
    </div>
  )
}

export default Editor