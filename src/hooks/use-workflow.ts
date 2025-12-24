import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useUpdateWorkflow = ()=>{
    const queryClient = useQueryClient();
    const trpc = useTRPC();
    return useMutation(
        trpc.workflow.update.mutationOptions({
            onSuccess:(data)=>{
                toast.success("saved changes"),
                queryClient.invalidateQueries(
                    trpc.workflow.getMany.queryOptions({})
                );
                queryClient.invalidateQueries(
                    trpc.workflow.getOne.queryOptions({id:data.id})
                )
            },
            onError:()=>{
                toast.error("error saving changes")
            }
        },
       
),
        
    )
}