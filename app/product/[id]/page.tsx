"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Minus, 
  Plus, 
  Truck, 
  Shield, 
  RotateCcw, 
  Award,
  ArrowLeft,
  Share2,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Zap
} from "lucide-react";
import Header from "../../myCopmonent/Header";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "@/app/myCopmonent/Footer";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  materials: string[];
  dimensions: string;
  weight: string;
  artisan: {
    name: string;
    location: string;
    experience: string;
    avatar: string;
    rating: number;
    totalProducts: number;
  };
  images: string[];
  badge?: string;
  inStock: number;
  sold: number;
  specifications: Record<string, string>;
}

interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  images?: string[];
}

// Mock product data generator
const generateProductData = (id: string): Product => {
  const categories = ["Mandala Art", "Handmade Jewellery", "Mirror Arts", "Crochet", "Embroidery", "Fluid Art", "Aroma Sanctuaries"];
  const productNames = [
    "Sacred Mandala Necklace", "Terracotta Clay Earrings", "Mirror Work Clutch", 
    "Embroidered Silk Scarf", "Crochet Table Runner", "Lavender Aroma Candle Set",
    "Fluid Art Canvas", "Handwoven Dream Catcher", "Beaded Bracelet Set",
    "Hand-painted Vase", "Macrame Wall Hanging", "Ceramic Bowl Set"
  ];

  const numId = parseInt(id);
  const category = categories[numId % categories.length];
  const basePrice = Math.floor(Math.random() * 3000) + 500;
  const hasDiscount = Math.random() > 0.5;

  return {
    id: numId,
    name: `${productNames[numId % productNames.length]}`,
    category,
    price: basePrice,
    originalPrice: hasDiscount ? basePrice + Math.floor(Math.random() * 1000) + 200 : undefined,
    rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
    reviews: Math.floor(Math.random() * 150) + 20,
    description: "description",
    features: [
      "100% Handcrafted by master artisans",
      "Made with premium, sustainably sourced materials",
      "Unique design - no two pieces are identical",
      "Cultural heritage preservation through traditional techniques",
      "Eco-friendly production process",
      "Fair trade certified"
    ],
    materials: category === "Mandala Art" 
      ? ["Natural pigments", "Cotton canvas", "Gold leaf accents", "Organic varnish"]
      : category === "Handmade Jewellery"
      ? ["Sterling silver", "Semi-precious stones", "Natural pearls", "Handspun threads"]
      : category === "Crochet"
      ? ["Organic cotton yarn", "Bamboo fiber", "Natural dyes", "Silk threads"]
      : ["Natural materials", "Traditional pigments", "Sustainable fibers", "Organic elements"],
    dimensions: `${15 + numId % 20}cm x ${10 + numId % 15}cm x ${2 + numId % 5}cm`,
    weight: `${100 + numId % 500}g`,
    artisan: {
      name: ["Priya Sharma", "Rajesh Kumar", "Anita Patel", "Deepak Singh", "Meera Jain"][numId % 5],
      location: ["Rajasthan", "Gujarat", "Karnataka", "West Bengal", "Uttar Pradesh"][numId % 5],
      experience: `${5 + numId % 20} years`,
      avatar: `https://images.unsplash.com/photo-${1494790108755 + numId}?w=100&h=100&fit=crop&crop=face`,
      rating: parseFloat((Math.random() * 0.8 + 4.2).toFixed(1)),
      totalProducts: 15 + numId % 50
    },
    images: [
      `https://images.unsplash.com/photo-${1599643478518 + numId}?w=800&h=800&fit=crop`,
      `https://images.unsplash.com/photo-${1611652022419 + numId}?w=800&h=800&fit=crop`,
      `https://images.unsplash.com/photo-${1588436706487 + numId}?w=800&h=800&fit=crop`,
      `https://images.unsplash.com/photo-${1576398289164 + numId}?w=800&h=800&fit=crop`,
      `https://images.unsplash.com/photo-${1595951248543 + numId}?w=800&h=800&fit=crop`
    ],
    badge: hasDiscount ? "Sale" : Math.random() > 0.7 ? "New" : undefined,
    inStock: Math.floor(Math.random() * 50) + 5,
    sold: Math.floor(Math.random() * 200) + 10,
    specifications: {
      "Craft Type": category,
      "Origin": ["Rajasthan", "Gujarat", "Karnataka", "West Bengal", "Uttar Pradesh"][numId % 5],
      "Style": ["Traditional", "Contemporary", "Fusion", "Classic", "Modern"][numId % 5],
      "Finish": ["Handpainted", "Embossed", "Carved", "Woven", "Molded"][numId % 5],
      "Care Instructions": "Gentle hand wash with mild detergent. Air dry in shade.",
      "Authenticity": "Certified handmade product with artisan signature"
    }
  };
};

