"use client"

import * as React from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useReactFlow } from "@xyflow/react"
import { toast } from "sonner"
import { TRPCError } from "@trpc/server"
import { useUpdateNodeData } from "@/hooks/use-node"

// --------------------
// Schema (truth source)
// --------------------
const formSchema = z.object({
  endpoint: z.string().url("Enter a valid URL"),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  body: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

const HttpRequestDialog = ({
  open,
  onOpenChange,
  defaultEndpoint = "",
  defaultBody = "",
  method = "GET",
  id
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultEndpoint?: string
  defaultBody?: string
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  id:string
}) => {
  const {getNodes,setNodes} = useReactFlow();
  const updateNode = useUpdateNodeData()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      endpoint: defaultEndpoint,
      body: defaultBody,
      method,
    },
  })

  const selectedMethod = form.watch("method")

  async function onSubmit(values: FormValues) {

    try {
          if(!id) {
      return
    }
 setNodes((nodes)=>{
  return nodes.map((node)=>{
    if(node.id===id){
      return {
        ...node,
        data:values
      }
    }
    return node
  })
 })
  updateNode.mutate({id,data:values})

    } catch (error) {
      toast.error("something went wrong try again")
    }
    finally{
onOpenChange(false)
    }
    
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>HTTP Request</DialogTitle>
          <DialogDescription>
            Configure your HTTP node request
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
          
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Endpoint */}
            <FormField
              control={form.control}
              name="endpoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endpoint URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://api.example.com/users"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Method */}
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HTTP Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["GET", "POST", "PUT", "PATCH", "DELETE"].map(
                        (m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Body (only when needed) */}
            {selectedMethod !== "GET" && (
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Request Body (JSON)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='{"name":"John"}'
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button
              disabled={updateNode.isPending}
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button disabled={updateNode.isPending} type="submit">
                {updateNode.isPending ? "Saving":"Save"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default HttpRequestDialog
