'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Montserrat } from 'next/font/google'

import { cn } from '@/lib/utils'
import { AudioLines, CalendarDays, Cog, LayoutDashboard, ScrollText } from 'lucide-react'
import { usePathname } from 'next/navigation'

const montserrat = Montserrat({
    weight: '600',
    subsets: ['latin'],
})

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-sky-500',
    },
    {
        label: 'Songs',
        icon: AudioLines,
        href: '/songs',
        color: 'text-violet-500',
    },
    {
        label: 'Setlists',
        icon: ScrollText,
        href: '/setlists',
        color: 'text-pink-500',
    },
    {
        label: 'Gigs',
        icon: CalendarDays,
        href: '/gigs',
        color: 'text-green-500',
    },
    {
        label: 'Settings',
        icon: Cog,
        href: '/settings',
        color: 'text-white',
    },
]

const Sidebar = () => {
    const pathname = usePathname()
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-12 h-12 mr-4">
                        <Image fill alt="Logo" src="/logo.png" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    </div>
                    <h1 className={cn('text-2xl font-bold', montserrat.className)}>GigManager</h1>
                </Link>
                <div className="space-y-1">
                    {routes.map(route => (
                        <Link href={route.href} key={route.href} className={cn('text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition', pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")}>
                            <div className="flex items-center flex-1">
                                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
