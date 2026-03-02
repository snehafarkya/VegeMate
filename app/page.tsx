"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { IngredientSelector } from "@/components/ingredient-selector";
import { DietaryFilters } from "@/components/dietary-filters";
import { RecipeDisplay } from "@/components/recipe-display";
import { RecipeSkeleton } from "@/components/recipe-skeleton";
import { saveFavorite, removeFavorite, isFavorite } from "@/lib/favorites";
import { Loader2, RefreshCw, Bookmark } from "lucide-react";
import { Footer } from "@/components/footer";
import { WhyVegeMate } from "@/components/whyVegeMate";

interface Recipe {
  name: string;
  description: string;
  servings: string;
  prepTime: string;
  cookTime: string;
  difficulty: string;
  ingredients: Array<{ name: string; amount: string }>;
  instructions: string[];
  tips: string[];
  nutrition: { calories: string; protein: string };
}

export default function Home() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const taglines = [
    "Turn leftovers into love.",
    "Plant-powered meals in seconds.",
    "From fridge to feast.",
    "Because vegetarian food deserves creativity.",
  ];

  const [displayText, setDisplayText] = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    let charIndex = 0;
    const currentText = taglines[taglineIndex];

    const typingInterval = setInterval(() => {
      setDisplayText(currentText.slice(0, charIndex + 1));
      charIndex++;

      if (charIndex === currentText.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          setTaglineIndex((prev) => (prev + 1) % taglines.length);
          setDisplayText("");
        }, 2000);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [taglineIndex]);
  // Load favorites on mount
  useEffect(() => {
    setIsClient(true);
    const checkFavorite = recipe ? isFavorite(recipe.name) : false;
    setFavorites(checkFavorite ? [recipe?.name || ""] : []);
  }, [recipe]);

  const handleIngredientToggle = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient],
    );
    setError("");
  };

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter],
    );
  };

  const generateRecipe = async () => {
    if (selectedIngredients.length === 0) {
      setError("Please select at least one ingredient");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: selectedIngredients,
          dietaryFilters: selectedFilters,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate recipe");
      }

      setRecipe(data.recipe);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setRecipe(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFavorite = () => {
    if (!recipe) return;

    if (isFavorite(recipe.name)) {
      removeFavorite(recipe.name);
      setFavorites((prev) => prev.filter((name) => name !== recipe.name));
    } else {
      saveFavorite(recipe);
      setFavorites((prev) => [...prev, recipe.name]);
    }
  };

  if (!isClient) return null;

  const isFav = recipe ? favorites.includes(recipe.name) : false;

  return (
    <>
      <Header />

      <main className="min-h-screen pt-16 relative overflow-hidden">
        {/* Soft Gradient Background Glow */}
        <div className="absolute inset-0 -z-10  bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.08),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.06),transparent_40%)]" />

        {/* Hero Section */}
        <section className="relative min-h-screen pattern-bg  bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/5 overflow-hidden">
          {/* Soft Glow Background */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,0.15),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.08),transparent_40%)]" />

          <div className="max-w-6xl text-center flex flex-col gap-6 justify-center items-center mx-auto px-6 py-24">
            {/* Badge */}
            <span className="inline-block text-xs uppercase tracking-widest text-primary font-semibold bg-primary/10 px-4 py-1.5 rounded-full backdrop-blur">
              Built for Vegetarians Worldwide
            </span>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-[56px] font-bold text-foreground leading-tight">
              The world has over
              <span className="text-primary"> 1 Billion Vegetarians.</span>
              <br />
              It’s time we cooked like it.
            </h1>

            {/* Typing Tagline */}
            <div className="h-8">
              <p className="text-xl text-primary font-medium tracking-wide">
                {displayText}
                <span className="animate-pulse">|</span>
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-2xl">
              VegeMate transforms the ingredients in your kitchen into
              thoughtful, plant-powered recipes crafted for your culture, taste,
              and dietary lifestyle, anywhere in the world.
            </p>

            {/* CTA Button */}
            <button
              onClick={() =>
                document
                  .getElementById("builder-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-1 cursor-pointer transition-all"
            >
              Start Cooking
            </button>
          </div>
        </section>
        <WhyVegeMate />
        <div className="pattern-bg">
          <div className="text-center ">
            <h2 className="text-5xl font-bold leading-tight">
              Let's cook something
              <span className="text-primary"> Delicious!</span>
            </h2>
          </div>
          {/* Main Builder Section */}
          <section
            id="builder-section"
            className="max-w-6xl mx-auto px-6 py-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Recipe Builder Panel */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 bg-card border border-border rounded-3xl p-8 shadow-lg space-y-8 backdrop-blur-sm">
                  <div>
                    <h2 className="text-lg font-semibold mb-4">
                      🥕 Build Your Recipe
                    </h2>

                    <IngredientSelector
                      selectedIngredients={selectedIngredients}
                      onIngredientToggle={handleIngredientToggle}
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                      Dietary Preferences
                    </h3>

                    <DietaryFilters
                      selectedFilters={selectedFilters}
                      onFilterToggle={handleFilterToggle}
                    />
                  </div>

                  <button
                    onClick={generateRecipe}
                    disabled={loading || selectedIngredients.length === 0}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Creating Magic...
                      </>
                    ) : (
                      <>
                        <RefreshCw size={18} />
                        Generate Recipe
                      </>
                    )}
                  </button>

                  {error && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
                      <p className="text-sm text-destructive font-medium">
                        {error}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Recipe Display Area */}
              <div className="lg:col-span-2">
                {loading ? (
                  <RecipeSkeleton />
                ) : recipe ? (
                  <div className="animate-fade-in">
                    <RecipeDisplay
                      recipe={recipe}
                      onSaveFavorite={handleSaveFavorite}
                      isFavorite={isFav}
                    />
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-3xl p-16 text-center shadow-md">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                      <Bookmark size={28} className="text-primary" />
                    </div>

                    <h3 className="text-2xl font-semibold text-foreground mb-3">
                      Your Recipe Awaits ✨
                    </h3>

                    <p className="text-muted-foreground max-w-md mx-auto">
                      Add ingredients from your kitchen and generate a
                      beautiful, plant-based recipe crafted just for you.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
