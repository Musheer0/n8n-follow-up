"use client"
import { useTRPC } from '@/trpc/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import { Button } from '../ui/button'
import { Loader2Icon, PlusIcon } from 'lucide-react'
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import { useWorkflowParams } from '@/hooks/use-worflow-params'

const CreateWorkflowModal = ({children}:{children:React.ReactNode}) => {
    const trpc = useTRPC()
    const {mutate,isPending} = useMutation(trpc.workflow.create.mutationOptions());
    const [name,setName ] = useState('');
    const [error ,setError] = useState('');
    const router = useRouter();
    const queryClient = useQueryClient()
    const workflowsListQueryOptions = trpc.workflow.getMany.queryOptions({})
    const handleclick = async()=>{
        mutate({name},{
            onError:(err)=>{
             alert(err.message)
             setError(err.message)
           
            },
            onSuccess:(data)=>{
                toast.success(`Workflow ${data[0].name} created`)
                router.push('/workflows/'+data[0].id);
                  queryClient.invalidateQueries(workflowsListQueryOptions)
            }
        })
    }
  return (
   <AlertDialog>
    <AlertDialogTrigger asChild>
     {children}
    </AlertDialogTrigger>
    <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>
                Create new Workflow
            </AlertDialogTitle>
        </AlertDialogHeader>
        <Label>Enter workflow name</Label>
        <Input placeholder='workflow name' value={name} onChange={(e)=>setName(e.target.value)}/>
        {error && <p className='text-sm text-destructive'>{error}</p>}
        <AlertDialogFooter>
            <Button disabled={isPending} onClick={handleclick}>
                {isPending ? <Loader2Icon className='animate-spin'/>: 'Create'}
            </Button>
        </AlertDialogFooter>
    </AlertDialogContent>
   </AlertDialog>
  )
}

export default CreateWorkflowModal
