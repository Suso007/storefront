"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Youtube, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-deep border-t footer-deep-border">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1 space-y-3">
            <Link href="/" className="inline-block">
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary via-ring to-accent bg-clip-text text-transparent">
                Inloom
              </h2>
            </Link>
            <p className="text-xs md:text-sm footer-deep-muted-text leading-relaxed">
              Handcrafted treasures made with love by skilled artisans across India.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full hover:bg-primary/20 hover:text-primary footer-deep-text"
                asChild
              >
                <a href="#" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full hover:bg-primary/20 hover:text-primary footer-deep-text"
                asChild
              >
                <a href="#" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full hover:bg-primary/20 hover:text-primary footer-deep-text"
                asChild
              >
                <a href="#" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full hover:bg-primary/20 hover:text-primary footer-deep-text"
                asChild
              >
                <a href="#" aria-label="Youtube">
                  <Youtube className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold footer-deep-text">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop"
                  className="text-xs md:text-sm footer-deep-muted-text hover:text-primary transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=mandala"
                  className="text-xs md:text-sm footer-deep-muted-text hover:text-primary transition-colors"
                >
                  Mandala Art
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=jewellery"
                  className="text-xs md:text-sm footer-deep-muted-text hover:text-primary transition-colors"
                >
                  Jewellery
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=new"
                  className="text-xs md:text-sm footer-deep-muted-text hover:text-primary transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold footer-deep-text">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-xs md:text-sm footer-deep-muted-text hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about#contact"
                  className="text-xs md:text-sm footer-deep-muted-text hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/about#faq"
                  className="text-xs md:text-sm footer-deep-muted-text hover:text-primary transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/artisans"
                  className="text-xs md:text-sm footer-deep-muted-text hover:text-primary transition-colors"
                >
                  Our Artisans
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold footer-deep-text">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shipping"
                  className="text-xs md:text-sm footer-deep-muted-text hover:text-primary transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-xs md:text-sm footer-deep-muted-text hover:text-primary transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-xs md:text-sm footer-deep-muted-text hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-xs md:text-sm footer-deep-muted-text hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t footer-deep-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs md:text-sm footer-deep-muted-text">
            <p className="flex items-center gap-1">
              © {currentYear} Inloom. Made with{" "}
              <Heart className="h-3 w-3 fill-red-500 text-red-500 inline" /> for
              artisans
            </p>
            <p className="flex items-center gap-1">
              <i className="ri-secure-payment-line"></i>
              Secure Payment • Fast Shipping
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
