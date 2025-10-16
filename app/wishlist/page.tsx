"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import Header from "../myCopmonent/Header";
import { useRouter } from "next/navigation";
import { ArrowLeft, Delete, ShoppingCart } from "lucide-react";
import Footer from "../myCopmonent/Footer";

interface WishlistProduct {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  artisan: string;
  rating: number;
  reviews: number;
  image: string;
  isInStock: boolean;
  isOnSale: boolean;
  addedDate: string;
  description: string;
}

const wishlistProducts: WishlistProduct[] = [
  {
    id: 1,
    name: "Sacred Geometry Mandala Art",
    price: 2499,
    originalPrice: 3200,
    category: "Mandala Art",
    artisan: "Priya Sharma",
    rating: 4.8,
    reviews: 24,
    image: "/api/placeholder/300/300",
    isInStock: true,
    isOnSale: true,
    addedDate: "2024-10-10",
    description: "Intricate sacred geometry mandala with vibrant colors and gold accents"
  },
  {
    id: 2,
    name: "Oxidized Silver Earrings",
    price: 1899,
    category: "Handmade Jewellery",
    artisan: "Meera Reddy",
    rating: 4.9,
    reviews: 18,
    image: "/api/placeholder/300/300",
    isInStock: true,
    isOnSale: false,
    addedDate: "2024-10-08",
    description: "Traditional oxidized silver earrings with intricate floral patterns"
  },
  {
    id: 3,
    name: "Traditional Mirror Wall Art",
    price: 3599,
    originalPrice: 4200,
    category: "Mirror Arts",
    artisan: "Rohit Kumar",
    rating: 4.7,
    reviews: 31,
    image: "/api/placeholder/300/300",
    isInStock: false,
    isOnSale: true,
    addedDate: "2024-10-05",
    description: "Handcrafted mirror work with traditional Rajasthani patterns"
  },
  {
    id: 4,
    name: "Boho Crochet Wall Hanging",
    price: 1299,
    category: "Crochet",
    artisan: "Kavya Nair",
    rating: 4.6,
    reviews: 15,
    image: "/api/placeholder/300/300",
    isInStock: true,
    isOnSale: false,
    addedDate: "2024-10-03",
    description: "Soft boho-style crochet wall hanging in natural cotton threads"
  },
  {
    id: 5,
    name: "Kerala Embroidered Table Runner",
    price: 2199,
    category: "Embroidery",
    artisan: "Arjun Patel",
    rating: 4.8,
    reviews: 22,
    image: "/api/placeholder/300/300",
    isInStock: true,
    isOnSale: false,
    addedDate: "2024-09-28",
    description: "Traditional Kerala motifs embroidered on pure cotton fabric"
  },
  {
    id: 6,
    name: "Abstract Fluid Art Canvas",
    price: 4299,
    originalPrice: 5000,
    category: "Fluid Art",
    artisan: "Vikram Singh",
    rating: 4.9,
    reviews: 12,
    image: "/api/placeholder/300/300",
    isInStock: true,
    isOnSale: true,
    addedDate: "2024-09-25",
    description: "Large abstract fluid art piece with ocean-inspired color palette"
  }
];

