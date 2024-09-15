'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast' // Add this import

export default function CreateSong() {
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await axios.post('/api/songs', { title, artist })
            toast.success('Song created successfully') // Add this line
            router.push('/songs')
        } catch (error) {
            console.error('Error creating song:', error)
            toast.error('Failed to create song') // Add this line
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="p-6">
            <Link
                href="/songs"
                className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to songs
            </Link>

            <h1 className="text-2xl font-bold mb-4">Create New Song</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Song Title
                    </label>
                    <Input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter song title"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="artist" className="block text-sm font-medium text-gray-700">
                        Artist
                    </label>
                    <Input
                        id="artist"
                        type="text"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        placeholder="Enter artist name"
                        required
                    />
                </div>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Song'}
                </Button>
            </form>
        </div>
    )
}
