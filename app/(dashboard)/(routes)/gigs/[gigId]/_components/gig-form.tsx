'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Gig } from '@prisma/client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'
import toast from 'react-hot-toast'

interface GigFormProps {
    initialData: Gig
    gigId: string
}

export const GigForm = ({
    initialData,
    gigId
}: GigFormProps) => {
    const [title, setTitle] = useState(initialData.title)
    const [date, setDate] = useState<Date | null>(new Date(initialData.date))
    const [venue, setVenue] = useState(initialData.venue)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!date) {
            toast.error('Please select a date and time')
            return
        }
        setIsLoading(true)
        try {
            await axios.patch(`/api/gigs/${gigId}`, { title, date: date.toISOString(), venue })
            toast.success('Gig updated successfully')
            router.push('/gigs') // Navigate back to the gig list
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Gig Title
                </label>
                <Input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter gig title"
                    required
                    className="text-base" // Ensure font size is at least 16px
                />
            </div>
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date and Time
                </label>
                <DatePicker
                    selected={date}
                    onChange={(date: Date | null) => setDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="w-full p-2 border rounded text-base" // Ensure font size is at least 16px
                    required
                />
            </div>
            <div>
                <label htmlFor="venue" className="block text-sm font-medium text-gray-700">
                    Venue
                </label>
                <Input
                    id="venue"
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="Enter venue"
                    required
                    className="text-base" // Ensure font size is at least 16px
                />
            </div>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save changes'}
            </Button>
        </form>
    )
}