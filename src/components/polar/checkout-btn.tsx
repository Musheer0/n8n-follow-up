"use client"
import React from 'react'
import { Button } from '../ui/button'
import { Loader2, StarIcon } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { useHasActiveSubscription } from '@/hooks/use-subscription'

const CheckoutBtn = () => {
    const {subscribed, isLoading} = useHasActiveSubscription()
if(!subscribed)
  return (
    <Button
    disabled={isLoading}
    className='w-full'
    onClick={()=>authClient.checkout({slug:'n88n-pro'})}
    >
      {
        isLoading ?
        <Loader2 className='animate-spin'/>
        :
        <>
          <StarIcon/>
      <p className=' group-data-[collapsible=icon]:hidden'>

          Upgrade To pro
      </p>
        </>
      }
    </Button>
  )
}

export default CheckoutBtn
