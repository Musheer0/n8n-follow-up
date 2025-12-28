import { NodeTypeTs } from "../../../drizzle/schema";
import { HttpExecutor } from "./executors/http-executor";
import { ManualTriggerExecutor } from "./triggers/manual-trigger";
import { NodeExecutor } from "./types";

export const executors:Record<string&NodeTypeTs,NodeExecutor> = {
    "manual":ManualTriggerExecutor,
    "http":HttpExecutor,
    "initial":ManualTriggerExecutor
}


export const getExecutor = (type:NodeTypeTs)=>{
    const executor = executors[type];
    if(!executor) throw new Error("No executor found for node type "+type);    return executor
}