import { InferSelectModel } from "drizzle-orm";
import { GetStepTools, Inngest } from "inngest";
import {Node} from '../../../drizzle/schema'
import { Realtime } from "@inngest/realtime";
export type WorkflowContext = Record<string,unknown>;
export type StepTools = GetStepTools<Inngest.Any>;
export interface NodeExexuteParams{
    node:InferSelectModel<typeof Node>,
    context:WorkflowContext,
    step:StepTools,
    publish:Realtime.PublishFn
}
export type NodeExecutor = (params:NodeExexuteParams)=>Promise<WorkflowContext>