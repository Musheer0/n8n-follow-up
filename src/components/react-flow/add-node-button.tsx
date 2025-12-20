"use client"
import React, { memo } from 'react'
import { Button } from '../ui/button'
import { PlusIcon } from 'lucide-react'

const AddNodeButoon = memo(() => {
  return (
    <Button
    size={"icon"}
    variant={"outline"}
    className='bg-background'
    >
        <PlusIcon/>
    </Button>
  )
})
AddNodeButoon.displayName="AddNodeButton"
export default AddNodeButoon