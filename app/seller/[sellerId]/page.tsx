"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Heart, 
  ShoppingCart, 
  Eye, 
  Star, 
  SlidersHorizontal, 
  X, 
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  Globe,
  Award,
  Users,
  Package,
  ArrowLeft,
  MessageCircle,
  Share2,
  Clock
} from "lucide-react";
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
import Header from "../../myCopmonent/Header";

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
  sellerId: string;
  sellerName: string;
}

interface Seller {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  businessType: string;
  address: string;
  avatar: string;
  coverImage: string;
  description: string;
  establishedYear: number;
  rating: number;
  totalProducts: number;
  totalOrders: number;
  responseTime: string;
  badges: string[];
  socialLinks: {
    website?: string;
    instagram?: string;
    facebook?: string;
  };
}

// Mock seller data
const mockSellers: { [key: string]: Seller } = {
  "maya-crafts": {
    id: "maya-crafts",
    businessName: "Maya Crafts",
    ownerName: "Maya Sharma",
    email: "maya@mayacrafts.com",
    phone: "+91 98765 43210",
    businessType: "Handmade Jewellery",
    address: "Jaipur, Rajasthan, India",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=200&h=200&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop",
    description: "Creating beautiful handcrafted jewelry for over 15 years. Specializing in traditional Indian designs with modern aesthetics. Each piece is carefully crafted with love and attention to detail.",
    establishedYear: 2008,
    rating: 4.8,
    totalProducts: 45,
    totalOrders: 1250,
    responseTime: "Usually responds within 2 hours",
    badges: ["Top Seller", "Fast Shipping", "Eco-Friendly"],
    socialLinks: {
      website: "https://mayacrafts.com",
      instagram: "@mayacrafts",
      facebook: "MayaCraftsOfficial"
    }
  },
  "silk-stories": {
    id: "silk-stories",
    businessName: "Silk Stories",
    ownerName: "Priya Patel",
    email: "priya@silkstories.com",
    phone: "+91 87654 32109",
    businessType: "Embroidery",
    address: "Ahmedabad, Gujarat, India",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=400&fit=crop",
    description: "Master embroiderer creating exquisite silk products. From sarees to home decor, each piece tells a story through intricate threadwork and traditional techniques passed down through generations.",
    establishedYear: 2012,
    rating: 4.9,
    totalProducts: 32,
    totalOrders: 890,
    responseTime: "Usually responds within 1 hour",
    badges: ["Master Craftsperson", "Heritage Keeper", "Quality Assured"],
    socialLinks: {
      website: "https://silkstories.in",
      instagram: "@silkstories",
    }
  },
  "serenity-scents": {
    id: "serenity-scents",
    businessName: "Serenity Scents",
    ownerName: "Arjun Mehta",
    email: "arjun@serenityscents.com",
    phone: "+91 76543 21098",
    businessType: "Aroma Sanctuaries",
    address: "Rishikesh, Uttarakhand, India",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200&h=400&fit=crop",
    description: "Creating natural, handmade candles and aromatherapy products using organic ingredients. Inspired by the tranquil mountains of Rishikesh, each product brings peace and serenity to your space.",
    establishedYear: 2015,
    rating: 4.7,
    totalProducts: 28,
    totalOrders: 650,
    responseTime: "Usually responds within 3 hours",
    badges: ["Natural Products", "Sustainable", "Aromatherapy Expert"],
    socialLinks: {
      website: "https://serenityscents.com",
      instagram: "@serenityscents",
      facebook: "SerenityScentsIndia"
    }
  }
};

// Generate mock products for specific sellers
const generateSellerProducts = (sellerId: string, sellerName: string): Product[] => {
  const sellerData = mockSellers[sellerId];
  if (!sellerData) return [];

  const productsByCategory: { [key: string]: string[] } = {
    "Handmade Jewellery": [
      "Sacred Mandala Necklace", "Turquoise Stone Earrings", "Silver Beaded Bracelet",
      "Traditional Kundan Set", "Oxidized Silver Ring", "Pearl Drop Earrings",
      "Antique Gold Pendant", "Gemstone Statement Necklace", "Handwoven Choker"
    ],
    "Embroidery": [
      "Silk Embroidered Scarf", "Hand-stitched Cushion Cover", "Traditional Wall Hanging",
      "Embroidered Table Runner", "Silk Dupatta", "Decorative Pillowcase",
      "Hand-embroidered Blouse", "Traditional Bedsheet Set", "Embroidered Handbag"
    ],
    "Aroma Sanctuaries": [
      "Lavender Soy Candle", "Sandalwood Incense Set", "Rose Essential Oil",
      "Aromatherapy Diffuser Blend", "Jasmine Scented Candle", "Eucalyptus Reed Diffuser",
      "Meditation Candle Set", "Natural Room Spray", "Herbal Bath Salts"
    ]
  };

  const categoryProducts = productsByCategory[sellerData.businessType] || ["Handcrafted Item"];
  const products: Product[] = [];

  for (let i = 1; i <= sellerData.totalProducts; i++) {
    const basePrice = Math.floor(Math.random() * 3000) + 500;
    const hasDiscount = Math.random() > 0.6;
    
    products.push({
      id: parseInt(`${sellerId.replace(/[^0-9]/g, '')}${i.toString().padStart(3, '0')}`),
      name: `${categoryProducts[i % categoryProducts.length]} ${i}`,
      category: sellerData.businessType,
      price: basePrice,
      originalPrice: hasDiscount ? basePrice + Math.floor(Math.random() * 1000) + 200 : undefined,
      rating: parseFloat((Math.random() * 1 + 4).toFixed(1)), // Higher ratings for seller products
      reviews: Math.floor(Math.random() * 40) + 10,
      image: `https://images.unsplash.com/photo-${1599643478518 + i}?w=400&h=400&fit=crop`,
      imageHover: `https://images.unsplash.com/photo-${1611652022419 + i}?w=400&h=400&fit=crop`,
      badge: hasDiscount ? "Sale" : Math.random() > 0.8 ? "New" : undefined,
      isNew: Math.random() > 0.8,
      sellerId: sellerId,
      sellerName: sellerName
    });
  }
  return products;
};

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