export default function WishlistPage() {
    const router = useRouter();
  const [products, setProducts] = useState(wishlistProducts);
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const removeFromWishlist = (productId: number) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const filteredProducts = products
    .filter(product => {
      if (filterBy === "all") return true;
      if (filterBy === "in-stock") return product.isInStock;
      if (filterBy === "on-sale") return product.isOnSale;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-xs ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}>
        ⭐
      </span>
    ));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const FilterContent = () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium text-sm mb-2">Sort By</h3>
        <div className="space-y-2">
          {[
            { value: "newest", label: "Newest First" },
            { value: "price-low", label: "Price: Low to High" },
            { value: "price-high", label: "Price: High to Low" },
            { value: "rating", label: "Highest Rated" }
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={sortBy === option.value}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-4 h-4 text-primary"
              />
              <span className="text-sm text-foreground">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-sm mb-2">Filter</h3>
        <div className="space-y-2">
          {[
            { value: "all", label: "All Items" },
            { value: "in-stock", label: "In Stock" },
            { value: "on-sale", label: "On Sale" }
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="filter"
                value={option.value}
                checked={filterBy === option.value}
                onChange={(e) => setFilterBy(e.target.value)}
                className="w-4 h-4 text-primary"
              />
              <span className="text-sm text-foreground">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 md:gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="hover:bg-muted h-8 w-8 md:h-10 md:w-10"
              >
                <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <div>
                <h1 className="text-lg md:text-2xl lg:text-2xl font-bold">
                  My Wishlist
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} in your wishlist
                </p>
              </div>
            </div>

            {/* Continue Shopping - Desktop */}
            <div className="flex fles-row gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/shop")}
              className="hidden md:flex"
            >
              <Delete className="mr-2 h-4 w-4" />
              Clear Wishlist
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/shop")}
              className="hidden md:flex"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
            </div>
          </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
          {/* Mobile Filter Sheet */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs">
                  <span className="mr-1">⚙️</span>
                  Sort & Filter
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="py-4">
                  <h2 className="text-base font-semibold mb-3">Sort & Filter</h2>
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2 py-1.5 border rounded-md bg-background text-xs"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-2 py-1.5 border rounded-md bg-background text-xs"
            >
              <option value="all">All Items</option>
              <option value="in-stock">In Stock</option>
              <option value="on-sale">On Sale</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1.5">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-7 w-7 p-0"
            >
              <span className="text-xs">⊞</span>
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-7 w-7 p-0"
            >
              <span className="text-xs">☰</span>
            </Button>
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-8 md:py-12">
            <div className="text-4xl mb-3">💝</div>
            <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Discover amazing handcrafted items and add them to your wishlist
            </p>
            <Link href="/shop">
              <Button size="sm">
                Browse Products
                <span className="ml-2">🛍️</span>
              </Button>
            </Link>
          </div>
        )}

        {/* Products Grid/List */}
        {filteredProducts.length > 0 && (
          <div className={`${
            viewMode === "grid" 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6" 
              : "space-y-4"
          }`}>
            {filteredProducts.map((product) => (
              viewMode === "grid" ? (
                // Grid View - Using Shop Page Card Design
                <Card 
                  key={product.id}
                  className="overflow-hidden group hover:shadow-xl transition-all duration-300 border hover:border-primary/30 p-0 cursor-pointer"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                    />

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.isOnSale && (
                        <Badge className="bg-red-500 hover:bg-red-600 text-white font-semibold text-[10px] md:text-xs px-1.5 py-0.5">
                          Sale
                        </Badge>
                      )}
                      {product.originalPrice && (
                        <Badge variant="secondary" className="bg-black/70 text-white text-[10px] md:text-xs px-1.5 py-0.5">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </Badge>
                      )}
                      {!product.isInStock && (
                        <Badge variant="secondary" className="bg-gray-500 text-white text-[10px] md:text-xs px-1.5 py-0.5">
                          Out of Stock
                        </Badge>
                      )}
                    </div>

                    {/* Wishlist Badge */}
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary/90 text-primary-foreground text-[10px] px-1.5 py-0.5">
                        ❤️ Wishlisted
                      </Badge>
                    </div>
                  </div>

                  {/* Product Info */}
                  <CardContent className="p-2 space-y-0.5">
                    {/* Category */}
                    <p className="text-[9px] md:text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      {product.category}
                    </p>

                    {/* Product Name */}
                    <h3 className="font-semibold text-[10px] md:text-xs lg:text-sm line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                      {product.name}
                    </h3>

                    {/* Artisan */}
                    <p className="text-[8px] md:text-[10px] text-muted-foreground">
                      by {product.artisan}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <div className="flex items-center gap-0.5">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-[8px] md:text-[10px] text-muted-foreground">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-1 md:gap-1.5">
                      <span className="text-xs md:text-sm lg:text-base font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[8px] md:text-[10px] text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </CardContent>

                  {/* Add to Cart Button */}
                  <div className="p-2 pt-0">
                    <Button
                      className="w-full rounded-full group/btn bg-primary hover:bg-primary/90 text-[9px] md:text-[10px] lg:text-xs h-7 md:h-8"
                      size="sm"
                      disabled={!product.isInStock}
                    >
                      <span className="mr-1 text-xs group-hover/btn:animate-bounce">🛒</span>
                      {product.isInStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </div>
                </Card>
              ) : (
                // List View - Horizontal Layout
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0 flex">
                    {/* Product Image */}
                    <div className="w-32 md:w-48 flex-shrink-0 relative overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.isOnSale && (
                          <Badge className="bg-red-500 text-white text-xs">Sale</Badge>
                        )}
                        {!product.isInStock && (
                          <Badge variant="secondary" className="bg-gray-500 text-white text-xs">
                            Out of Stock
                          </Badge>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        ❌
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 flex-1">
                      <div className="space-y-2">
                        {/* Category & Artisan */}
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                          <span>{product.category}</span>
                          <span>•</span>
                          <span>by {product.artisan}</span>
                        </div>

                        {/* Product Name */}
                        <h3 className="font-semibold text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-1">
                          <div className="flex">
                            {renderStars(product.rating)}
                          </div>
                          <span className="text-[10px] text-muted-foreground">
                            ({product.reviews})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary text-base">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-3">
                          <Link href={`/product/${product.id}`} className="flex-1">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="w-full text-[10px] h-7"
                            >
                              View Details
                            </Button>
                          </Link>
                          <Button 
                            size="sm" 
                            className="flex-1 text-[10px] h-7"
                            disabled={!product.isInStock}
                          >
                            {product.isInStock ? "Add to Cart" : "Out of Stock"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            ))}
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}