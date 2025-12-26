import { NonRetriableError } from "inngest";
import { inngest } from "./client";
import db from "@/lib/db";

export const executeWorflow = inngest.createFunction(
  {id:"execute-workflow"},
  {event:"workflows/execute"},
  async({event,step})=>{
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

  console.log("nodes:", nodes);
  console.log("edges:", edges);

  return [nodes, edges];
});

  return {nodes,edges}
  }
)