import toposort from 'toposort'
import { Connection,Node } from '../../drizzle/schema'
import { InferSelectModel } from 'drizzle-orm'

export const TopologicalSort = (nodes:InferSelectModel<typeof Node>[],connections:InferSelectModel<typeof Connection>[])=>{
    if(connections.length==0) return nodes;
    const edges:[string, string][] = connections.map((c)=>[c.fromNodeId,c.toNodeId]);
    const connectedNodeIds = new Set<string>();
    for(const c of connections){
        connectedNodeIds.add(c.fromNodeId);
         connectedNodeIds.add(c.toNodeId);
    }
    for (const node of nodes){
        if(!connectedNodeIds.has(node.id)){
            edges.push([node.id,node.id]);
        }
    }
    let sotedNodes:string[];
    try {
        sotedNodes = toposort(edges);
        sotedNodes = [...new Set(sotedNodes)];
    } catch (error) {
        if(error instanceof Error && error.message.includes("Cyclic")){
            throw new Error("workflow contains a cycle");
        }
        throw error;
    }
    const nodeMap = new Map(nodes.map((n)=>[n.id,n]));
    console.log({nodeMap,sotedNodes})
    return sotedNodes.map((e)=>nodeMap.get(e)!).filter(Boolean)
}