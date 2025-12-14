import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import db from "@/lib/db";
import {generateSlug} from 'random-word-slugs'
import { workflow } from "../../../drizzle/schema";
import { and, desc, eq, ilike } from "drizzle-orm";
import { PAGINATION } from "@/config/constants";

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
    })
})