function SellerHeaderSkeleton() {
  return (
    <div className="relative">
      <Skeleton className="w-full h-32 md:h-48 lg:h-64" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-end gap-4">
          <Skeleton className="w-16 h-16 md:w-20 md:h-20 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 md:h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </div>
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

function SellerHeader({ seller }: { seller: Seller }) {
  const router = useRouter();
  
  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="relative h-32 md:h-48 lg:h-64 overflow-hidden">
        <img
          src={seller.coverImage}
          alt={`${seller.businessName} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
        </Button>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Seller Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-2 md:p-6">
        <div className="flex items-end gap-2 md:gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 md:border-4 border-white overflow-hidden bg-white flex-shrink-0">
            <img
              src={seller.avatar}
              alt={seller.ownerName}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Info */}
          <div className="flex-1 text-white min-w-0">
            <h1 className="text-sm md:text-2xl lg:text-3xl font-bold mb-0.5 md:mb-1 leading-tight">
              {seller.businessName}
            </h1>
            <p className="text-xs md:text-base opacity-90 mb-1 md:mb-2 truncate">
              by {seller.ownerName} • {seller.businessType}
            </p>
            
            {/* Stats */}
            <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-sm">
              <div className="flex items-center gap-0.5 md:gap-1">
                <Star className="h-2.5 w-2.5 md:h-4 md:w-4 fill-yellow-500 text-yellow-500" />
                <span className="font-medium">{seller.rating}</span>
              </div>
              <div className="flex items-center gap-0.5 md:gap-1">
                <Package className="h-2.5 w-2.5 md:h-4 md:w-4" />
                <span>{seller.totalProducts}</span>
              </div>
              <div className="flex items-center gap-0.5 md:gap-1">
                <Users className="h-2.5 w-2.5 md:h-4 md:w-4" />
                <span>{seller.totalOrders}+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SellerDetails({ seller }: { seller: Seller }) {
  return (
    <Card className="mb-4 md:mb-6">
      <CardContent className="p-3 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* About */}
          <div className="lg:col-span-2">
            <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">About {seller.businessName}</h3>
            <p className="text-muted-foreground text-xs md:text-base leading-relaxed mb-3 md:mb-4">
              {seller.description}
            </p>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
              {seller.badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5">
                  <Award className="h-2.5 w-2.5 md:h-3 md:w-3 mr-0.5 md:mr-1" />
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Social Links */}
            {(seller.socialLinks.website || seller.socialLinks.instagram || seller.socialLinks.facebook) && (
              <div>
                <h4 className="font-medium mb-2 text-sm md:text-base">Connect with us</h4>
                <div className="flex gap-2 md:gap-3 flex-wrap">
                  {seller.socialLinks.website && (
                    <Button variant="outline" size="sm" className="text-[10px] md:text-sm h-7 md:h-8 px-2 md:px-3" asChild>
                      <a href={seller.socialLinks.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-2.5 w-2.5 md:h-3 md:w-3 mr-1" />
                        Website
                      </a>
                    </Button>
                  )}
                  {seller.socialLinks.instagram && (
                    <Button variant="outline" size="sm" className="text-[10px] md:text-sm h-7 md:h-8 px-2 md:px-3" asChild>
                      <a href={`https://instagram.com/${seller.socialLinks.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                        📷 Instagram
                      </a>
                    </Button>
                  )}
                  {seller.socialLinks.facebook && (
                    <Button variant="outline" size="sm" className="text-[10px] md:text-sm h-7 md:h-8 px-2 md:px-3" asChild>
                      <a href={`https://facebook.com/${seller.socialLinks.facebook}`} target="_blank" rel="noopener noreferrer">
                        📘 Facebook
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Contact & Details */}
          <div className="space-y-3 md:space-y-4">
            <div>
              <h4 className="font-medium mb-2 md:mb-3 text-sm md:text-base">Seller Information</h4>
              <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
                  <span className="break-words">{seller.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
                  <span>{seller.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
                  <span className="break-all text-[10px] md:text-sm">{seller.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-[10px] md:text-sm leading-tight">{seller.responseTime}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 md:mb-3 text-sm md:text-base">Business Details</h4>
              <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                <div>
                  <span className="text-muted-foreground">Established:</span>
                  <span className="ml-2 font-medium">{seller.establishedYear}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Speciality:</span>
                  <span className="ml-2 font-medium text-[10px] md:text-sm">{seller.businessType}</span>
                </div>
              </div>
            </div>

            <Button className="w-full text-[10px] md:text-sm h-8 md:h-10" size="lg">
              <MessageCircle className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              Contact Seller
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SellerShopPage() {
  const router = useRouter();
  const params = useParams();
  const sellerId = params.sellerId as string;
  
  const [seller, setSeller] = useState<Seller | null>(null);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Filters
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("featured");
  
  const observerTarget = useRef<HTMLDivElement>(null);

  // Load seller and products data
  useEffect(() => {
    const timer = setTimeout(() => {
      const sellerData = mockSellers[sellerId];
      if (sellerData) {
        setSeller(sellerData);
        const products = generateSellerProducts(sellerId, sellerData.businessName);
        setDisplayedProducts(products.slice(0, 16));
        setHasMore(products.length > 16);
      } else {
        // Redirect to 404 or shop page if seller not found
        router.push('/shop');
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [sellerId, router]);

  // Filter and sort products
  const getFilteredProducts = useCallback(() => {
    if (!seller) return [];
    
    let allProducts = generateSellerProducts(sellerId, seller.businessName);

    // Filter by price range
    allProducts = allProducts.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter by rating
    allProducts = allProducts.filter(p => p.rating >= minRating);

    // Sort
    switch (sortBy) {
      case "price-low":
        allProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        allProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        allProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        allProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Featured - keep original order
        break;
    }

    return allProducts;
  }, [seller, sellerId, priceRange, minRating, sortBy]);

  // Update products when filters change
  useEffect(() => {
    if (!seller) return;
    
    const filtered = getFilteredProducts();
    setDisplayedProducts(filtered.slice(0, 16));
    setHasMore(filtered.length > 16);
    setPage(1);
  }, [seller, priceRange, minRating, sortBy, getFilteredProducts]);

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

  const clearFilters = () => {
    setPriceRange([0, 5000]);
    setMinRating(0);
  };

  const activeFilterCount = 
    (priceRange[0] !== 0 || priceRange[1] !== 5000 ? 1 : 0) + 
    (minRating > 0 ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6 p-4">
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

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background">
          <SellerHeaderSkeleton />
          <div className="container mx-auto px-4 py-4 md:py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!seller) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Seller Not Found</h1>
            <p className="text-muted-foreground mb-4">The seller you're looking for doesn't exist.</p>
            <Button onClick={() => router.push('/shop')}>
              Back to Shop
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Seller Header */}
        <SellerHeader seller={seller} />
        
        <div className="container mx-auto px-2 md:px-4 py-3 md:py-8">
          {/* Seller Details */}
          <SellerDetails seller={seller} />

          {/* Products Section */}
          <div className="flex flex-row items-center justify-between mb-3 md:mb-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-base md:text-xl lg:text-2xl font-bold mb-1 md:mb-2 leading-tight">
                Products by {seller.businessName}
              </h2>
              <p className="text-[10px] md:text-sm text-muted-foreground">
                Showing {displayedProducts.length} of {getFilteredProducts().length} products
              </p>
            </div>

            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[120px] md:w-[180px] text-[10px] md:text-sm h-8 md:h-10">
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
          <div className="flex items-center justify-between mb-3 md:mb-6 gap-2 md:gap-3">
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden relative text-[10px] h-7 px-2">
                  <SlidersHorizontal className="h-3 w-3 mr-1" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge className="ml-1 h-4 w-4 p-0 flex items-center justify-center rounded-full bg-primary text-white text-[8px]">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] overflow-y-auto">
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
          <div className="flex gap-4 md:gap-8">
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
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Loading More Indicator */}
              {isLoadingMore && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6 mt-2 md:mt-4 lg:mt-6">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <ProductSkeleton key={`loading-${index}`} />
                  ))}
                </div>
              )}

              {/* Intersection Observer Target */}
              <div ref={observerTarget} className="h-10 mt-4" />

              {/* No More Products */}
              {!hasMore && displayedProducts.length > 0 && (
                <div className="text-center py-6 md:py-8 text-muted-foreground text-xs md:text-sm">
                  You've reached the end of {seller.businessName}'s products
                </div>
              )}

              {/* No Results */}
              {!isLoading && displayedProducts.length === 0 && (
                <div className="text-center py-12 md:py-16">
                  <p className="text-base md:text-lg font-semibold mb-2">No products found</p>
                  <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                    Try adjusting your filters
                  </p>
                  <Button onClick={clearFilters} variant="outline" size="sm">
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