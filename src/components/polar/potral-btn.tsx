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
      <p className=' group-data-[collapsible=icon]:hidden'> Billing Potral</p>
    </Button>
  )
}

export default PotralBtn
