import WorkflowHeader from '@/components/workflows/workflow-header';
import { WorkflowsList } from '@/components/workflows/workflows';
import { prefetchWorkflows } from '@/features/workflows/prefech';
import { requireAuth } from '@/lib/auth'
import { HydrateClient } from '@/trpc/server';
import React, { Suspense } from 'react'
import {ErrorBoundary} from 'react-error-boundary'
const page = async() => {
 await requireAuth();
  prefetchWorkflows()
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
