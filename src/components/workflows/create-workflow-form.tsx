"use client"

import z from "zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
export const createWorkflowSchema = z.object({
    name: z.string().min(1).max(255),
})
export type CreateWorkflowInput = z.infer<typeof createWorkflowSchema>
import React, { useTransition } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useTRPC } from "@/trpc/client"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const CreateWorkflowForm = () => {
    const form = useForm<CreateWorkflowInput>({
        resolver:zodResolver(createWorkflowSchema),
        defaultValues:{
            name:""
        }
    });
   const trpc = useTRPC()
   const {mutate, isPending} = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess:()=>{
        console.log("Workflow created successfully")
    },
    onError:(error)=>{
        console.error("Error creating workflow:",error)
    }
   }))
  return (
    <Form
    {...form}
    >
      <form onSubmit={form.handleSubmit((data)=>mutate({name:data.name}))}>
        <FormField
        name="name"
        control={form.control}
        render={({field})=>(
            <FormItem>
                <FormLabel>Workflow Name</FormLabel>
                <FormControl>
                    <Input placeholder="Enter workflow name" {...field} />
                </FormControl>
                    <FormMessage/>
            </FormItem>
        )}
        />
        <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Workflow"}
        </Button>
      </form>
    </Form>
  )
}

export default CreateWorkflowForm
