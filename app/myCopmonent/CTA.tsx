"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  review: string;
  product: string;
  avatar: string;
  date: string;
  verified: boolean;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
    review: "Absolutely stunning mandala art! The intricate details and vibrant colors transformed my living room. The quality is exceptional and the artist's skill is evident in every stroke.",
    product: "Sacred Geometry Mandala",
    avatar: "PS",
    date: "2 days ago",
    verified: true,
  },
  {
    id: 2,
    name: "Arjun Patel",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    review: "The handmade jewelry exceeded my expectations. Each piece tells a story and the craftsmanship is remarkable. My wife loves her new silver earrings!",
    product: "Oxidized Silver Earrings",
    avatar: "AP",
    date: "5 days ago",
    verified: true,
  },
  {
    id: 3,
    name: "Meera Reddy",
    location: "Hyderabad, Telangana",
    rating: 5,
    review: "The mirror work art piece is breathtaking! It adds such elegance to our home. The packaging was perfect and delivery was quick. Highly recommend!",
    product: "Traditional Mirror Art",
    avatar: "MR",
    date: "1 week ago",
    verified: true,
  },
  {
    id: 4,
    name: "Rohit Kumar",
    location: "Jaipur, Rajasthan",
    rating: 5,
    review: "Bought this crochet wall hanging for my daughter's room. The soft textures and beautiful patterns make it a perfect addition. Great quality for the price!",
    product: "Boho Crochet Wall Hanging",
    avatar: "RK",
    date: "1 week ago",
    verified: true,
  },
  {
    id: 5,
    name: "Kavya Nair",
    location: "Kochi, Kerala",
    rating: 5,
    review: "The embroidered table runner is a masterpiece! The traditional Kerala motifs are beautifully executed. It's become the centerpiece of our dining room.",
    product: "Kerala Embroidered Runner",
    avatar: "KN",
    date: "2 weeks ago",
    verified: true,
  },
  {
    id: 6,
    name: "Vikram Singh",
    location: "Chandigarh, Punjab",
    rating: 5,
    review: "Amazing fluid art piece! The colors flow so naturally and it creates a calming atmosphere in my office. The artist is truly talented.",
    product: "Abstract Fluid Art Canvas",
    avatar: "VS",
    date: "2 weeks ago",
    verified: true,
  },
];

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ⭐
      </span>
    ));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-4 md:py-8 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-2 md:mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium mb-3">
            <span className="text-sm">💬</span>
            Customer Stories
          </div>
          <h2 className="text-sm md:text-xl lg:text-2xl font-bold text-foreground mb-2">
            What Our Customers
            <span className="block text-primary">Are Saying</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-4xl mx-auto leading-relaxed">
            Real experiences from art lovers who discovered their perfect handcrafted treasures
          </p>
        </div>

        {/* Reviews Slider Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Review Card */}
          <div 
            className="relative overflow-hidden "
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-1">
                  <Card className="p-2 bg-card/50 backdrop-blur-sm border hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Avatar and Info */}
                        <div className="flex flex-col items-center md:items-start space-y-2 md:min-w-[160px]">
                          {/* Avatar */}
                          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm md:text-base shadow-md">
                            {review.avatar}
                          </div>
                          
                          {/* Customer Info */}
                          <div className="text-center md:text-left space-y-0.5">
                            <div className="flex items-center gap-1.5 justify-center md:justify-start">
                              <h3 className="font-semibold text-foreground text-sm">
                                {review.name}
                              </h3>
                              {review.verified && (
                                <Badge variant="secondary" className="text-[10px] bg-green-100 text-green-700 hover:bg-green-100 px-1.5 py-0">
                                  ✓ Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {review.location}
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              {review.date}
                            </p>
                          </div>
                        </div>

                        {/* Review Content */}
                        <div className="flex-1 space-y-3">
                          {/* Rating */}
                          <div className="flex items-center gap-1.5">
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              ({review.rating}/5)
                            </span>
                          </div>

                          {/* Review Text */}
                          <blockquote className="text-foreground leading-relaxed text-sm md:text-base">
                            "{review.review}"
                          </blockquote>

                          {/* Product Info */}
                          <div className="flex items-center gap-1.5 pt-1">
                            <span className="text-xs text-muted-foreground">
                              Product:
                            </span>
                            <Badge variant="outline" className="text-primary border-primary/30 text-xs px-2 py-0">
                              {review.product}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary scale-125"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-3 max-w-xs mx-auto">
            <div className="h-0.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / reviews.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-1">
          <p className="text-muted-foreground mb-4 text-sm">
            Join thousands of satisfied customers who found their perfect handcraft
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/shop">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6">
                Shop Now
                <span className="ml-2">🛍️</span>
              </Button>
            </Link>
            <Link href="/reviews">
              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10 px-6">
                Read All Reviews
                <span className="ml-2">📝</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
