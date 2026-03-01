'use client'

import { Heart } from 'lucide-react'
import { useState } from 'react'

interface RecipeIngredient {
  name: string
  amount: string
}

interface Recipe {
  name: string
  description: string
  servings: string
  prepTime: string
  cookTime: string
  difficulty: string
  ingredients: RecipeIngredient[]
  instructions: string[]
  tips: string[]
  nutrition: {
    calories: string
    protein: string
  }
}

interface RecipeDisplayProps {
  recipe: Recipe
  onSaveFavorite: () => void
  isFavorite: boolean
}

export function RecipeDisplay({
  recipe,
  onSaveFavorite,
  isFavorite,
}: RecipeDisplayProps) {
  const difficultyColors: Record<string, string> = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-orange-100 text-orange-800',
  }

  const totalTime =
    parseInt(recipe.prepTime) + parseInt(recipe.cookTime) || 0

  return (
    <div className="w-full bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-6 py-8 border-b border-border bg-gradient-to-br from-secondary/50 to-transparent">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {recipe.name}
            </h2>
            <p className="text-muted-foreground">{recipe.description}</p>
          </div>
          <button
            onClick={onSaveFavorite}
            className="ml-4 p-2 rounded-full hover:bg-secondary transition-colors flex-shrink-0"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              size={24}
              className={isFavorite ? 'fill-accent text-accent' : 'text-muted-foreground'}
            />
          </button>
        </div>

        {/* Quick Info */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">Servings:</span>
            <span className="text-muted-foreground">{recipe.servings}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">Prep:</span>
            <span className="text-muted-foreground">{recipe.prepTime} min</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">Cook:</span>
            <span className="text-muted-foreground">{recipe.cookTime} min</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">Total:</span>
            <span className="text-muted-foreground">{totalTime} min</span>
          </div>
          <div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                difficultyColors[recipe.difficulty] || difficultyColors.Easy
              }`}
            >
              {recipe.difficulty}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 space-y-8">
        {/* Ingredients */}
        <div>
          <h3 className="text-lg font-bold text-foreground mb-4">Ingredients</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-foreground"
              >
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold flex-shrink-0">
                  •
                </span>
                <span>
                  <span className="font-medium">{ingredient.amount}</span>{' '}
                  {ingredient.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div>
          <h3 className="text-lg font-bold text-foreground mb-4">
            Instructions
          </h3>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, idx) => (
              <li key={idx} className="flex gap-4">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/20 text-accent font-bold flex-shrink-0 text-sm">
                  {idx + 1}
                </span>
                <span className="pt-0.5 text-foreground">{instruction}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Tips */}
        {recipe.tips && recipe.tips.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">
              Chef&apos;s Tips
            </h3>
            <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
              {recipe.tips.map((tip, idx) => (
                <p key={idx} className="text-sm text-foreground flex gap-2">
                  <span className="font-bold text-accent">✓</span>
                  {tip}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Nutrition */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
            Nutrition (Per Serving)
          </h3>
          <div className="space-y-2">
            <p className="text-sm text-foreground">
              <span className="font-medium">Calories:</span> {recipe.nutrition.calories}
            </p>
            <p className="text-sm text-foreground">
              <span className="font-medium">Protein:</span> {recipe.nutrition.protein}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
