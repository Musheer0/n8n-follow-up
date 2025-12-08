"use client"
import React from 'react'
import { Button } from '../ui/button'
import { CreditCardIcon, StarIcon } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

const PotralBtn = () => {
  return (
    <Button
    variant={'secondary'}
    className='w-full'
    onClick={()=>authClient.customer.portal()}
    >
       <CreditCardIcon/>
       Billing Potral
    </Button>
  )
}

export default PotralBtn
