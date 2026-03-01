const FAVORITES_KEY = 'vegemate_favorites'

export interface FavoriteRecipe {
  name: string
  description: string
  savedAt: number
  recipeData: any
}

export function getFavorites(): FavoriteRecipe[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(FAVORITES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error reading favorites:', error)
    return []
  }
}

export function saveFavorite(recipe: any): void {
  if (typeof window === 'undefined') return

  try {
    const favorites = getFavorites()
    const exists = favorites.some((fav) => fav.name === recipe.name)

    if (!exists) {
      favorites.push({
        name: recipe.name,
        description: recipe.description,
        savedAt: Date.now(),
        recipeData: recipe,
      })
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    }
  } catch (error) {
    console.error('Error saving favorite:', error)
  }
}

export function removeFavorite(recipeName: string): void {
  if (typeof window === 'undefined') return

  try {
    const favorites = getFavorites()
    const filtered = favorites.filter((fav) => fav.name !== recipeName)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error('Error removing favorite:', error)
  }
}

export function isFavorite(recipeName: string): boolean {
  const favorites = getFavorites()
  return favorites.some((fav) => fav.name === recipeName)
}
