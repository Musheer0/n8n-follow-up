import { NodeTypes } from '@xyflow/react'
import {NodeTypeDb, NodeTypeTs} from '../../drizzle/schema'
import InitialNode from '@/components/react-flow/initial-node'
import { HttpRequestNode } from '@/components/react-flow/nodes/executions/http-request/node'
import { ManualTriggerNode } from '@/components/react-flow/nodes/triggers/mannual/node'

export const nodeComponents = {
    [NodeTypeDb.enumValues[0]]: InitialNode,
    [NodeTypeDb.enumValues[1]]:ManualTriggerNode,
    [NodeTypeDb.enumValues[2]]:HttpRequestNode,

} as const satisfies NodeTypes