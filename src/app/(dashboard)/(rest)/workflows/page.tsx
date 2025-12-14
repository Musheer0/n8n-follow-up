import WorkflowHeader from '@/components/workflows/workflow-header';
import { WorkflowsList } from '@/components/workflows/workflows';
import { prefetchWorkflows } from '@/features/workflows/prefech';
import { useWorkflowParamsLoader } from '@/hooks/server/workflow-params-loader';
import { requireAuth } from '@/lib/auth'
import { workflowsParams } from '@/lib/params';
import { HydrateClient } from '@/trpc/server';
import { SearchParams } from 'nuqs';
import React, { Suspense } from 'react'
import {ErrorBoundary} from 'react-error-boundary'
const page = async({searchParams}:{searchParams:Promise<SearchParams>}) => {
   const params = await useWorkflowParamsLoader(searchParams)
 await requireAuth();
  prefetchWorkflows(params)
  return (
   <HydrateClient>
    <ErrorBoundary fallback={<p>Error lol</p>}>
       <Suspense fallback={<p>Suspense lol</p>}>
       <WorkflowHeader/>
       <WorkflowsList/>
       </Suspense>
    </ErrorBoundary>
   </HydrateClient>
  )
}

export default page
