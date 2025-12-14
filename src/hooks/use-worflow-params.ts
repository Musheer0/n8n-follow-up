import { workflowsParams } from '@/lib/params'
import {useQueryStates} from 'nuqs'
export const useWorkflowParams = ()=>{
    return useQueryStates(workflowsParams)
}