import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Daniel Gur Arye - UX Designer & Developer',
  description: 'Learn about Daniel Gur Arye, a passionate UX designer and developer from Tel Aviv. Discover my background, skills, and approach to creating exceptional user experiences.',
  keywords: ['about Daniel Gur Arye', 'UX designer background', 'Tel Aviv designer', 'user experience expert', 'design philosophy'],
  openGraph: {
    title: 'About Daniel Gur Arye - UX Designer',
    description: 'Learn about Daniel\'s background, skills, and approach to UX design.',
    images: ['/about-og.jpg'],
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 