import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from '@/components/providers/toaster-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'GigManager',
    description: 'Simplify gig planning with GigManager. Manage songs, craft setlists, and organize gigs effortlessly. Our intuitive platform ensures seamless show preparations, letting you focus on the music.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <ToastProvider />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}
