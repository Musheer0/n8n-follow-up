import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import db from '@/lib/db';
import { workflow } from '../../../drizzle/schema';
import {  desc } from 'drizzle-orm';
import { workflowRouter } from './workflows';
export const appRouter = createTRPCRouter({
  createWorkflow: protectedProcedure.input(
    z.object({
      name: z.string().min(1).max(255),
    })).mutation(async({ctx,input})=>{
      const newWorkflow = await db.insert(workflow).values({
        name: input.name,
        userId:ctx.auth.user.id
      })
      .returning();
      return newWorkflow[0];
    }),
    workflow:workflowRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;