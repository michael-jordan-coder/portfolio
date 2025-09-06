import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design System - Daniel New01',
  description: 'מערכת העיצוב המקיפה של הפרויקט - צבעים, טיפוגרפיה, רכיבים ועוד',
  robots: 'noindex, nofollow' // לא נאנדקס את הדף הזה
}

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="design-system-layout">
      {children}
    </div>
  )
}
