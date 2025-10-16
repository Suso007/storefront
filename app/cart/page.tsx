"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Heart,
  ArrowLeft,
  Tag,
  Truck,
  Shield,
  CreditCard,
  Gift,
  Star,
  X,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import Header from "../myCopmonent/Header";

interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  rating: number;
  reviews: number;
  artisan: string;
  inStock: number;
  variant?: {
    size?: string;
    color?: string;
  };
}

interface RecommendedProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  imageHover?: string;
  rating: number;
  reviews: number;
  badge?: string;
  isNew?: boolean;
}

// Mock cart data
const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: "Sacred Mandala Necklace with Turquoise Stone",
    category: "Handmade Jewellery",
    price: 2499,
    originalPrice: 3199,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    quantity: 1,
    rating: 4.8,
    reviews: 124,
    artisan: "Maya Crafts",
    inStock: 5,
    variant: { size: "Medium", color: "Silver" },
  },
  {
    id: 2,
    name: "Hand-embroidered Silk Scarf",
    category: "Embroidery",
    price: 1899,
    image: "https://images.unsplash.com/photo-1611652022419-c4b13b1a76c2?w=400&h=400&fit=crop",
    quantity: 2,
    rating: 4.6,
    reviews: 89,
    artisan: "Silk Stories",
    inStock: 12,
    variant: { color: "Royal Blue" },
  },
  {
    id: 3,
    name: "Lavender Aroma Candle Set (Pack of 3)",
    category: "Aroma Sanctuaries",
    price: 899,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1602874801007-62ccadb2761f?w=400&h=400&fit=crop",
    quantity: 1,
    rating: 4.9,
    reviews: 203,
    artisan: "Serenity Scents",
    inStock: 8,
  },
];

const mockRecommendedProducts: RecommendedProduct[] = [
  {
    id: 4,
    name: "Mirror Work Clutch Bag",
    category: "Mirror Arts",
    price: 1599,
    originalPrice: 2199,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop&sat=2",
    rating: 4.7,
    reviews: 89,
    badge: "Sale",
  },
  {
    id: 5,
    name: "Crochet Table Runner",
    category: "Crochet",
    price: 1299,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&contrast=2",
    rating: 4.5,
    reviews: 67,
    isNew: true,
  },
  {
    id: 6,
    name: "Fluid Art Canvas",
    category: "Fluid Art",
    price: 3499,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop&hue=30",
    rating: 4.8,
    reviews: 143,
  },
  {
    id: 7,
    name: "Terracotta Clay Earrings",
    category: "Handmade Jewellery",
    price: 599,
    originalPrice: 899,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&sat=-1",
    rating: 4.4,
    reviews: 52,
    badge: "Sale",
  },
  {
    id: 8,
    name: "Handwoven Dream Catcher",
    category: "Mandala Art",
    price: 1899,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&brightness=1.2",
    rating: 4.6,
    reviews: 78,
    isNew: true,
  },
  {
    id: 9,
    name: "Embroidered Cushion Cover",
    category: "Embroidery",
    price: 799,
    image: "https://images.unsplash.com/photo-1611652022419-c4b13b1a76c2?w=400&h=400&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1611652022419-c4b13b1a76c2?w=400&h=400&fit=crop&sat=1.5",
    rating: 4.3,
    reviews: 41,
  },
];

function CartItemSkeleton() {
  return (
    <Card className="p-4">
      <div className="flex gap-4">
        <Skeleton className="w-20 h-20 md:w-24 md:h-24 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </div>
    </Card>
  );
}

