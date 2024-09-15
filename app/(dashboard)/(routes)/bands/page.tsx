'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { BandsDataTable } from './_components/data-table'
import { Band } from '@prisma/client'
import { Button } from '@/components/ui/button'

export default function BandsPage() {
    const [bands, setBands] = useState<Band[]>([])
    const [invitations, setInvitations] = useState<
        { id: string; bandName: string }[]
    >([])
    const router = useRouter()

    useEffect(() => {
        fetchBands()
        fetchInvitations()
    }, [])

    const fetchBands = async () => {
        try {
            const response = await axios.get('/api/bands')
            setBands(response.data)
        } catch (error) {
            console.error('Error fetching bands:', error)
        }
    }

    const fetchInvitations = async () => {
        // TODO: Implement API call to fetch user's band invitations
    }

    const handleAccept = async (invitationId: string) => {
        try {
            await axios.post(
                `/api/invitations/${invitationId}/accept`
            )
            // Update invitations state after accepting
            setInvitations(
                invitations.filter(
                    (inv: { id: string }) => inv.id !== invitationId
                )
            )
        } catch (error) {
            console.error('Error accepting invitation:', error)
        }
    }

    const handleReject = async (invitationId: string) => {
        try {
            await axios.post(
                `/api/invitations/${invitationId}/reject`
            )
            // Update invitations state after rejecting
            setInvitations(
                invitations.filter(inv => inv.id !== invitationId)
            )
        } catch (error) {
            console.error('Error rejecting invitation:', error)
        }
    }

    return (
        <div className="p-6">
            <BandsDataTable data={bands} />

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">
                    Invitations
                </h2>
                {invitations.length === 0 ? (
                    <p>You have no pending invitations.</p>
                ) : (
                    <ul>
                        {invitations.map((invitation: any) => (
                            <li key={invitation.id}>
                                {invitation.bandName} -
                                <Button
                                    onClick={() =>
                                        handleAccept(invitation.id)
                                    }
                                    className="mr-2"
                                >
                                    Accept
                                </Button>
                                <Button
                                    onClick={() =>
                                        handleReject(invitation.id)
                                    }
                                    variant="destructive"
                                >
                                    Reject
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
