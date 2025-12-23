"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog'
import React from 'react'

const ManualTriggerDialog = (
    {open,onOpenChange}:{open:boolean,onOpenChange:(open:boolean)=>void}
) => {
  return (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
        <DialogHeader>
            <DialogHeader>
                Mannual Trigger
            </DialogHeader>
            <DialogDescription>
                This is configurations for mannual trigger
            </DialogDescription>
        </DialogHeader>
    </DialogContent>
  </Dialog>
  )
}

export default ManualTriggerDialog