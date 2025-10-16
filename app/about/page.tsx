"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ChevronDown,
} from "lucide-react";
import Header from "../myCopmonent/Header";
import Footer from "../myCopmonent/Footer";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "What makes Inloom products special?",
    answer: "All our products are handcrafted by skilled artisans using traditional techniques passed down through generations. Each piece is unique and made with love, ensuring you receive a one-of-a-kind treasure that supports local craftspeople and preserves cultural heritage.",
  },
  {
    id: 2,
    question: "How long does shipping take?",
    answer: "We typically process orders within 2-3 business days. Domestic shipping takes 5-7 business days, while international orders may take 10-15 business days. You'll receive tracking information once your order ships.",
  },
  {
    id: 3,
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for all products. Items must be in original condition with tags attached. Handmade items may have slight variations which make them unique - this is not considered a defect. Contact our support team to initiate a return.",
  },
  {
    id: 4,
    question: "Do you offer custom orders?",
    answer: "Yes! We love creating custom pieces. Contact us with your requirements, including size, color preferences, and design ideas. Our artisans will work with you to create something special. Custom orders typically take 2-4 weeks depending on complexity.",
  },
  {
    id: 5,
    question: "How do I care for handmade products?",
    answer: "Each product comes with specific care instructions. Generally, handmade items should be handled gently, kept away from moisture, and stored properly. For textiles, hand wash or dry clean is recommended. For decorative items, dust gently with a soft cloth.",
  },
  {
    id: 6,
    question: "Are the products eco-friendly?",
    answer: "Absolutely! We prioritize sustainability by using natural, eco-friendly materials and traditional methods that have minimal environmental impact. Our packaging is also recyclable and biodegradable whenever possible.",
  },
  {
    id: 7,
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive an email with tracking information. You can also log into your account on our website to view order status and tracking details in real-time.",
  },
  {
    id: 8,
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. International customers are responsible for any customs duties or import taxes that may apply.",
  },
];

const teamMembers = [
  {
    name: "Priya Sharma",
    role: "Founder & Creative Director",
    description: "Passionate about preserving traditional crafts",
    icon: "ri-user-smile-line",
  },
  {
    name: "Artisan Network",
    role: "Master Craftspeople",
    description: "50+ skilled artisans across India",
    icon: "ri-team-line",
  },
  {
    name: "Quality Assurance",
    role: "Product Excellence",
    description: "Ensuring every piece meets our standards",
    icon: "ri-shield-check-line",
  },
];

