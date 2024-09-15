'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GigsDataTable } from "./_components/data-table"
import { Gig } from "@prisma/client"

export default function GigsPage() {
	const [gigs, setGigs] = useState<Gig[]>([])
	const router = useRouter()

	const fetchGigs = async () => {
		const response = await fetch('/api/gigs')
		const data = await response.json()
		setGigs(data)
	}

	useEffect(() => {
		fetchGigs()
	}, [router])

	return (
		<div className="p-6">
			<GigsDataTable data={gigs} />
		</div>
	)
}