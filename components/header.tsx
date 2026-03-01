'use client'

import Link from 'next/link'
import { Bookmark, Leaf } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 font-bold text-lg text-foreground hover:text-primary transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
            <Leaf size={18} className="text-primary" />
          </div>
          <span className="hidden sm:inline">VegeMate</span>
        </Link>
        
        <nav className="flex items-center gap-1 sm:gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-all px-3 py-2 rounded-lg ${
              pathname === '/'
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            Discover
          </Link>
          <Link
            href="/favorites"
            className={`flex items-center gap-2 text-sm font-medium transition-all px-3 py-2 rounded-lg ${
              pathname === '/favorites'
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Bookmark size={16} />
            <span className="hidden sm:inline">Favorites</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
