import { workflowsParams } from "@/lib/params";
import { createLoader } from "nuqs/server";

export const useWorkflowParamsLoader = createLoader(workflowsParams)