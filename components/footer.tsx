'use client'

import Link from 'next/link'
import { Leaf, Github, Mail, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-gradient-to-br from-primary/5 via-background to-secondary/5 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="text-primary" size={20} />
              <span className="text-xl font-bold text-foreground">
                VegeMate
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering vegetarians worldwide to transform everyday ingredients
              into thoughtful, plant-powered meals. Cook smarter. Waste less.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Recipe Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Saved Recipes
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Community
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#features"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About VegeMate
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sustainability
                </a>
              </li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/snehafarkya"
                className="p-2 rounded-lg bg-secondary/40 hover:bg-primary/10 transition"
              >
                <Github size={18} className="text-foreground" />
              </a>
              <a
                href="https://www.linkedin.com/in/sneha-farkya/"
                className="p-2 rounded-lg bg-secondary/40 hover:bg-primary/10 transition"
              >
                <Linkedin size={18} className="text-foreground" />
              </a>
              <a
                href="https://twitter.com/sneha_farkya"
                className="p-2 rounded-lg bg-secondary/40 hover:bg-primary/10 transition"
              >
                <Twitter size={18} className="text-foreground" />
              </a>
              <a
                href="mailto:sneha06.work@gmail.com"
                className="p-2 rounded-lg bg-secondary/40 hover:bg-primary/10 transition"
              >
                <Mail size={18} className="text-foreground" />
              </a>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              Built by Sneha Farkya, with 💚 for vegetarians across the globe.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} VegeMate. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}