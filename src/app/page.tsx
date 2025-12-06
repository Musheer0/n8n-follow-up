import LoginForm from '@/components/auth/login/login-form'
import RegisterForm from '@/components/auth/register/register-form'
import AuthForm from '@/components/auth/shared/auth-form'
import { caller } from '@/trpc/server'
import React from 'react'

const page = async() => {
  const d =  await caller.hello({text: 'from server component'})


  return (
    <div>
       {JSON.stringify(d)}      
    <AuthForm
    title='Login'
    description='login with your account to continue'
    >

     <RegisterForm/>
    </AuthForm>
    </div>
  )
}

export default page
