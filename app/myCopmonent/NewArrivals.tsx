"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  imageHover?: string; // Second image for hover
  badge?: string;
  isNew?: boolean;
}

// Mock product data - Replace with actual data from your API
const products: Product[] = [
  {
    id: 1,
    name: "Sacred Mandala Necklace",
    category: "Mandala Art",
    price: 2499,
    originalPrice: 3200,
    rating: 4.9,
    reviews: 24,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop",
    badge: "Sale",
    isNew: true,
  },
  {
    id: 2,
    name: "Terracotta Clay Earrings",
    category: "Clay Jewelry",
    price: 899,
    originalPrice: 1200,
    rating: 4.7,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop",
    badge: "Sale",
  },
  {
    id: 3,
    name: "Mirror Work Clutch",
    category: "Mirror Work",
    price: 1599,
    originalPrice: 2100,
    rating: 4.8,
    reviews: 31,
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=400&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1590739225017-e8d5af733e4e?w=400&h=400&fit=crop",
    badge: "Sale",
  },
  {
    id: 4,
    name: "Embroidered Silk Scarf",
    category: "Embroidery",
    price: 2299,
    originalPrice: 2800,
    rating: 4.6,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1601924638867-2a5e6c5d6c6f?w=400&h=400&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=400&h=400&fit=crop",
    badge: "New",
    isNew: true,
  },
  {
    id: 5,
    name: "Crochet Table Runner",
    category: "Crochet",
    price: 1199,
    originalPrice: 1500,
    rating: 4.9,
    reviews: 22,
    image: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=400&h=400&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=400&h=400&fit=crop",
    badge: "Sale",
  },
  {
    id: 6,
    name: "Lavender Aroma Candle Set",
    category: "Aroma Candles",
    price: 799,
    originalPrice: 1000,
    rating: 4.8,
    reviews: 27,
    image: "https://images.unsplash.com/photo-1602874801006-c2b14c17b0b3?w=400&h=400&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
    badge: "New",
    isNew: true,
  },
  {
    id: 7,
    name: "Fluid Art Canvas",
    category: "Fluid Art",
    price: 3499,
    rating: 5.0,
    reviews: 12,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
    isNew: true,
  },
  {
    id: 8,
    name: "Handwoven Dream Catcher",
    category: "Crochet",
    price: 1899,
    rating: 4.7,
    reviews: 19,
    image: "https://images.unsplash.com/photo-1618609378039-b572f64c5b42?w=400&h=400&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop",
  },
];

function ProductSkeleton() {
  return (
    <Card className="overflow-hidden group p-0">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Skeleton className="w-full h-full" />
      </div>
      <CardContent className="p-2 space-y-1">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 md:h-5 w-full" />
        <div className="flex items-center gap-1">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
      </CardContent>
      <CardFooter className="p-2 pt-0">
        <Skeleton className="h-8 md:h-9 w-full rounded-full" />
      </CardFooter>
    </Card>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card 
      className="overflow-hidden group hover:shadow-xl transition-all duration-300 border hover:border-primary/30 p-0 pb-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {/* Main Image */}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-fit transition-all duration-500 ${
            isHovered && product.imageHover ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />
        
        {/* Hover Image */}
        {product.imageHover && (
          <img
            src={product.imageHover}
            alt={`${product.name} - alternate view`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          />
        )}
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-white/90 hover:bg-white"
          >
            <Eye className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-white/90 hover:bg-white"
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart
              className={`h-3 w-3 md:h-4 md:w-4 ${
                isWishlisted ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badge && (
            <Badge
              className={`${
                product.badge === "Sale"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-primary hover:bg-primary/90"
              } text-white font-semibold text-[10px] md:text-xs px-1.5 py-0.5`}
            >
              {product.badge}
            </Badge>
          )}
          {discount > 0 && (
            <Badge variant="secondary" className="bg-black/70 text-white text-[10px] md:text-xs px-1.5 py-0.5">
              -{discount}%
            </Badge>
          )}
        </div>
      </div>

      {/* Product Info */}
      <CardContent className="p-2 space-y-0.5">
        {/* Category */}
        <p className="text-[9px] md:text-xs text-muted-foreground font-medium uppercase tracking-wide">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="font-semibold text-xs md:text-sm lg:text-base line-clamp-2 group-hover:text-primary transition-colors leading-tight">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 md:gap-1.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-2.5 w-2.5 md:h-3 md:w-3 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-500 text-yellow-500"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-[9px] md:text-xs text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-1.5 md:gap-2">
          <span className="text-sm md:text-base lg:text-lg font-bold text-primary">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-[10px] md:text-xs text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </CardContent>

      {/* Add to Cart Button */}
      <CardFooter className="p-2 pt-0">
        <Button
          className="w-full rounded-full group/btn bg-primary hover:bg-primary/90 text-[10px] md:text-xs lg:text-sm h-8 md:h-9"
          size="sm"
        >
          <ShoppingCart className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4 group-hover/btn:animate-bounce" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function NewArrivals() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading - Replace with actual API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-4 md:py-8 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-10 space-y-2 md:space-y-3">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
            <span className="bg-gradient-to-r from-primary via-ring to-accent bg-clip-text text-transparent">
              New Arrivals
            </span>
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto">
            Discover our latest handcrafted treasures
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 md:mt-12">
          <Button
            size="lg"
            variant="outline"
            className="px-6 md:px-8 py-4 md:py-5 text-sm md:text-base rounded-full border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            View All Products
            <i className="ri-arrow-right-line ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
