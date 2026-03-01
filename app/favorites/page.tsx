"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { getFavorites, removeFavorite } from "@/lib/favorites";
import { RecipeDisplay } from "@/components/recipe-display";
import { Trash2, Bookmark, ArrowLeft } from "lucide-react";

interface FavoriteRecipe {
  name: string;
  description: string;
  savedAt: number;
  recipeData: any;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const savedFavorites = getFavorites();
    setFavorites(savedFavorites);
  };

  const handleRemoveFavorite = (recipeName: string) => {
    removeFavorite(recipeName);
    setFavorites((prev) => prev.filter((fav) => fav.name !== recipeName));
    if (selectedRecipe?.name === recipeName) {
      setSelectedRecipe(null);
    }
  };

  if (!isClient) return null;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background pt-16">
        {/* Page Header */}
        <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/5 border-b border-border sticky top-16 z-20 backdrop-blur">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
            >
              <ArrowLeft width={12} /> Back to Recipe Finder
            </Link>

            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              My Favorite Recipes
            </h1>

            <p className="text-muted-foreground mt-2">
              {favorites.length === 0
                ? "Start saving recipes to build your collection"
                : `${favorites.length} recipe${
                    favorites.length !== 1 ? "s" : ""
                  } saved`}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          {favorites.length === 0 ? (
            <div className="bg-card border border-border rounded-3xl p-16 text-center max-w-md mx-auto shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/30 mb-6">
                <Bookmark size={24} className="text-primary" />
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3">
                No favorites yet
              </h3>

              <p className="text-muted-foreground mb-6">
                Start creating recipes and saving your favorites to see them
                here.
              </p>

              <Link
                href="/"
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:shadow-lg transition"
              >
                Discover Recipes
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
              {/* LEFT - Sticky Sidebar */}
              <div className="lg:col-span-1 sticky top-64">
                <div className=" space-y-3">
                  <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider px-2 mb-4">
                    Saved Recipes
                  </h2>

                  {favorites.map((fav) => (
                    <button
                      key={fav.name}
                      onClick={() => setSelectedRecipe(fav.recipeData)}
                      className={`w-full text-left px-4 py-3 cursor-pointer rounded-xl transition-all border ${
                        selectedRecipe?.name === fav.name
                          ? "bg-primary/10 border-primary shadow-sm"
                          : "bg-card border-border hover:border-primary/40 hover:shadow-sm"
                      }`}
                    >
                      <p className="font-medium text-foreground truncate">
                        {fav.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(fav.savedAt).toLocaleDateString()}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* RIGHT - Normal Scroll */}
              <div className="lg:col-span-2">
                {selectedRecipe ? (
                  <div className="space-y-6">
                    <RecipeDisplay
                      recipe={selectedRecipe}
                      onSaveFavorite={() => {}}
                      isFavorite={true}
                    />

                    <button
                      onClick={() => handleRemoveFavorite(selectedRecipe.name)}
                      className="w-full flex items-center cursor-pointer justify-center gap-2 px-4 py-3 bg-destructive/10 hover:bg-destructive/20 text-destructive border border-destructive/20 rounded-xl font-medium transition"
                    >
                      <Trash2 size={18} />
                      Remove from Favorites
                    </button>
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-3xl p-16 text-center shadow-sm">
                    <Bookmark size={24} className="text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Select a recipe
                    </h3>
                    <p className="text-muted-foreground">
                      Click on any saved recipe to view the full details.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
