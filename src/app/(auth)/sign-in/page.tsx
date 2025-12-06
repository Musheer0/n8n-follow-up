import LoginForm from '@/components/auth/login/login-form'
import AuthForm from '@/components/auth/shared/auth-form'
import Link from 'next/link'
import React from 'react'

const page = async() => {


  return (
    <div className='w-full flex items-center justify-center h-fit'>
    <AuthForm
    title='Welcome back'
    description='Login to your account to continue'
    footer={
        <>
        <Link href={'/sign-up'} className='text-sm cursor-pointer'>
        Don&apos;t have an account? 
        <span className='text-primary font-semibold ml-1'>Sign up</span>
        </Link>
        </>
    }
    >
     <LoginForm/>
    </AuthForm>
    </div>
  )
}

export default page
