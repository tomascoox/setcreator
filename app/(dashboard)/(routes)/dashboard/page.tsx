'use client'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ArrowRight, AudioLines, CalendarDays, Cog, ScrollText } from 'lucide-react'
import { useRouter } from 'next/navigation'

const tools = [
    {
        label: 'Songs',
        icon: AudioLines,
        href: '/songs',
        color: 'text-violet-500',
        bgColor: 'text-violet-500/10',
    },
    {
        label: 'Setlists',
        icon: ScrollText,
        href: '/setlists',
        color: 'text-pink-500',
        bgColor: 'text-pink-500/10',
    },
    {
        label: 'Gigs',
        icon: CalendarDays,
        href: '/gigs',
        color: 'text-green-500',
        bgColor: 'text-green-500/10',
    },
    {
        label: 'Settings',
        icon: Cog,
        href: '/settings',
        color: 'text-gray-500',
        bgColor: 'text-black/10',
    },
]

const DashboardPage = () => {
    const router = useRouter()
    return (
        <div>
            <div className="mb-8 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center">Simplify Your Gigs</h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center px-4">
                    Simplify gig planning with GigManager. Manage songs, craft setlists, and organize gigs effortlessly. Our intuitive platform
                    ensures seamless show preparations, letting you focus on the music.{' '}
                </p>
            </div>
            <div className="px-4 md:px-20 lg:px-32 space-y-4">
                {tools.map(tool => (
                    <Card
                        onClick={() => router.push(tool.href)}
                        key={tool.href}
                        className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                    >
                        <div className="flex items-center gap-x-4">
                            <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                                <tool.icon className={cn('w-8 h-8', tool.color)} />
                            </div>
                            <div className="font-semibold">{tool.label}</div>
                        </div>
                        <ArrowRight className="w-5 h-5" />
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default DashboardPage
