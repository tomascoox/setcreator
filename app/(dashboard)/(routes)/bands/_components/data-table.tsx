'use client'

import { DataTable } from "@/components/DataTable"
import { columns } from "./columns"
import { Band } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

interface BandsDataTableProps {
    data: Band[]
}

export function BandsDataTable({ data }: BandsDataTableProps) {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Bands</h1>
                <Link href="/bands/create">
                    <Button className="flex items-center">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Create new band
                    </Button>
                </Link>
            </div>
            <DataTable columns={columns} data={data} editUrlPrefix="/bands" />
        </div>
    )
}