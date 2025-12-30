import { Button } from "@/components/ui/button"

const CATEGORIES = [
  "Semua", "Kuliner", "Funture", "Jasa", "Fashion", "Kerajinan", "Pertanian"
]

export function CategoryRail() {
  return (
    <div className="w-full border-b bg-background sticky top-16 z-40 shadow-sm">
      <div className="container mx-auto overflow-x-auto py-4 scrollbar-hide">
        <div className="flex gap-2 px-4 md:px-0 min-w-max">
          {CATEGORIES.map((cat, i) => (
            <Button 
              key={cat} 
              variant={i === 0 ? "default" : "secondary"} 
              size="sm" 
              className={`rounded-full px-6 ${i !== 0 ? "bg-secondary/50 hover:bg-secondary border border-transparent hover:border-border" : ""}`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}