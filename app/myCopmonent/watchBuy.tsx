"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  emoji: string;
  count: number;
  href: string;
  description: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Mandala Art",
    emoji: "🎨",
    count: 48,
    href: "/category/mandala",
    description: "Sacred geometric patterns",
  },
  {
    id: 2,
    name: "Handmade Jewellery",
    emoji: "💎",
    count: 62,
    href: "/category/jewellery",
    description: "Crafted with precious metals",
  },
  {
    id: 3,
    name: "Mirror Arts",
    emoji: "✨",
    count: 35,
    href: "/category/mirror-arts",
    description: "Reflective beauty pieces",
  },
  {
    id: 4,
    name: "Crochet",
    emoji: "🧶",
    count: 54,
    href: "/category/crochet",
    description: "Soft handwoven textiles",
  },
  {
    id: 5,
    name: "Embroidery",
    emoji: "🪡",
    count: 41,
    href: "/category/embroidery",
    description: "Intricate needlework art",
  },
  {
    id: 6,
    name: "Fluid Art",
    emoji: "🌊",
    count: 29,
    href: "/category/fluid-art",
    description: "Abstract flowing designs",
  },
  {
    id: 7,
    name: "Aroma Sanctuaries",
    emoji: "🕯️",
    count: 38,
    href: "/category/aroma",
    description: "Handcrafted candles & scents",
  },
];

export default function CategoryNav() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  return (
    <section className="py-4 md:py-8 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-2 md:mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <span className="text-base">✨</span>
            Explore Categories
          </div>
        </div>

        {/* Categories - Mobile Slider, Desktop Grid */}
        
        {/* Mobile Horizontal Slider */}
        <div className="md:hidden relative">
          {/* Gradient overlays for slider effect */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex gap-4 overflow-x-auto scrollbar-hide p-2 snap-x snap-mandatory px-4">
            {categories.map((category) => (
              <Link key={category.id} href={category.href}>
                <div
                  className="group cursor-pointer transition-all duration-300 hover:scale-105 flex-shrink-0 snap-start"
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className="flex flex-col items-center text-center space-y-2 w-16">
                    {/* Compact Icon with Badge */}
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                        <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                          {category.emoji}
                        </span>
                      </div>
                      
                      {/* Small badge */}
                      <Badge
                        variant="secondary"
                        className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] font-medium bg-primary text-primary-foreground"
                      >
                        {category.count}
                      </Badge>
                    </div>

                    {/* Compact Category Info */}
                    <div className="space-y-1">
                      <h3 className="font-medium text-xs text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            

          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={category.href}>
              <div
                className="group cursor-pointer transition-all duration-300 hover:scale-105"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  {/* Compact Icon with Badge */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                      <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                        {category.emoji}
                      </span>
                    </div>
                    
                    {/* Small badge */}
                    <Badge
                      variant="secondary"
                      className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] font-medium bg-primary text-primary-foreground"
                    >
                      {category.count}
                    </Badge>
                  </div>

                  {/* Compact Category Info */}
                  <div className="space-y-1">
                    <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}

        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
