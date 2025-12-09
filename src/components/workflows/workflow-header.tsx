"use client"
import { useTRPC } from '@/trpc/client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import { Button } from '../ui/button'
import { PlusIcon } from 'lucide-react'
import CreateWorkflowModal from './create-workflow-modal'

const WorkflowHeader = () => {
    const trpc = useTRPC()
    const {mutate,isPending} = useMutation(trpc.workflow.create.mutationOptions());
    const [name,setName ] = useState('');
    const [error ,setError] = useState('');
    const router = useRouter()
    const handleclick = async()=>{
        mutate({name},{
            onError:(err)=>{
             alert(err.message)
            },
            onSuccess:(data)=>{
                console.log(data);
                router.push('/workflows/'+data[0].id)
            }
        })
    }
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
