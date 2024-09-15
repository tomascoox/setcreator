'use client'

import { Song } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from "@/components/ui/checkbox"

function formatDuration(seconds: number) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export const columns: ColumnDef<Song & { isShared: boolean }>[] = [
    {
        accessorKey: 'title',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="p-0 h-8 font-bold text-left"
                >
                    Title
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="text-left">
                {row.original.title}
            </div>
        ),
    },
    {
        accessorKey: 'artist',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(
                            column.getIsSorted() === 'asc'
                        )
                    }
                    className="p-0 h-8 font-bold text-left"
                >
                    Artist
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="text-left">
                {row.original.artist}
            </div>
        ),
    },
    {
        accessorKey: 'duration',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(
                            column.getIsSorted() === 'asc'
                        )
                    }
                    className="p-0 h-8 font-bold text-left"
                >
                    Duration
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
            )
        },
        cell: ({ row }) =>
            row.original.duration !== null
                ? formatDuration(row.original.duration)
                : 'N/A',
    },
    {
        accessorKey: "isShared",
        header: "Shared",
        cell: ({ row }) => (
            <Checkbox
                checked={row.original.isShared}
                onCheckedChange={(checked: boolean) => {
                    // TODO: Implement API call to update shared status
                    console.log("Update shared status for song:", row.original.id, checked)
                }}
            />
        ),
    },
]
