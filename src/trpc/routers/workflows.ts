import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import db from "@/lib/db";
import {generateSlug} from 'random-word-slugs'
import { Connection, Node, NodeTypeDb, NodeTypeTs, workflow} from "../../../drizzle/schema";
import { and, desc, eq, ilike, sql } from "drizzle-orm";
import { PAGINATION } from "@/config/constants";
import { TRPCError } from "@trpc/server";
import {Node as RNode,type Edge} from '@xyflow/react'
export const workflowRouter = createTRPCRouter({
    create: protectedProcedure.input(
        z.object({
            name:z.optional(z.string().max(255))
        })
    ).mutation(async({ctx,input})=>{
        const new_workflow = await db.transaction(async (tx) => {
  const newWorkflow = await tx
    .insert(workflow)
    .values({
      name: input.name || generateSlug(3),
      userId: ctx.auth.user.id,
    })
    .returning();

  return newWorkflow
});

        return new_workflow
    }),
    remove: protectedProcedure.input(
        z.object({
            id:z.uuid()
        })
    ).mutation(async({ctx,input})=>{
        try {
            await db.delete(workflow).where(and(
            eq(workflow.id,input.id),
            eq(workflow.userId,ctx.auth.user.id)
        ));
        return input.id
        } catch (error) {
            console.error(error);
            return null;;
        }
    }),

    getOne:protectedProcedure.input(
        z.object({
            id:z.uuid()
        })
    ).query(async({ctx,input})=>{
        const w =  await db.query.workflow.findFirst({
            where:and(
  eq(workflow.id,input.id),
            eq(workflow.userId,ctx.auth.user.id)
            )
        });
        if(!w) throw new TRPCError({
            code:"NOT_FOUND",
            message:"workflow not found"
        })
        const nodes = await db.query.Node.findMany({
            where:eq(Node.workflow_id,w.id)
        });
        const conections = await db.query.Connection.findMany({
            where:eq(Node.workflow_id,w.id)
        });
        const formated_nodes:RNode[] = nodes.map((n)=>{
            return {
                id:n.id,
                type:n.type,
                position:( n.position || {x:50, y:100}) as {x:number,y:number},
                data:(n.data as Record<string, unknown>) ||{}
            }
        });
        const formated_edges:Edge[] = conections.map((c)=>{
            return {
                id:c.id,
                source:c.fromNodeId,
                target:c.toNodeId,
                sourceHandle:c.from_output,
                targetHandle:c.to_output
            }
        });
        return {
            ...w,
            nodes:formated_nodes,
            edges:formated_edges
        }
    }),
    getMany :protectedProcedure
    .input(
        z.object({
            page:z.number().default(PAGINATION.DEFAULT_PAGE),
            pageSize:z.number().min(PAGINATION.DEFAULT_PAGE_SIZE).max(PAGINATION.MAX_PAGE_SIZE).default(PAGINATION.DEFAULT_PAGE_SIZE),
            search:z.string().default("")
        })
    )
    .query(async({ctx,input})=>{
        const {page,pageSize,search} = input
        const [items,count] = await Promise.all([
           search.length>0 ?  db.query.workflow.findMany({
                where:and(
                    eq(workflow.userId,ctx.auth.user.id),
                    ilike(workflow.name, `%${search}%`)
                ),
                offset: (page-1) * pageSize,
                orderBy: desc(workflow.updatedAt)
            }):
             db.query.workflow.findMany({
                where:and(
                    eq(workflow.userId,ctx.auth.user.id),
                ),
                offset: (page-1) * pageSize,
                orderBy: desc(workflow.updatedAt)
            })
            ,
         db.$count(workflow,search.length>0 ? and(
 eq(workflow.userId,ctx.auth.user.id),ilike(workflow.name, `%${search}%`)):and(
         eq(workflow.userId,ctx.auth.user.id)
         ))
        ]);
        const totalPages = Math.ceil(count/pageSize);
        const hasNextPage = page<totalPages;
        const hasPrevPage = page>1;
        return {
            items,
            count,
            totalPages,
            hasNextPage,
            hasPrevPage
        }
    }),
    updateName:protectedProcedure.input(
        z.object({
            name:z.string(),
            id:z.uuid()
        })
    ).mutation(async({ctx,input})=>{
       try {
       const updated_workflow =  await db.update(workflow).set({
            name:input.name
        }).where(and(
        eq(workflow.id,input.id),
        eq(workflow.userId,ctx.auth.user.id),
        )).returning()
        return updated_workflow
       } catch (error) {
         throw new Error("error changing name ")
       }
    }),
    update:protectedProcedure.input(
        z.object(
            {
                id:z.string(),
                nodes:z.array(
                    z.object({
                        id:z.string(),
                        type:z.string().nullish(),
                        position:z.object({x:z.number(),y:z.number()}),
                        data:z.record(z.string(),z.any().optional())
                    })
                ),
                edges:z.array(
                    z.object({
                        source:z.string(),
                        target:z.string(),
                        sourceHandle:z.string().nullish(),
                        targetHandle:z.string().nullish()
                    })
                )

            }
        )
    )
    .mutation(async({ctx,input})=>{
        const {id,nodes,edges } = input;
        const w = await db.query.workflow.findFirst({
            where:and(
                eq(workflow.id,id),
                eq(workflow.userId,ctx.auth.user.id)
            )
        });
        if(!w) throw new TRPCError({
            code:"NOT_FOUND",
            message:"workflow not found"
        });
        console.log(input)
     const insertedNodes = [];

  for (const node of nodes) {
    try {
      const [r] = await db.insert(Node).values({
        id: node.id,
        workflow_id: id,
        name: node.type || "unknown",
        type: (node.type || "manual") as NodeTypeTs,
        position: node.position,
        data: node.data ?? {},
        userId:ctx.auth.user.id
      }).returning();

      insertedNodes.push(r);
    } catch {
     await db.update(Node).set({
        name: node.type || "unknown",
        type: (node.type || "manual") as NodeTypeTs,
        position: node.position,
        data: node.data ?? {},
      })
      .where(eq(Node.id, node.id))
  
    }
  }

  const insertedEdges = [];

  for (const edge of edges) {
    try {
      const [r] = await db.insert(Connection).values({
        workflow_id: id,
        fromNodeId: edge.source,
        toNodeId: edge.target,
        from_output: edge.sourceHandle || "main",
        to_output: edge.targetHandle || "main",
          userId:ctx.auth.user.id
      }).returning();

      insertedEdges.push(r);
    } catch {
      await db.update(Connection).set({
        from_output: edge.sourceHandle || "main",
        to_output: edge.targetHandle || "main",
      })
      .where(
        and(
          eq(Connection.workflow_id, id),
          eq(Connection.fromNodeId, edge.source),
          eq(Connection.toNodeId, edge.target)
        )
      )
   

    }
  }

  const updatedAt = new Date();

  await db.update(workflow)
    .set({ updatedAt })
    .where(eq(workflow.id, id));

  return {
    ...w,
    updatedAt,
    nodes: insertedNodes,
    edges: insertedEdges,
  };
    }),
    updateNodeData:protectedProcedure.input(
        z.object(
            {
                data:z.record(z.string(),z.any().optional()),
                id:z.string()
            }
        )
    )
    .mutation(async({ctx,input})=>{
        await db.update(Node).set({
            data:input.data
        }).where(and(
          eq(Node.userId,ctx.auth.user.id),
          eq(Node.id,input.id)
        ))
    })
})