import { prefetch, trpc } from "@/trpc/server";
import { inferInput } from "@trpc/tanstack-react-query";

export type Input = inferInput<typeof trpc.workflow.getMany>
export const prefetchWorkflows = (params:Input)=>{
    return prefetch(trpc.workflow.getMany.queryOptions(params))
};