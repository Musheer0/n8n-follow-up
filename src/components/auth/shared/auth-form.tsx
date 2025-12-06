"use client"
interface AuthFormProps {
  children: React.ReactNode
  title:string
  description:string
  footer?:React.ReactNode
  className?:string
}
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import React from 'react'

const AuthForm = ({children,title,description,footer,className}:AuthFormProps) => {
  return (
    <Card
    className={cn(
        "w-full max-w-md  ",className
    )}
    >
     <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
     </CardHeader>
     <CardContent>{children}</CardContent>
     <CardFooter>{footer}</CardFooter>
    </Card>
  )
}

export default AuthForm
