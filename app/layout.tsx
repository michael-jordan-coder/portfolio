import type { Metadata } from 'next'
import { SmoothScrollProvider } from '../components/SmoothScrollProvider'
import { ScrollRestoration } from '../components/ScrollRestoration'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://danielgurarye.com'),
  title: {
    default: 'Daniel Gur Arye - UX Designer & Developer | Tel Aviv, Israel',
    template: '%s | Daniel Gur Arye'
  },
  description: 'Professional UX designer and developer based in Tel Aviv. Specializing in user experience design, web development, and creating intuitive digital products.',
  keywords: ['UX designer', 'web developer', 'UI designer', 'Tel Aviv', 'Israel', 'user experience', 'digital design', 'design systems', 'Figma', 'React', 'Next.js'],
  authors: [{ name: 'Daniel Gur Arye' }],
  creator: 'Daniel Gur Arye',
  publisher: 'Daniel Gur Arye',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Daniel Gur Arye Portfolio',
    title: 'Daniel Gur Arye - UX Designer & Developer',
    description: 'Professional UX designer and developer based in Tel Aviv. Creating exceptional digital experiences.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Daniel Gur Arye - UX Designer & Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daniel Gur Arye - UX Designer & Developer',
    description: 'Professional UX designer and developer based in Tel Aviv.',
    images: ['/twitter-card.jpg'],
  },
  icons: {
    icon: '/iconfav.svg',
    apple: '/iconfav.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/iconfav.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/iconfav.svg" />
        
        {/* Schema.org structured data - Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Daniel Gur Arye",
              "jobTitle": "UX Designer & Developer",
              "description": "Professional UX designer and developer based in Tel Aviv, Israel",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://danielgurarye.com",
              "sameAs": [
                "https://linkedin.com/in/daniel-gur-arye",
                "https://github.com/danielgurarye",
                "https://behance.net/danielgurarye"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Tel Aviv",
                "addressCountry": "IL"
              },
              "knowsAbout": [
                "User Experience Design",
                "Web Development",
                "UI Design",
                "Design Systems",
                "Figma",
                "React",
                "Next.js",
                "JavaScript",
                "TypeScript"
              ]
            })
          }}
        />
        
        {/* Schema.org structured data - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Daniel Gur Arye - UX Design Services",
              "description": "Professional UX design and development services in Tel Aviv",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://danielgurarye.com",
              "telephone": "+972-53-825-0078",
              "email": "daniel.gourarye@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Tel Aviv",
                "addressCountry": "IL"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "32.0853",
                "longitude": "34.7818"
              },
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "32.0853",
                  "longitude": "34.7818"
                },
                "geoRadius": "50000"
              },
              "priceRange": "$$",
              "openingHours": "Mo-Fr 09:00-18:00",
              "areaServed": ["Tel Aviv", "Israel"],
              "serviceType": ["UX Design", "Web Development", "UI Design", "Design Systems"]
            })
          }}
        />
        
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
        
        {/* Microsoft Clarity */}
        <Script
          id="clarity-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "u5zglv6zoh");
            `
          }}
        />
      </head>
      <body>
        <SmoothScrollProvider>
          <ScrollRestoration />
          {children}
        </SmoothScrollProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
