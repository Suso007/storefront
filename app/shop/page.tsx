"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, ShoppingCart, Eye, Star, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "../myCopmonent/Header";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  imageHover?: string;
  badge?: string;
  isNew?: boolean;
}

// Generate mock products (total 100 products for infinite scroll demo)
const generateMockProducts = (): Product[] => {
  const categories = ["Mandala Art", "Handmade Jewellery", "Mirror Arts", "Crochet", "Embroidery", "Fluid Art", "Aroma Sanctuaries"];
  const productNames = [
    "Sacred Mandala Necklace", "Terracotta Clay Earrings", "Mirror Work Clutch", 
    "Embroidered Silk Scarf", "Crochet Table Runner", "Lavender Aroma Candle Set",
    "Fluid Art Canvas", "Handwoven Dream Catcher", "Beaded Bracelet Set",
    "Hand-painted Vase", "Macrame Wall Hanging", "Ceramic Bowl Set"
  ];
  
  const products: Product[] = [];
  for (let i = 1; i <= 100; i++) {
    const category = categories[i % categories.length];
    const basePrice = Math.floor(Math.random() * 3000) + 500;
    const hasDiscount = Math.random() > 0.5;
    
    products.push({
      id: i,
      name: `${productNames[i % productNames.length]} ${i}`,
      category,
      price: basePrice,
      originalPrice: hasDiscount ? basePrice + Math.floor(Math.random() * 1000) + 200 : undefined,
      rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
      reviews: Math.floor(Math.random() * 50) + 5,
      image: `https://images.unsplash.com/photo-${1599643478518 + i}?w=400&h=400&fit=crop`,
      imageHover: `https://images.unsplash.com/photo-${1611652022419 + i}?w=400&h=400&fit=crop`,
      badge: hasDiscount ? "Sale" : Math.random() > 0.7 ? "New" : undefined,
      isNew: Math.random() > 0.7,
    });
  }
  return products;
};

const allProducts = generateMockProducts();

const categories = ["Mandala Art", "Handmade Jewellery", "Mirror Arts", "Crochet", "Embroidery", "Fluid Art", "Aroma Sanctuaries"];

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
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleProductClick = () => {
    router.push(`/product/${product.id}`);
  };

  const handleEyeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/product/${product.id}`);
  };

  return (
    <Card 
      className="overflow-hidden group hover:shadow-xl transition-all duration-300 border hover:border-primary/30 p-0 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {/* Main Image */}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-500 ${
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
            onClick={handleEyeClick}
          >
            <Eye className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-white/90 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
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
          onClick={(e) => e.stopPropagation()}
        >
          <ShoppingCart className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4 group-hover/btn:animate-bounce" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function ShopPage() {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("featured");
  
  const observerTarget = useRef<HTMLDivElement>(null);

  // Filter and sort products
  const getFilteredProducts = useCallback(() => {
    let filtered = [...allProducts];

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Filter by price range
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter by rating
    filtered = filtered.filter(p => p.rating >= minRating);

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [selectedCategories, priceRange, minRating, sortBy]);

  // Load initial products
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const filtered = getFilteredProducts();
      setDisplayedProducts(filtered.slice(0, 16));
      setHasMore(filtered.length > 16);
      setIsLoading(false);
      setPage(1);
    }, 1000);
  }, [selectedCategories, priceRange, minRating, sortBy, getFilteredProducts]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore && !isLoading) {
          loadMoreProducts();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, isLoading, page]);

  const loadMoreProducts = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const filtered = getFilteredProducts();
      const nextPage = page + 1;
      const newProducts = filtered.slice(0, nextPage * 16);
      setDisplayedProducts(newProducts);
      setPage(nextPage);
      setHasMore(newProducts.length < filtered.length);
      setIsLoadingMore(false);
    }, 1000);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 5000]);
    setMinRating(0);
  };

  const activeFilterCount = selectedCategories.length + 
    (priceRange[0] !== 0 || priceRange[1] !== 5000 ? 1 : 0) + 
    (minRating > 0 ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6 px-4 pb-8">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-sm md:text-base mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label
                htmlFor={category}
                className="text-xs md:text-sm font-normal cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-sm md:text-base mb-3">Price Range</h3>
        <div className="space-y-3">
          <Slider
            min={0}
            max={5000}
            step={100}
            value={priceRange}
            onValueChange={setPriceRange}
            className="w-full"
          />
          <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="font-semibold text-sm md:text-base mb-3">Minimum Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1, 0].map((rating) => (
            <div
              key={rating}
              className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors ${
                minRating === rating ? "bg-primary/10" : "hover:bg-muted"
              }`}
              onClick={() => setMinRating(rating)}
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < rating
                        ? "fill-yellow-500 text-yellow-500"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs md:text-sm">
                {rating > 0 ? `${rating}+ Stars` : "All"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full"
        >
          Clear All Filters ({activeFilterCount})
        </Button>
      )}
    </div>
  );

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-2 md:py-4">
        {/* Header */}
        <div className="flex flex-row items-center justify-between">
        <div className="mb-2 md:mb-4">
          <h1 className="text-lg md:text-2xl lg:text-2xl font-bold mb-2">
            <span className="bg-gradient-to-r from-primary via-ring to-accent bg-clip-text text-transparent">
              Shop All Products
            </span>
          </h1>
          <p className="hidden md:block md:text-sm text-muted-foreground">
            Explore our complete collection of handcrafted treasures
          </p>
          <div className="block sm:hidden text-xs text-muted-foreground">
            Showing {displayedProducts.length} of {getFilteredProducts().length} products
        </div>
        </div>

          {/* Results Count */}
        <div className="hidden sm:block text-xs md:text-sm text-muted-foreground">
            Showing {displayedProducts.length} of {getFilteredProducts().length} products
        </div>

        {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px] md:w-[180px] text-xs md:text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4 md:mb-6 gap-3">
          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden relative">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-primary text-white text-[10px]">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Refine your product search
                </SheetDescription>
              </SheetHeader>
              <div className="">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>

        </div>

        {/* Main Content */}
        <div className="flex gap-6 md:gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-16 border rounded-lg p-4 bg-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                {activeFilterCount > 0 && (
                  <Badge variant="secondary">{activeFilterCount}</Badge>
                )}
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
              {isLoading
                ? Array.from({ length: 16 }).map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))
                : displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
            </div>

            {/* Loading More Indicator */}
            {isLoadingMore && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mt-3 md:mt-4 lg:mt-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <ProductSkeleton key={`loading-${index}`} />
                ))}
              </div>
            )}

            {/* Intersection Observer Target */}
            <div ref={observerTarget} className="h-10 mt-4" />

            {/* No More Products */}
            {!hasMore && displayedProducts.length > 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                You&apos;ve reached the end of the catalog
              </div>
            )}

            {/* No Results */}
            {!isLoading && displayedProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg font-semibold mb-2">No products found</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Try adjusting your filters
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
