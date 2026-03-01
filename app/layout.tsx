import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'VegeMate - Vegetarian Recipe Finder',
  description: 'Discover delicious vegetarian recipes based on your ingredients. Celebrate plant-based cooking with dietary filters and personalized recipe suggestions.',
  keywords: 'vegetarian recipes, plant-based cooking, vegan recipes, gluten-free vegetarian, dairy-free recipes',
  authors: [{ name: 'VegeMate' }],
  openGraph: {
    title: 'VegeMate - Vegetarian Recipe Finder',
    description: 'Discover delicious vegetarian recipes based on your ingredients',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
