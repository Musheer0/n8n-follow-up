import { NodeTypes } from '@xyflow/react'
import {NodeTypeDb, NodeTypeTs} from '../../drizzle/schema'
import InitialNode from '@/components/react-flow/initial-node'

export const nodeComponents = {
    [NodeTypeDb.enumValues[0]]: InitialNode
} as const satisfies NodeTypes