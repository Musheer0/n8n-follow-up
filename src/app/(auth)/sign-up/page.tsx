import RegisterForm from '@/components/auth/register/register-form'
import AuthForm from '@/components/auth/shared/auth-form'
import Link from 'next/link'
import React from 'react'

const page = async() => {


  return (
    <div className='w-full flex items-center justify-center h-fit'>
    <AuthForm
    title='Lets get you started'
    description='Create an account to continue'
    footer={
        <>
        <Link href={'/sign-in'} className='text-sm cursor-pointer'>
        Already have an account? 
        <span className='text-primary font-semibold ml-1'>Sign In</span>
        </Link>
        </>
    }
    >
     <RegisterForm/>
    </AuthForm>
    </div>
  )
}

export default page
