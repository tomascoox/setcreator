'use client'

import { Gig } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react'
import { format } from 'date-fns'
import { Checkbox } from "@/components/ui/checkbox"

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

export const columns: ColumnDef<Gig & { isCollaborative: boolean }>[] = [
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
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
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
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = new Date(row.original.date)
            return format(date, 'yyyy-MM-dd / HH:mm') // Updated date format
        },
    },
    {
        accessorKey: 'venue', // Change this from 'location' to 'venue'
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(
                            column.getIsSorted() === 'asc'
                        )
                    }
                >
                    Venue
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'isCollaborative',
        header: "Collaborative",
        cell: ({ row }) => (
            <Checkbox
                checked={row.original.isCollaborative}
                onCheckedChange={(checked: boolean) => {
                    // TODO: Implement API call to update collaboration status
                    console.log("Update collaboration status for gig:", row.original.id, checked)
                }}
            />
        ),
    }
]