'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SongsDataTable } from "./_components/data-table"
import { Song } from "@prisma/client"

export default function SongsPage() {
	const [songs, setSongs] = useState<Song[]>([])
	const router = useRouter()

	const fetchSongs = async () => {
		const response = await fetch('/api/songs')
		const data = await response.json()
		setSongs(data)
	}

	useEffect(() => {
		fetchSongs()
	}, [router])

	return (
		<div className="p-6">
			<SongsDataTable data={songs} />
		</div>
	)
}
