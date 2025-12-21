"use client"
import React, { memo, useState } from 'react'
import { Button } from '../ui/button'
import { PlusIcon } from 'lucide-react'
import NodeSelector from '../workflows/editor/node-selector'

const AddNodeButoon = memo(() => {
  const [open ,setOpen] = useState(false);
  return (
  <NodeSelector open={open} onOpenChange={setOpen}>
      <Button
    size={"icon"}
    variant={"outline"}
    className='bg-background'
    >
        <PlusIcon/>
    </Button>
  </NodeSelector>
  )
})
AddNodeButoon.displayName="AddNodeButton"
export default AddNodeButoon