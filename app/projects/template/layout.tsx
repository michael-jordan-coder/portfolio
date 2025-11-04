import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Name - Case Study - Daniel Gur Arye Portfolio',
  description: 'Case study: Project description. Replace with your project description.',
  keywords: ['project keywords', 'UX design case study', 'product design', 'case study', 'user experience design'],
  openGraph: {
    title: 'Project Name - Case Study',
    description: 'Case study description for your project.',
    images: ['/placeholder-og.jpg'],
  },
}

export default function TemplateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

