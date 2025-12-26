"use client"
import React from 'react'
import { Button } from './ui/button'
import { FlaskRoundIcon } from 'lucide-react'
import { useExecuteWorkflow } from '@/hooks/use-workflow'

const ExecuteWorkflowButton = ({id}:{id:string}) => {
  const {mutate,isPending} = useExecuteWorkflow()
  return (
    <Button disabled={isPending} onClick={()=>mutate({id})}>
        <FlaskRoundIcon/>
        Execute
    </Button>
  )
}

export default ExecuteWorkflowButton
