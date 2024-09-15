'use client'

import { Gig } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { format } from 'date-fns'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from '@/components/ui/button'

export const columns: ColumnDef<Gig & { isShared: boolean }>[] = [
    {
        accessorKey: 'title',
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
        accessorKey: 'date',
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
                    Date
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = new Date(row.original.date)
            return format(date, 'yyyy-MM-dd / HH:mm') // Updated date format
        },
    },
    {
        accessorKey: 'venue',
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
                    Venue
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="text-left">
                {row.original.venue}
            </div>
        ),
    },
    {
        accessorKey: 'isShared',
        header: "Shared",
        cell: ({ row }) => (
            <Checkbox
                checked={row.original.isShared}
                onCheckedChange={(checked: boolean) => {
                    // TODO: Implement API call to update shared status
                    console.log("Update shared status for gig:", row.original.id, checked)
                }}
            />
        ),
    },
]