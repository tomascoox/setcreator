'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Band } from '@prisma/client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from 'axios'
import toast from 'react-hot-toast'

interface BandFormProps {
    initialData: Band
    bandId: string
}

export const BandForm = ({
    initialData,
    bandId
}: BandFormProps) => {
    const [name, setName] = useState(initialData.name)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await axios.patch(`/api/bands/${bandId}`, { name })
            toast.success('Band updated successfully')
            router.refresh()
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Band Name
                </label>
                <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter band name"
                    required
                />
            </div>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save changes'}
            </Button>
        </form>
    )
}