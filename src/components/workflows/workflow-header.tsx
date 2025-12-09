import React from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import { Button } from '../ui/button'
import { PlusIcon } from 'lucide-react'
import CreateWorkflowModal from './create-workflow-modal'

const WorkflowHeader = ()=> {

  return (
   <div className='w-full border-b py-5 px-3 flex items-center justify-between gap-2 '>
    <SidebarTrigger/>
    <p className='text-xl font-semibold mr-auto'>Workflows</p>
  <CreateWorkflowModal>
      <Button><PlusIcon/> <span className='hidden sm:flex'>
        Create Workflow
        </span></Button>
  </CreateWorkflowModal>

   </div>
  )
}

export default WorkflowHeader
