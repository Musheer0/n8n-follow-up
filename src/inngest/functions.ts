import { NonRetriableError } from "inngest";
import { inngest } from "./client";
import db from "@/lib/db";
import { TopologicalSort } from "./utils";
import { getExecutor } from "@/features/executors/executor-registry";
import { httpChannel } from "./channels";
export const executeWorflow = inngest.createFunction(
  {id:"execute-workflow",retries:0},
  {event:"workflows/execute",
    channels:[
      httpChannel()
    ]
  },
  async({event,step,publish})=>{
   const { workflowId, userId }= event.data;
if (!workflowId || !userId) {
  throw new NonRetriableError("Missing workflowId or userId");
}  

const [nodes, edges] = await step.run("prepare workflow", async () => {
  const nodes = await db.query.Node.findMany({
    where: (node, { eq, and }) =>
      and(
        eq(node.workflow_id, workflowId),
        eq(node.userId, userId)
      ),
  });

  const edges = await db.query.Connection.findMany({
    where: (connection, { eq, and }) =>
      and(
        eq(connection.workflow_id, workflowId),
        eq(connection.userId, userId)
      ),
  });

  return [nodes, edges] as const;
});
  const sortedNodes = TopologicalSort(nodes.map((e)=>({...e,updatedAt:new Date(e.updatedAt)})),edges.map((e)=>({...e,updatedAt:new Date(e.updatedAt)})));
  let context = event.data.initialData || {};
  for (const n of sortedNodes){
    const executor = getExecutor(n.type);
    context = await executor({
      node:n,
      context,
      step,
      publish
    })
  }
  return {context}
  }
)