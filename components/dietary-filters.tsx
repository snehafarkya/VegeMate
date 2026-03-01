'use client'

import { DIETARY_FILTERS } from '@/lib/ingredients'
import { Check } from 'lucide-react'

interface DietaryFiltersProps {
  selectedFilters: string[]
  onFilterToggle: (filter: string) => void
}

export function DietaryFilters({
  selectedFilters,
  onFilterToggle,
}: DietaryFiltersProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-foreground mb-4">
        Dietary Preferences
      </label>
      <div className="space-y-3">
        {DIETARY_FILTERS.map((filter) => {
          const isSelected = selectedFilters.includes(filter.id)
          return (
            <button
              key={filter.id}
              onClick={() => onFilterToggle(filter.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-muted-foreground'
              }`}
            >
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-primary border-primary'
                    : 'border-muted-foreground'
                }`}
              >
                {isSelected && (
                  <Check size={14} className="text-primary-foreground" />
                )}
              </div>
              <span
                className={`text-sm font-medium ${
                  isSelected ? 'text-primary' : 'text-foreground'
                }`}
              >
                {filter.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
