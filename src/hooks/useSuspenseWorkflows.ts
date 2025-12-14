import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { useWorkflowParams } from "./use-worflow-params";

export const useSuspenseWorkflows = ()=>{
    const trpc = useTRPC();
    const [params] = useWorkflowParams()
   return  useSuspenseQuery(trpc.workflow.getMany.queryOptions(params ) );
}