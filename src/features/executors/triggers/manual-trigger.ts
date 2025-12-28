import { NodeExecutor } from "../types";

export const ManualTriggerExecutor:NodeExecutor  = async({
    context,
    node,
    step
})=>{
    const result = await step.run("mannual-trigger",async()=>context);
    return result
}