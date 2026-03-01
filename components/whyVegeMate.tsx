'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Refrigerator, SlidersHorizontal, Leaf } from 'lucide-react'

const features = [
  {
    id: 'intelligence',
    label: 'Ingredient Intelligence',
    icon: <Refrigerator size={16} />,
    title: 'Turn what you have into what you crave.',
    description:
      'Our AI analyzes your available ingredients and transforms them into creative vegetarian recipes in seconds.',
  },
  {
    id: 'engine',
    label: 'Smart Recipe Engine',
    icon: <Sparkles size={16} />,
    title: 'Creativity powered by plant logic.',
    description:
      'Beyond basic suggestions, VegeMate crafts structured, practical recipes tailored to real kitchens.',
  },
  {
    id: 'filters',
    label: 'Dietary Customization',
    icon: <SlidersHorizontal size={16} />,
    title: 'Personalized to your lifestyle.',
    description:
      'Vegan? Gluten-free? High-protein? We intelligently adapt every recipe to your preferences.',
  },
  {
    id: 'impact',
    label: 'Waste Reduction',
    icon: <Leaf size={16} />,
    title: 'Cook smarter. Waste less.',
    description:
      'Reduce food waste by discovering new ways to use what’s already in your fridge.',
  },
]

export function WhyVegeMate() {
  const [active, setActive] = useState(features[0])

  return (
    <section id='features' className="relative py-28 overflow-hidden bg-background">

      {/* Soft Gradient Backdrop */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.12),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_40%)]" />

      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold leading-tight">
            What can you do with
            <span className="text-primary"> VegeMate?</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setActive(feature)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all ${
                active.id === feature.id
                  ? 'bg-primary text-primary-foreground shadow-lg border-primary'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/40'
              }`}
            >
              {feature.icon}
              {feature.label}
            </button>
          ))}
        </div>

        {/* Animated Content Area */}
        <div className="relative max-w-4xl mx-auto">

          <div className="bg-card border border-border rounded-3xl p-16 shadow-xl backdrop-blur">

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-3xl font-bold mb-6">
                  {active.title}
                </h3>

                <p className="text-lg text-muted-foreground max-w-2xl">
                  {active.description}
                </p>

                {/* Mock UI Preview */}
                <div className="mt-10 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 border border-border">
                  <p className="text-sm text-muted-foreground mb-3">
                    Example Output
                  </p>

                  <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
                    <h4 className="font-semibold text-foreground">
                      Creamy Spinach Chickpea Curry
                    </h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      Generated using: Spinach, Chickpeas, Onion, Garlic
                    </p>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  )
}