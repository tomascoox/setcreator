'use client'

import { Band } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns' // Import format from date-fns

export const columns: ColumnDef<Band>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="p-0 h-8 font-bold text-left"
                >
                    Name
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="text-left">
                {row.original.name}
            </div>
        ),
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="p-0 h-8 font-bold text-left"
                >
                    Created At
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = new Date(row.original.createdAt)
            return format(date, 'yyyy-MM-dd') // Updated date format
        },
    },
]