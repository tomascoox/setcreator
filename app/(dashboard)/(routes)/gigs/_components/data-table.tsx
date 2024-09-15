'use client'

import { DataTable } from "@/components/DataTable"
import { columns } from "./columns"
import { Gig } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

interface GigsDataTableProps {
    data: (Gig & { isShared: boolean })[]
}

export function GigsDataTable({ data }: GigsDataTableProps) {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Gigs</h1>
                <Link href="/gigs/create">
                    <Button className="flex items-center">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Create new gig
                    </Button>
                </Link>
            </div>
            <DataTable columns={columns} data={data} editUrlPrefix="/gigs" />
        </div>
    )
}