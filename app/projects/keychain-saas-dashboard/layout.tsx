import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KEYCHAIN SaaS Dashboard - Case Study - Daniel Gur Arye Portfolio',
  description: 'Case study: An advanced SaaS dashboard solution designed for modern business applications. Features innovative workspace management, secure authentication systems, and comprehensive analytics.',
  keywords: ['KEYCHAIN', 'SaaS dashboard', 'workspace management', 'enterprise SaaS', 'UI design', 'UX case study'],
  openGraph: {
    title: 'KEYCHAIN SaaS Dashboard',
    description: 'An advanced SaaS dashboard solution designed for modern business applications.',
    images: ['/keychain/overview.png'],
  },
}

export default function KeychainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

