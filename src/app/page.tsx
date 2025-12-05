import { caller } from '@/trpc/server'
import React from 'react'

const page = async() => {
  const d =  await caller.hello({text: 'from server component'})


  return (
    <div>
       {JSON.stringify(d)}      
    </div>
  )
}

export default page
