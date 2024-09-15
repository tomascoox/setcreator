'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import toast from 'react-hot-toast' // Add this import

export default function CreateGig() {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState<Date | null>(null)
    const [venue, setVenue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!date) {
            toast.error('Please select a date and time') // Add error toast for missing date
            return
        }
        setIsLoading(true)
        try {
            await axios.post('/api/gigs', { 
                title, 
                date: date.toISOString(), 
                venue 
            })
            toast.success('Gig created successfully') // Add success toast
            router.push('/gigs')
        } catch (error) {
            console.error('Error creating gig:', error)
            toast.error('Failed to create gig') // Add error toast
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="p-6">
            <Link
                href="/gigs"
                className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to gigs
            </Link>

            <h1 className="text-2xl font-bold mb-4">Create New Gig</h1>

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
                        className="w-full p-2 border rounded"
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
                    />
                </div>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Gig'}
                </Button>
            </form>
        </div>
    )
}
