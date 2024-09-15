'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Band, BandMember } from '@prisma/client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from 'axios'
import toast from 'react-hot-toast'

interface MembersFormProps {
    initialData: Band & { members: BandMember[] }
    bandId: string
}

export const MembersForm = ({
    initialData,
    bandId
}: MembersFormProps) => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await axios.post(`/api/bands/${bandId}/members`, { email })
            toast.success('Member invited successfully')
            setEmail('')
            router.refresh()
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="mt-6">
            <h3 className="text-lg font-medium">Band Members</h3>
            <ul className="mt-2">
                {initialData.members.map((member) => (
                    <li key={member.id}>{member.userId} - {member.role}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Invite Member
                    </label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                        required
                    />
                </div>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Inviting...' : 'Invite Member'}
                </Button>
            </form>
        </div>
    )
}