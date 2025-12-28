import { NodeExecutor } from "../types";

export const ManualTriggerExecutor:NodeExecutor  = async({
    context,
    node,
    step
})=>{
    const result = await step.run("manual-trigger",async()=>context);
    return result
}