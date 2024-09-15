'use client';

import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Inter } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '../components/providers/toaster-provider'

const inter = Inter({ subsets: ['latin'] })

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { isSignedIn, userId } = useAuth();

    useEffect(() => {
        if (isSignedIn && userId) {
            fetch('/api/auth/sync', { method: 'POST' })
                .then(response => response.json())
                .catch(error => {
                    // Handle error silently or use a proper error logging service
                });
        }
    }, [isSignedIn, userId]);

    return (
        <div className={inter.className}>
            <ToastProvider />
            {children}
        </div>
    )
}