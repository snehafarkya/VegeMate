export function RecipeSkeleton() {
  return (
    <div className="w-full bg-card border border-border rounded-2xl overflow-hidden shadow-sm animate-pulse">
      {/* Header Skeleton */}
      <div className="px-6 py-8 border-b border-border bg-gradient-to-br from-secondary/50 to-transparent">
        <div className="space-y-4">
          <div className="h-8 bg-muted rounded-lg w-3/4"></div>
          <div className="h-4 bg-muted rounded-lg w-full"></div>
          <div className="h-4 bg-muted rounded-lg w-2/3"></div>
        </div>

        {/* Quick Info Skeleton */}
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="h-6 bg-muted rounded-lg w-32"></div>
          <div className="h-6 bg-muted rounded-lg w-32"></div>
          <div className="h-6 bg-muted rounded-lg w-32"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="px-6 py-8 space-y-8">
        {/* Ingredients Skeleton */}
        <div>
          <div className="h-6 bg-muted rounded-lg w-24 mb-4"></div>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 bg-muted rounded-lg w-full"></div>
            ))}
          </div>
        </div>

        {/* Instructions Skeleton */}
        <div>
          <div className="h-6 bg-muted rounded-lg w-32 mb-4"></div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 bg-muted rounded-lg w-full"></div>
            ))}
          </div>
        </div>

        {/* Nutrition Skeleton */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="h-4 bg-muted rounded-lg w-24 mb-3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded-lg w-full"></div>
            <div className="h-4 bg-muted rounded-lg w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
