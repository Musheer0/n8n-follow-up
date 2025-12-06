"use client"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signUp } from "@/lib/auth-client"
import { useState, useTransition } from "react"
import { cn } from "@/lib/utils"
import { LoaderCircleIcon } from "lucide-react"



export const registerSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters long"),
    name: z.string().min(2, "Name must be at least 2 characters long")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type registerSchemaType = z.infer<typeof registerSchema>;

const RegisterForm = () => {
    const [result,setResult] =useState<{error:boolean,msg:string}|null>(null)
      const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: { 
      email: "",
      password: "",
      confirmPassword: "",
      name: ""
    }
  })

  const[isPending,startTransition] = useTransition()
  const onSubmit = async(data: registerSchemaType) => {
    const {confirmPassword, ...rest} = data;
    setResult(null)
   startTransition(async()=>{
     await signUp.email({
        ...rest,
        callbackURL:'/dashboard',   
    },{
        onSuccess:()=>{
            setResult({error:false,msg:"Registration successful! Redirecting..."})
        },
        onError:(err)=>{
            setResult({error:true,msg:err.error.message||"Something went wrong"})
        }
    })
   });
  }

  return (
    <Form {...form}>
     
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Confirm Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
           {result &&
           <p className={cn(
            "text-sm mx-auto",
            result.error ? "text-red-500" : "text-green-500"
           )}>
            {result.msg}
        </p>
           }
        <Button
        disabled={isPending}
        type="submit" className="w-full">
            {isPending ? <LoaderCircleIcon className="animate-spin"/>:'Register'}
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm