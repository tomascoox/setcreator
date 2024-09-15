'use client'

import { DataTable } from "@/components/DataTable"
import { columns } from "./columns"
import { Song } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

interface SongsDataTableProps {
    data: (Song & { isCollaborative: boolean })[]
}

export function SongsDataTable({ data }: SongsDataTableProps) {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Songs</h1>
                <Link href="/songs/create">
                    <Button className="flex items-center">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Create new song
                    </Button>
                </Link>
            </div>
            <DataTable columns={columns} data={data} editUrlPrefix="/songs" />
        </div>
    )
}