function FAQItem({ faq }: { faq: FAQ }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left p-3 md:p-4 flex items-center justify-between gap-2 hover:bg-muted/50 transition-colors"
        >
          <span className="font-semibold text-xs md:text-sm text-foreground">
            {faq.question}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <p className="px-3 md:px-4 pb-3 md:pb-4 text-xs md:text-sm text-muted-foreground leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AboutPage() {
  return (
    <><Header />
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-6 md:py-10 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-2 md:space-y-3">
            <Badge className="mb-1 bg-primary/10 text-primary hover:bg-primary/20">
              About Inloom
            </Badge>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              <span className="bg-gradient-to-r from-primary via-ring to-accent bg-clip-text text-transparent">
                Crafted with Love, Delivered with Care
              </span>
            </h1>
            <p className="text-xs md:text-sm lg:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Inloom is your destination for authentic handcrafted treasures. We
              connect talented artisans with people who appreciate the beauty of
              handmade creations, preserving traditional crafts while supporting
              local communities.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-4 md:py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                  Our Story
                </h2>
                <div className="space-y-3 text-xs md:text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 2020, Inloom was born from a passion to preserve
                    and promote India's rich heritage of handicrafts. We
                    witnessed the decline of traditional arts and the struggles
                    of talented artisans who lacked market access.
                  </p>
                  <p>
                    Today, we work with over 50 artisan families across India,
                    providing them with a platform to showcase their skills to a
                    global audience. Every purchase directly supports these
                    craftspeople and helps keep traditional arts alive.
                  </p>
                  <p>
                    From intricate mandala art to delicate crochet work, from
                    aromatic candles to fluid art masterpieces - each piece tells
                    a story of dedication, skill, and cultural heritage.
                  </p>
                </div>
              </div>
              <div className="relative max-w-2xl mx-auto">
                <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 p-3 md:p-4 flex items-center justify-center">
                  <div className="text-center space-y-1.5">
                    <i className="ri-hand-heart-line text-2xl md:text-3xl text-primary"></i>
                    <div className="space-y-0.5">
                      <p className="text-lg md:text-xl font-bold text-foreground">
                        50+
                      </p>
                      <p className="text-[9px] md:text-[10px] text-muted-foreground">
                        Artisan Partners
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-6 md:py-10 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                Our Values
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-3 md:gap-4">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/30"
                >
                  <CardContent className="p-4 md:p-5 text-center space-y-3">
                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <i
                        className={`${member.icon} text-2xl md:text-3xl text-primary`}
                      ></i>
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-semibold text-sm md:text-base">
                        {member.name}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {member.role}
                      </Badge>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {member.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                Get in Touch
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto">
                We'd love to hear from you. Reach out to us through any of these
                channels.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {/* Email */}
              <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
                <CardContent className="p-4 md:p-5 text-center space-y-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-semibold text-xs md:text-sm">Email</h3>
                    <p className="text-[10px] md:text-xs text-muted-foreground">
                      support@inloom.com
                    </p>
                    <p className="text-[10px] md:text-xs text-muted-foreground">
                      info@inloom.com
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Phone */}
              <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
                <CardContent className="p-4 md:p-5 text-center space-y-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-semibold text-xs md:text-sm">Phone</h3>
                    <p className="text-[10px] md:text-xs text-muted-foreground">
                      +91 98765 43210
                    </p>
                    <p className="text-[10px] md:text-xs text-muted-foreground">
                      +91 87654 32109
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Address */}
              <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
                <CardContent className="p-4 md:p-5 text-center space-y-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-semibold text-xs md:text-sm">
                      Address
                    </h3>
                    <p className="text-[10px] md:text-xs text-muted-foreground">
                      123, Craft Lane
                    </p>
                    <p className="text-[10px] md:text-xs text-muted-foreground">
                      Mumbai, Maharashtra 400001
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Working Hours */}
              <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
                <CardContent className="p-4 md:p-5 text-center space-y-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Clock className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-semibold text-xs md:text-sm">
                      Business Hours
                    </h3>
                    <p className="text-[10px] md:text-xs text-muted-foreground">
                      Mon - Sat: 9 AM - 7 PM
                    </p>
                    <p className="text-[10px] md:text-xs text-muted-foreground">
                      Sunday: Closed
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Social Media */}
            <div className="mt-6 md:mt-8 text-center">
              <h3 className="font-semibold text-sm md:text-base mb-3">
                Follow Us
              </h3>
              <div className="flex items-center justify-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary h-9 w-9"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary h-9 w-9"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary h-9 w-9"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary h-9 w-9"
                >
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-6 md:py-10 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about our products and services
              </p>
            </div>

            <div className="space-y-2 md:space-y-3">
              {faqs.map((faq) => (
                <FAQItem key={faq.id} faq={faq} />
              ))}
            </div>

            {/* Still Have Questions */}
            <div className="mt-6 md:mt-8 text-center p-4 md:p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
              <h3 className="font-semibold text-base md:text-lg mb-1.5">
                Still have questions?
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground mb-3">
                Our team is here to help. Send us a message!
              </p>
              <Button className="rounded-full bg-primary hover:bg-primary/90 text-xs md:text-sm h-8 md:h-9">
                <Send className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-6 md:py-10 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold">
              Stay Updated
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              Subscribe to our newsletter for updates on new products, artisan
              stories, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-full border border-input bg-background text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="rounded-full bg-primary hover:bg-primary/90 px-6 text-xs md:text-sm h-9 md:h-10">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
