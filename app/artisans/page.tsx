"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Package, ArrowRight, Heart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "../myCopmonent/Header";
import Footer from "../myCopmonent/Footer";

interface Artisan {
  id: string;
  name: string;
  location: string;
  specialty: string;
  category: string;
  bio: string;
  rating: number;
  reviews: number;
  productsCount: number;
  verified: boolean;
  image: string;
  coverImage: string;
  joinedYear: number;
  featured: boolean;
}

// Mock artisan data
const artisans: Artisan[] = [
  {
    id: "1",
    name: "Priya Sharma",
    location: "Jaipur, Rajasthan",
    specialty: "Traditional Mandala Artist",
    category: "Mandala Art",
    bio: "Creating intricate mandala art for over 15 years, blending traditional techniques with modern designs.",
    rating: 4.9,
    reviews: 156,
    productsCount: 48,
    verified: true,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=300&fit=crop",
    joinedYear: 2019,
    featured: true,
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    location: "Kolkata, West Bengal",
    specialty: "Master Jewellery Craftsman",
    category: "Handmade Jewellery",
    bio: "Specializing in terracotta and clay jewelry with contemporary designs inspired by Bengali culture.",
    rating: 4.8,
    reviews: 203,
    productsCount: 92,
    verified: true,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=300&fit=crop",
    joinedYear: 2018,
    featured: true,
  },
  {
    id: "3",
    name: "Meera Patel",
    location: "Ahmedabad, Gujarat",
    specialty: "Mirror Work Specialist",
    category: "Mirror Arts",
    bio: "Fourth-generation artisan keeping the traditional Gujarati mirror work alive with modern applications.",
    rating: 4.9,
    reviews: 178,
    productsCount: 67,
    verified: true,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&h=300&fit=crop",
    joinedYear: 2020,
    featured: true,
  },
  {
    id: "4",
    name: "Lakshmi Devi",
    location: "Chennai, Tamil Nadu",
    specialty: "Crochet & Textile Artist",
    category: "Crochet",
    bio: "Crafting beautiful crochet pieces using traditional South Indian patterns and eco-friendly materials.",
    rating: 4.7,
    reviews: 134,
    productsCount: 55,
    verified: true,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&h=300&fit=crop",
    joinedYear: 2021,
    featured: false,
  },
  {
    id: "5",
    name: "Arjun Singh",
    location: "Lucknow, Uttar Pradesh",
    specialty: "Chikankari Embroidery Expert",
    category: "Embroidery",
    bio: "Preserving the delicate art of Chikankari embroidery through contemporary fashion and home decor.",
    rating: 4.8,
    reviews: 189,
    productsCount: 73,
    verified: true,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1601924638867-2a5e6c5d6c6f?w=800&h=300&fit=crop",
    joinedYear: 2019,
    featured: true,
  },
  {
    id: "6",
    name: "Kavita Reddy",
    location: "Bangalore, Karnataka",
    specialty: "Fluid Art Creator",
    category: "Fluid Art",
    bio: "Modern fluid art techniques combined with traditional Indian color palettes for unique masterpieces.",
    rating: 4.9,
    reviews: 142,
    productsCount: 41,
    verified: true,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=300&fit=crop",
    joinedYear: 2020,
    featured: false,
  },
  {
    id: "7",
    name: "Amit Verma",
    location: "Pune, Maharashtra",
    specialty: "Natural Candle Maker",
    category: "Aroma Sanctuaries",
    bio: "Hand-poured soy candles with essential oils, creating aromatic experiences inspired by nature.",
    rating: 4.6,
    reviews: 98,
    productsCount: 36,
    verified: true,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1602874801006-c2b14c17b0b3?w=800&h=300&fit=crop",
    joinedYear: 2021,
    featured: false,
  },
  {
    id: "8",
    name: "Sunita Joshi",
    location: "Mumbai, Maharashtra",
    specialty: "Mixed Media Artist",
    category: "Mandala Art",
    bio: "Combining mandala patterns with mixed media techniques for contemporary wall art and decor.",
    rating: 4.7,
    reviews: 121,
    productsCount: 52,
    verified: true,
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=300&fit=crop",
    joinedYear: 2020,
    featured: false,
  },
];

const categories = [
  "All Categories",
  "Mandala Art",
  "Handmade Jewellery",
  "Mirror Arts",
  "Crochet",
  "Embroidery",
  "Fluid Art",
  "Aroma Sanctuaries",
];

