"use client"
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'

const LogoutButton = ({children}:{children:React.ReactNode}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogout = async () => {
        setIsLoading(true)
        setError(null)
        try {
            await authClient.signOut()
            window.location.reload()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Logout failed')
            setIsLoading(false)
        }
    }

    return (
        <>
            <Button
            variant={"ghost"}
            asChild
                className='w-full'
                onClick={handleLogout}
                disabled={isLoading}
            >
                {isLoading ? 'Logging out...' : children}
            </Button>
            {error && <p className='text-sm text-red-500 mt-2'>{error}</p>}
        </>
    )
}

export default LogoutButton
