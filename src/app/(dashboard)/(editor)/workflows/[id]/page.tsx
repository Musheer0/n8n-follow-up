import Editor from '@/components/workflows/workflow-page';
import { prefetchWorkflow } from '@/features/workflows/prefech'
import { requireAuth } from '@/lib/auth';
import { HydrateClient } from '@/trpc/server';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import '@xyflow/react/dist/style.css';

const page = async({params}:{params:Promise<{id:string}>}) => {
  const {id} = await params;
  await requireAuth()
   prefetchWorkflow(id)
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<>Error</>}>
      <Suspense fallback={<>Loading</>}>
      <Editor id={id}/>
      </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
}

export default page
