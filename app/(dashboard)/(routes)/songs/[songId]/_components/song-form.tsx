'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Song } from '@prisma/client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from 'axios'
import toast from 'react-hot-toast'

interface SongFormProps {
    initialData: Song
    songId: string
}

export const SongForm = ({
    initialData,
    songId
}: SongFormProps) => {
    const [title, setTitle] = useState(initialData.title)
    const [artist, setArtist] = useState(initialData.artist)
    const [duration, setDuration] = useState(initialData.duration ? formatDuration(initialData.duration) : '')
    const [lyrics, setLyrics] = useState(initialData.lyrics || '')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const durationInSeconds = parseDuration(duration)
            await axios.patch(`/api/songs/${songId}`, { title, artist, duration: durationInSeconds, lyrics })
            toast.success('Song updated successfully')
            router.push('/songs') // Navigate back to the song list
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(e.target.value)
    }

    return (
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
                    className="text-base"
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
                    className="text-base"
                />
            </div>
            <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                    Duration
                </label>
                <Input
                    id="duration"
                    type="text"
                    value={duration}
                    onChange={handleDurationChange}
                    placeholder="Enter duration in the form of min:sec"
                    className="text-base"
                />
            </div>
            <div>
                <label htmlFor="lyrics" className="block text-sm font-medium text-gray-700">
                    Lyrics
                </label>
                <Input
                    id="lyrics"
                    type="text"
                    value={lyrics}
                    onChange={(e) => setLyrics(e.target.value)}
                    placeholder="Enter lyrics"
                    className="text-base"
                />
            </div>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save changes'}
            </Button>
        </form>
    )
}

function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

function parseDuration(input: string): number | null {
    // Remove any non-numeric characters except for : and .
    const cleanedInput = input.replace(/[^\d:.]/g, '')

    if (cleanedInput.includes(':')) {
        const [minutes, seconds] = cleanedInput.split(':').map(Number)
        return minutes * 60 + seconds
    } else if (cleanedInput.includes('.')) {
        const [minutes, seconds] = cleanedInput.split('.').map(Number)
        return minutes * 60 + seconds
    } else {
        const totalSeconds = parseFloat(cleanedInput)
        if (!isNaN(totalSeconds)) {
            return Math.round(totalSeconds * 60)
        }
    }

    return null
}