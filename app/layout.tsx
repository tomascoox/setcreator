import { ClerkProvider } from '@clerk/nextjs'
import ClientLayout from './client-layout'
import { metadata } from './layout-metadata'

export { metadata }

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <ClientLayout>{children}</ClientLayout>
        </ClerkProvider>
    )
}