// Mock reviews data
const generateReviews = (productId: number): Review[] => {
  const reviewers = [
    { name: "Arjun Mehta", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    { name: "Sneha Gupta", avatar: "https://images.unsplash.com/photo-1494790108755-2f4289e68c38?w=100&h=100&fit=crop&crop=face" },
    { name: "Vikram Shah", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
    { name: "Kavya Nair", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
    { name: "Rohit Joshi", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" }
  ];

  const comments = [
    "Absolutely beautiful piece! The craftsmanship is exceptional and it looks even better in person. Highly recommended!",
    "Amazing quality and attention to detail. The artisan's skill really shows in this work. Very happy with my purchase.",
    "Love the authentic feel and cultural significance. Perfect addition to my collection. Fast shipping too!",
    "The colors are vibrant and the quality is top-notch. Exactly as described and pictured. Would buy again!",
    "Stunning artwork that gets compliments from everyone who sees it. Great value for the quality received."
  ];

  return Array.from({ length: Math.min(productId % 8 + 3, 10) }, (_, i) => ({
    id: i + 1,
    user: reviewers[i % reviewers.length].name,
    avatar: reviewers[i % reviewers.length].avatar,
    rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
    comment: comments[i % comments.length],
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    verified: Math.random() > 0.3,
    images: Math.random() > 0.7 ? [
      `https://images.unsplash.com/photo-${1588436706487 + i}?w=150&h=150&fit=crop`
    ] : undefined
  }));
};

function ProductPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery Skeleton */}
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-md" />
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-full" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-32" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
            
            <Skeleton className="h-32 w-full" />
            
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <div className="flex gap-3">
                <Skeleton className="h-12 flex-1" />
                <Skeleton className="h-12 w-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [mobileScrollIndex, setMobileScrollIndex] = useState(0);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const productData = generateProductData(productId);
      const reviewsData = generateReviews(parseInt(productId));
      setProduct(productData);
      setReviews(reviewsData);
      setIsLoading(false);
    }, 1000);
  }, [productId]);

  if (isLoading) {
    return <ProductPageSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => router.push("/shop")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <style jsx>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <button 
            onClick={() => router.push("/shop")} 
            className="hover:text-primary transition-colors"
          >
            Shop
          </button>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Mobile Horizontal Scroller */}
            <div className="lg:hidden">
              <div className="relative">
                <div 
                  className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory"
                  style={{ 
                    scrollbarWidth: 'none', 
                    msOverflowStyle: 'none',
                    WebkitScrollSnapType: 'x mandatory'
                  }}
                  onScroll={(e) => {
                    const container = e.target as HTMLElement;
                    const scrollLeft = container.scrollLeft;
                    const imageWidth = container.children[0]?.clientWidth || 0;
                    const gap = 12; // 12px gap
                    const newIndex = Math.round(scrollLeft / (imageWidth + gap));
                    setMobileScrollIndex(newIndex);
                  }}
                >
                  {product.images.map((image, index) => (
                    <div key={index} className="relative flex-shrink-0 w-full aspect-square bg-muted rounded-lg overflow-hidden snap-center">
                      <Image
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      
                      {/* Badges for first image only */}
                      {index === 0 && (
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {product.badge && (
                            <Badge
                              className={`${
                                product.badge === "Sale"
                                  ? "bg-red-500 hover:bg-red-600"
                                  : "bg-primary hover:bg-primary/90"
                              } text-white font-semibold`}
                            >
                              {product.badge}
                            </Badge>
                          )}
                          {discount > 0 && (
                            <Badge variant="secondary" className="bg-black/70 text-white">
                              -{discount}%
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Share Button for first image only */}
                      {index === 0 && (
                        <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200">
                          <Share2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Scroll Indicators */}
                <div className="flex justify-center gap-1 mt-3">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        const container = document.querySelector('.overflow-x-auto') as HTMLElement;
                        if (container) {
                          const imageWidth = container.children[0]?.clientWidth || 0;
                          const gap = 12; // 12px gap
                          container.scrollTo({
                            left: index * (imageWidth + gap),
                            behavior: 'smooth'
                          });
                        }
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === mobileScrollIndex 
                          ? "bg-primary" 
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Main Image with Thumbnails */}
            <div className="hidden lg:block space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden group">
                <Image
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.badge && (
                    <Badge
                      className={`${
                        product.badge === "Sale"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-primary hover:bg-primary/90"
                      } text-white font-semibold`}
                    >
                      {product.badge}
                    </Badge>
                  )}
                  {discount > 0 && (
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      -{discount}%
                    </Badge>
                  )}
                </div>

                {/* Share Button */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-md overflow-hidden border-2 transition-all duration-200 ${
                      selectedImageIndex === index
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <p className="text-sm text-primary font-medium uppercase tracking-wide">
                {product.category}
              </p>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>
              
              {/* Rating & Reviews */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-500 text-yellow-500"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
                <span className="text-sm text-green-600 font-medium">
                  {product.sold} sold
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description.split('\n')[0]}
            </p>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                product.inStock > 0 ? "bg-green-500" : "bg-red-500"
              }`} />
              <span className="text-sm font-medium">
                {product.inStock > 0 
                  ? `${product.inStock} in stock` 
                  : "Out of stock"
                }
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-muted transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.inStock, quantity + 1))}
                    className="p-2 hover:bg-muted transition-colors"
                    disabled={quantity >= product.inStock}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  className="flex-1 h-12 text-lg font-semibold"
                  disabled={product.inStock === 0}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isWishlisted ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>
              </div>

              {/* Buy Now Button */}
              <Button 
                variant="outline" 
                className="w-full h-12 text-lg font-semibold border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                disabled={product.inStock === 0}
              >
                <Zap className="h-5 w-5 mr-2" />
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free shipping over ₹500</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span>7-day return policy</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="h-5 w-5 text-primary" />
                <span>Authenticity guaranteed</span>
              </div>
            </div>
                    {/* Artisan Information */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Meet the Artisan</h2>
            <div className="flex items-start gap-4">
              <img
                src={product.artisan.avatar}
                alt={product.artisan.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{product.artisan.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {product.artisan.location} • {product.artisan.experience} of experience
                </p>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-sm font-medium">{product.artisan.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.artisan.totalProducts} products
                  </span>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
          </div>
        </div>



        {/* Product Details Tabs */}
        <div className="mb-12">
          <div className="border-b">
            <div className="flex gap-8">
              {["description", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                  {tab === "reviews" && ` (${reviews.length})`}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6">
            {activeTab === "description" && (
              <div className="space-y-6">
                <div className="prose max-w-none">
                  {product.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Key Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Materials Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.materials.map((material, index) => (
                      <Badge key={index} variant="secondary">
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Product Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dimensions:</span>
                      <span className="font-medium">{product.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight:</span>
                      <span className="font-medium">{product.weight}</span>
                    </div>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-muted-foreground">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {/* Reviews Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {product.rating}
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-500 text-yellow-500"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Based on {product.reviews} reviews
                    </p>
                  </div>
                  
                  <div className="col-span-2">
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = reviews.filter(r => r.rating === rating).length;
                        const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                        return (
                          <div key={rating} className="flex items-center gap-3">
                            <span className="text-sm w-8">{rating}★</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-yellow-500 transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-8">
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-start gap-4">
                        <img
                          src={review.avatar}
                          alt={review.user}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium">{review.user}</h4>
                            {review.verified && (
                              <Badge variant="outline" className="text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-yellow-500 text-yellow-500"
                                      : "fill-gray-200 text-gray-200"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed mb-3">
                            {review.comment}
                          </p>
                          {review.images && (
                            <div className="flex gap-2">
                              {review.images.map((image, index) => (
                                <Image
                                  key={index}
                                  src={image}
                                  alt={`Review image ${index + 1}`}
                                  width={64}
                                  height={64}
                                  className="object-cover rounded-md"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section - Placeholder */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300">
                <div className="aspect-square bg-muted relative">
                  <Image
                    src={`https://images.unsplash.com/photo-${1599643478518 + index + 10}?w=300&h=300&fit=crop`}
                    alt={`Related product ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm mb-1">Related Product {index + 1}</h3>
                  <p className="text-primary font-semibold">₹{(1500 + index * 300).toLocaleString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}