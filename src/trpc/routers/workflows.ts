import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import db from "@/lib/db";
import {generateSlug} from 'random-word-slugs'
import { workflow } from "../../../drizzle/schema";
import { and, eq } from "drizzle-orm";

export const workflowRouter = createTRPCRouter({
    create: protectedProcedure.input(
        z.object({
            name:z.optional(z.string().max(255))
        })
    ).mutation(async({ctx,input})=>{
        const new_workflow = await db.insert(workflow).values({
            name: input.name || generateSlug(3),
            userId:ctx.auth.user.id,
        })
        .returning();
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
        return await db.query.workflow.findFirst({
            where:and(
  eq(workflow.id,input.id),
            eq(workflow.userId,ctx.auth.user.id)
            )
        })
    }),
    gentMany :protectedProcedure.query(async({ctx})=>{
        return await db.query.workflow.findMany({
            where:eq(
                workflow.userId, ctx.auth.user.id
            )
        });
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
        eq(workflow.userId,ctx.auth.user.id)
        )).returning()
        return updated_workflow
       } catch (error) {
         throw new Error("error changing name ")
       }
    })
})