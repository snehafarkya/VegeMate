'use client'

import { useState, useMemo } from 'react'
import { INGREDIENTS } from '@/lib/ingredients'
import { X } from 'lucide-react'

interface IngredientSelectorProps {
  selectedIngredients: string[]
  onIngredientToggle: (ingredient: string) => void
}

export function IngredientSelector({
  selectedIngredients,
  onIngredientToggle,
}: IngredientSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')

  // Only filter when typing
  const filteredIngredients = useMemo(() => {
    if (!searchTerm.trim()) return []

    return INGREDIENTS.filter(
      (ingredient) =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedIngredients.includes(ingredient)
    )
  }, [searchTerm, selectedIngredients])

  const handleSelect = (ingredient: string) => {
    onIngredientToggle(ingredient)
    setSearchTerm('') // clear after adding
  }

  return (
    <div className="w-full">
      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          What ingredients do you have?
        </label>

        <input
          type="text"
          placeholder="Type to search ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Selected Ingredients */}
      {selectedIngredients.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Selected ({selectedIngredients.length})
          </p>

          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map((ingredient) => (
              <button
                key={ingredient}
                onClick={() => onIngredientToggle(ingredient)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:shadow-md transition-all"
              >
                {ingredient}
                <X size={14} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results (only when typing) */}
      {searchTerm && filteredIngredients.length > 0 && (
        <div className="border border-border rounded-lg p-3 bg-card shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Results
          </p>

          <div className="flex flex-wrap gap-2">
            {filteredIngredients.map((ingredient) => (
              <button
                key={ingredient}
                onClick={() => handleSelect(ingredient)}
                className="px-3 py-2 border border-border rounded-full text-sm text-foreground hover:bg-secondary hover:border-primary transition-all"
              >
                {ingredient}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searchTerm && filteredIngredients.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No ingredients found.
        </p>
      )}
    </div>
  )
}