function CartItemCard({ item, onUpdateQuantity, onRemove, onWishlist }: {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  onWishlist: (id: number) => void;
}) {
  const router = useRouter();
  const discount = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-3 md:p-4">
        <div className="flex gap-3 md:gap-4">
          {/* Product Image */}
          <div 
            className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted cursor-pointer group"
            onClick={() => router.push(`/product/${item.id}`)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {discount > 0 && (
              <Badge className="absolute top-1 left-1 bg-red-500 text-white text-[10px] px-1 py-0">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1 min-w-0">
                <h3 
                  className="font-semibold text-xs md:text-base line-clamp-2 cursor-pointer hover:text-primary transition-colors leading-tight"
                  onClick={() => router.push(`/product/${item.id}`)}
                >
                  {item.name}
                </h3>
                <p className="text-[10px] md:text-xs text-muted-foreground mb-1">
                  by {item.artisan} • {item.category}
                </p>
                
                {/* Variants */}
                {item.variant && (
                  <div className="flex gap-1 md:gap-2 mb-1">
                    {item.variant.size && (
                      <Badge variant="outline" className="text-[8px] md:text-[10px] px-1 md:px-1.5 py-0 md:py-0.5 h-4 md:h-auto">
                        {item.variant.size}
                      </Badge>
                    )}
                    {item.variant.color && (
                      <Badge variant="outline" className="text-[8px] md:text-[10px] px-1 md:px-1.5 py-0 md:py-0.5 h-4 md:h-auto">
                        {item.variant.color}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Rating & Stock */}
                <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                  <div className="flex items-center gap-0.5 md:gap-1">
                    <Star className="h-2.5 w-2.5 md:h-3 md:w-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-[10px] md:text-xs text-muted-foreground">
                      {item.rating} ({item.reviews})
                    </span>
                  </div>
                  <span className="text-[10px] md:text-xs text-muted-foreground">•</span>
                  <span className={`text-[10px] md:text-xs ${item.inStock > 5 ? 'text-green-600' : 'text-orange-600'}`}>
                    {item.inStock > 5 ? 'In Stock' : `Only ${item.inStock} left`}
                  </span>
                </div>
              </div>

              {/* Actions - Desktop */}
              <div className="hidden md:flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onWishlist(item.id)}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => onRemove(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Price & Quantity Controls */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 md:gap-2">
                <span className="text-xs md:text-base font-bold text-primary">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </span>
                {item.originalPrice && (
                  <span className="text-[10px] md:text-xs text-muted-foreground line-through">
                    ₹{(item.originalPrice * item.quantity).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-1 md:gap-2">
                {/* Mobile Actions */}
                <div className="flex md:hidden items-center gap-0.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => onWishlist(item.id)}
                  >
                    <Heart className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive hover:text-destructive"
                    onClick={() => onRemove(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 md:h-8 md:w-8 hover:bg-muted"
                    onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  </Button>
                  <span className="px-2 md:px-3 py-1 text-xs md:text-sm font-medium min-w-[28px] md:min-w-[40px] text-center">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 md:h-8 md:w-8 hover:bg-muted"
                    onClick={() => onUpdateQuantity(item.id, Math.min(item.inStock, item.quantity + 1))}
                    disabled={item.quantity >= item.inStock}
                  >
                    <Plus className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RecommendedProduct({ product, onAddToCart }: {
  product: RecommendedProduct;
  onAddToCart: (id: number) => void;
}) {
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
      className="overflow-hidden group hover:shadow-xl transition-all duration-300 border hover:border-primary/30 p-0 cursor-pointer flex-shrink-0 w-48 md:w-56"
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
          {product.isNew && (
            <Badge className="bg-primary hover:bg-primary/90 text-white font-semibold text-[10px] md:text-xs px-1.5 py-0.5">
              New
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
        <h3 className="font-semibold text-xs md:text-sm line-clamp-2 group-hover:text-primary transition-colors leading-tight">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
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
        <div className="flex items-center gap-1.5">
          <span className="text-sm md:text-base font-bold text-primary">
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
      <CardContent className="p-2 pt-0">
        <Button
          className="w-full rounded-full group/btn bg-primary hover:bg-primary/90 text-[10px] md:text-xs h-7 md:h-8"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product.id);
          }}
        >
          <ShoppingCart className="mr-1 h-3 w-3 group-hover/btn:animate-bounce" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [recommendedScrollPosition, setRecommendedScrollPosition] = useState(0);
  const recommendedScrollRef = useRef<HTMLDivElement>(null);

  // Load cart data
  useEffect(() => {
    const timer = setTimeout(() => {
      setCartItems(mockCartItems);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + ((item.originalPrice - item.price) * item.quantity);
    }
    return sum;
  }, 0);
  const shipping = subtotal >= 1000 ? 0 : 99;
  const promoDiscountAmount = (subtotal * promoDiscount) / 100;
  const total = subtotal - promoDiscountAmount + shipping;

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleMoveToWishlist = (id: number) => {
    console.log("Move to wishlist:", id);
    // Implement wishlist functionality
  };

  const handleApplyPromo = () => {
    // Simple promo code logic - in real app, this would be an API call
    const promoCodes = {
      "WELCOME10": 10,
      "SAVE20": 20,
      "NEWUSER": 15,
    };

    if (promoCodes[promoCode as keyof typeof promoCodes]) {
      setPromoDiscount(promoCodes[promoCode as keyof typeof promoCodes]);
      setIsPromoApplied(true);
    } else {
      alert("Invalid promo code");
    }
  };

  const handleRemovePromo = () => {
    setPromoCode("");
    setPromoDiscount(0);
    setIsPromoApplied(false);
  };

  const handleAddRecommendedToCart = (id: number) => {
    console.log("Add recommended product to cart:", id);
    // Implement add to cart functionality
  };

  const scrollRecommended = (direction: 'left' | 'right') => {
    if (recommendedScrollRef.current) {
      const scrollAmount = 200; // Adjust scroll distance
      const currentScroll = recommendedScrollRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      recommendedScrollRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
      
      setRecommendedScrollPosition(newScroll);
    }
  };

  const canScrollLeft = recommendedScrollPosition > 0;
  const canScrollRight = recommendedScrollRef.current 
    ? recommendedScrollPosition < (recommendedScrollRef.current.scrollWidth - recommendedScrollRef.current.clientWidth)
    : true;

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-4 md:py-8">
            <div className="flex items-center gap-2 mb-6">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-8 w-32" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <CartItemSkeleton key={index} />
                ))}
              </div>
              <div className="space-y-4">
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-48 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12 md:py-16">
              <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-muted rounded-full flex items-center justify-center">
                <ShoppingBag className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground" />
              </div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">Your cart is empty</h1>
              <p className="text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto text-sm md:text-base px-4">
                Looks like you haven&apos;t added any items to your cart yet. 
                Start exploring our beautiful handcrafted products!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
                <Button onClick={() => router.push("/shop")} size="lg" className="w-full sm:w-auto">
                  <ShoppingCart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Continue Shopping
                </Button>
                <Button variant="outline" onClick={() => router.push("/")} size="lg" className="w-full sm:w-auto">
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-4">
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
                  Shopping Cart
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
                </p>
              </div>
            </div>

            {/* Continue Shopping - Desktop */}
            <Button
              variant="outline"
              onClick={() => router.push("/shop")}
              className="hidden md:flex"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                    onWishlist={handleMoveToWishlist}
                  />
                ))}
              </div>

              {/* Promo Code - Mobile */}
              <Card className="mt-4 md:mt-6 lg:hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base md:text-lg flex items-center gap-2">
                    <Tag className="h-4 w-4 md:h-5 md:w-5" />
                    Promo Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4">
                  {!isPromoApplied ? (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        className="flex-1 text-sm"
                      />
                      <Button 
                        onClick={handleApplyPromo}
                        disabled={!promoCode.trim()}
                        size="sm"
                        className="text-xs"
                      >
                        Apply
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800 dark:text-green-200">
                          {promoCode} applied
                        </span>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          -{promoDiscount}%
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleRemovePromo}
                        className="h-6 w-6 text-green-600 hover:text-green-800"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    Try: WELCOME10, SAVE20, NEWUSER
                  </div>
                </CardContent>
              </Card>

              {/* Continue Shopping - Mobile */}
              <Button
                variant="outline"
                onClick={() => router.push("/shop")}
                className="w-full mt-4 lg:hidden"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
                              {/* Promo Code - Desktop */}
              <Card className="hidden lg:block py-4">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Promo Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!isPromoApplied ? (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleApplyPromo}
                        disabled={!promoCode.trim()}
                      >
                        Apply
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800 dark:text-green-200">
                          {promoCode} applied
                        </span>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          -{promoDiscount}%
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleRemovePromo}
                        className="h-6 w-6 text-green-600 hover:text-green-800"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    Try: WELCOME10, SAVE20, NEWUSER
                  </div>
                </CardContent>
              </Card>
              {/* Order Summary */}
              <Card className="sticky top-24 py-4">
                <CardHeader className="pb-1 md:pb-1">
                  <CardTitle className="text-base md:text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4">
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex justify-between text-xs md:text-sm">
                      <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    
                    {savings > 0 && (
                      <div className="flex justify-between text-xs md:text-sm text-green-600">
                        <span>You save</span>
                        <span>-₹{savings.toLocaleString()}</span>
                      </div>
                    )}
                    
                    {promoDiscountAmount > 0 && (
                      <div className="flex justify-between text-xs md:text-sm text-green-600">
                        <span>Promo discount ({promoDiscount}%)</span>
                        <span>-₹{promoDiscountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-xs md:text-sm">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? "text-green-600" : ""}>
                        {shipping === 0 ? "FREE" : `₹${shipping}`}
                      </span>
                    </div>
                    
                    {shipping > 0 && (
                      <div className="text-[10px] md:text-xs text-muted-foreground">
                        Add ₹{(1000 - subtotal).toLocaleString()} more for free shipping
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-2 md:pt-3">
                    <div className="flex justify-between font-semibold text-base md:text-lg">
                      <span>Total</span>
                      <span className="text-primary">₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full text-sm md:text-base" 
                    size="lg"
                    onClick={() => router.push("/checkout")}
                  >
                    <CreditCard className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Proceed to Checkout
                  </Button>

                  {/* Trust Badges */}
                  <div className="flex justify-center gap-3 md:gap-4 pt-3 md:pt-4 border-t">
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-muted-foreground">
                      <Shield className="h-2.5 w-2.5 md:h-3 md:w-3" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-muted-foreground">
                      <Truck className="h-2.5 w-2.5 md:h-3 md:w-3" />
                      <span>Fast Delivery</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-muted-foreground">
                      <Gift className="h-2.5 w-2.5 md:h-3 md:w-3" />
                      <span>Gift Wrap</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Recommended Products */}
          <div className="mt-8">
            <Card>
              <CardHeader className="pb-3 md:pb-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base md:text-lg">You might also like</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => scrollRecommended('left')}
                      disabled={!canScrollLeft}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => scrollRecommended('right')}
                      disabled={!canScrollRight}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  ref={recommendedScrollRef}
                  className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-2"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  onScroll={(e) => setRecommendedScrollPosition(e.currentTarget.scrollLeft)}
                >
                  {mockRecommendedProducts.map((product) => (
                    <RecommendedProduct
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddRecommendedToCart}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}