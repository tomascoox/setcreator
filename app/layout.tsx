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
            <html lang="en">
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0" />
                </head>
                <body>
                    <ClientLayout>{children}</ClientLayout>
                </body>
            </html>
        </ClerkProvider>
    )
}
