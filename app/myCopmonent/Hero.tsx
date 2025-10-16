"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Heart } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="overflow-hidden">
      {/* Background Pattern */}
      <div>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-primary/20 rounded-full"></div>
        <div className="absolute top-40 right-40 w-24 h-24 border border-primary/20 rounded-full"></div>
        <div className="absolute bottom-32 left-1/3 w-16 h-16 border border-primary/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border border-primary/20 rounded-full"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 pt-4 lg:pt-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                Handcrafted with Love
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                Discover
                <span className="block text-primary">
                  Artisan Treasures
                </span>
              </h1>
              
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg">
                Explore unique handcrafted items from talented artisans across India. 
                Each piece tells a story of tradition, passion, and exceptional craftsmanship.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="group">
                <Link href="/shop">
                  Shop Collection
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link href="/artisans">
                  Meet Our Artisans
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-border">
              <div className="text-center sm:text-left">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">500+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Handcrafted Items</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">50+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Skilled Artisans</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">2000+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Happy Customers</div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="hidden relative md:flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm lg:max-w-md">
              <div className="relative rounded-2xl overflow-hidden">
                {/* Main Hero Image */}
                <div className="aspect-[3/4] bg-gradient-to-br from-muted to-accent/30 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop&crop=center"
                    alt="Beautiful handcrafted jewelry display"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-3 -left-3 bg-card border border-border rounded-xl p-3 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Heart className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">Made with Care</div>
                      <div className="text-[10px] text-muted-foreground">Traditional Methods</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-3 -right-3 bg-card border border-border rounded-xl p-3 shadow-lg backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-base font-bold text-primary">4.9★</div>
                    <div className="text-[10px] text-muted-foreground">Customer Rating</div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/4 -right-6 w-12 h-12 bg-primary/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-1/3 -left-4 w-8 h-8 bg-accent/30 rounded-full blur-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Bottom Decorative Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        {/* Geometric Pattern */}
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-primary/5 to-transparent">
          <div className="relative w-full h-full flex items-end justify-center">
            {/* Mandala-inspired dots pattern */}
            <div className="flex items-end gap-2 md:gap-3 lg:gap-4 pb-4">
              {[...Array(15)].map((_, i) => {
                const heights = [4, 6, 8, 10, 12, 14, 16, 18, 16, 14, 12, 10, 8, 6, 4];
                const opacity = i === 7 ? 1 : Math.max(0.3, 1 - Math.abs(i - 7) * 0.15);
                return (
                  <div
                    key={i}
                    className="bg-primary rounded-full transition-all duration-1000 ease-in-out"
                    style={{
                      width: '3px',
                      height: `${heights[i]}px`,
                      opacity: opacity,
                      animationDelay: `${i * 100}ms`,
                    }}
                  />
                );
              })}
            </div>
            
            {/* Floating craft icons */}
            <div className="absolute bottom-6 left-1/4 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
              <span className="text-xs">✨</span>
            </div>
            <div className="absolute bottom-8 right-1/4 w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
              <span className="text-xs">🎨</span>
            </div>
            <div className="absolute bottom-4 left-1/3 w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }}>
              <span className="text-xs">🪡</span>
            </div>
            <div className="absolute bottom-10 right-1/3 w-6 h-6 bg-primary/15 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}>
              <span className="text-xs">💎</span>
            </div>
          </div>
        </div>

        {/* Subtle line pattern */}
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      </div>
    </section>
  );
}