function ArtisanCard({ artisan }: { artisan: Artisan }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border hover:border-primary/30 p-0">
      {/* Cover Image */}
      <div className="relative h-24 md:h-32 overflow-hidden bg-gradient-to-r from-primary/20 to-accent/20">
        <img
          src={artisan.coverImage}
          alt={`${artisan.name} cover`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {artisan.featured && (
          <Badge className="absolute top-2 right-2 bg-primary text-white text-[10px]">
            Featured
          </Badge>
        )}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-2 left-2 h-7 w-7 rounded-full bg-white/90 hover:bg-white"
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
        >
          <Heart
            className={`h-3 w-3 ${
              isWishlisted ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </Button>
      </div>

      {/* Profile Section */}
      <CardContent className="p-3 md:p-4 -mt-10 md:-mt-12 relative">
        <div className="flex gap-3">
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-background overflow-hidden bg-muted">
              <img
                src={artisan.image}
                alt={artisan.name}
                className="w-full h-full object-cover"
              />
            </div>
            {artisan.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                <i className="ri-verified-badge-fill text-white text-xs"></i>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 pt-8 md:pt-10">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm md:text-base text-foreground truncate">
                  {artisan.name}
                </h3>
                <p className="text-[10px] md:text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3" />
                  {artisan.location}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Specialty & Bio */}
        <div className="mt-3 space-y-2">
          <Badge variant="secondary" className="text-[10px] md:text-xs">
            {artisan.specialty}
          </Badge>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {artisan.bio}
          </p>
        </div>

        {/* Stats */}
        <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span className="font-semibold">{artisan.rating}</span>
            <span className="text-muted-foreground">({artisan.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Package className="h-3 w-3" />
            <span>{artisan.productsCount} Products</span>
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-3 md:p-4 pt-0 flex gap-2">
        <Button
          asChild
          className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-xs md:text-sm h-8 md:h-9"
        >
          <Link href={`/artisans/${artisan.id}`}>
            View Profile
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="flex-1 rounded-full text-xs md:text-sm h-8 md:h-9"
        >
          <Link href={`/shop?artisan=${artisan.id}`}>
            Browse Shop
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function ArtisansPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("featured");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isSellerView, setIsSellerView] = useState(false);

  // Check if user is a seller on mount
  useEffect(() => {
    const checkSellerAuth = () => {
      const isSellerLoggedIn = localStorage.getItem("isSellerLoggedIn");
      
      if (isSellerLoggedIn === "true") {
        setIsSellerView(true);
      }
      
      setIsCheckingAuth(false);
    };

    checkSellerAuth();
  }, []);

  const handleSellerLogout = () => {
    localStorage.removeItem("seller");
    localStorage.removeItem("isSellerLoggedIn");
    setIsSellerView(false);
    router.push("/auth/seller-login");
  };

  // Filter artisans by category
  const filteredArtisans = artisans.filter((artisan) =>
    selectedCategory === "All Categories"
      ? true
      : artisan.category === selectedCategory
  );

  // Sort artisans
  const sortedArtisans = [...filteredArtisans].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "products":
        return b.productsCount - a.productsCount;
      case "newest":
        return b.joinedYear - a.joinedYear;
      case "featured":
      default:
        return b.featured === a.featured ? 0 : b.featured ? 1 : -1;
    }
  });

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-background">


      {/* Hero Section */}
      <section className="relative py-8 md:py-12 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20">
              Our Artisans
            </Badge>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              <span className="bg-gradient-to-r from-primary via-ring to-accent bg-clip-text text-transparent">
                Meet the Creative Minds
              </span>
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto">
              Discover talented artisans from across India, each bringing their
              unique skills and passion to create beautiful handcrafted products.
              {!isSellerView && (
                <>
                  {" "}
                  <Link href="/auth/seller-login" className="text-primary hover:underline font-semibold">
                    Join as a seller
                  </Link>
                </>
              )}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-6 md:mt-8">
            <div className="text-center p-3 md:p-4 rounded-lg bg-background/50 border">
              <p className="text-xl md:text-2xl font-bold text-primary">50+</p>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-1">
                Artisans
              </p>
            </div>
            <div className="text-center p-3 md:p-4 rounded-lg bg-background/50 border">
              <p className="text-xl md:text-2xl font-bold text-primary">500+</p>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-1">
                Products
              </p>
            </div>
            <div className="text-center p-3 md:p-4 rounded-lg bg-background/50 border">
              <p className="text-xl md:text-2xl font-bold text-primary">4.8</p>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-1">
                Avg Rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Sort */}
      <section className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b py-3 md:py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
            {/* Category Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 sm:pb-0 w-full sm:w-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full text-xs whitespace-nowrap flex-shrink-0 ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                Sort by:
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[140px] text-xs h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="products">Most Products</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Artisans Grid */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <p className="text-xs md:text-sm text-muted-foreground">
              Showing {sortedArtisans.length} artisan
              {sortedArtisans.length !== 1 ? "s" : ""}
              {selectedCategory !== "All Categories" &&
                ` in ${selectedCategory}`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {sortedArtisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>

          {/* No Results */}
          {sortedArtisans.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No artisans found in this category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-8 md:py-12 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h2 className="text-xl md:text-2xl font-bold">
              Want to Join Our Artisan Community?
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              If you&apos;re a skilled artisan looking to showcase your work, we&apos;d
              love to hear from you!
            </p>
            <Button className="rounded-full bg-primary hover:bg-primary/90">
              Apply as Artisan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
    <Footer/>
    </>
  );
}
