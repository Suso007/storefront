"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  X,
} from "lucide-react";

interface HeaderProps {
  bgsetup?: string;
}

export default function Header({ bgsetup }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount] = useState(3); // Replace with actual cart count
  const [showBanner, setShowBanner] = useState(true);
  const [showCategories, setShowCategories] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Default background style
  const defaultBgStyle = "border-b bg-background";
  const headerStyle = bgsetup || defaultBgStyle;

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Artisans", href: "/artisans" },
    { name: "Gallary", href: "/gallary" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide banner when scrolling down, show when at top
      if (currentScrollY > 50) {
        setShowBanner(false);
      } else {
        setShowBanner(true);
      }

      // Hide categories when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setShowCategories(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setShowCategories(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`sticky top-0 z-50 w-full ${lastScrollY>10? defaultBgStyle:headerStyle}`}>
      {/* Top Banner */}
      <div
        className={`bg-primary text-primary-foreground transition-all duration-300 overflow-hidden ${
          showBanner ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-2">
          <p className="text-center text-xs md:text-md font-medium">
            Free shipping on orders over $50 | Shop now and save up to 30%
          </p>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu" className="hover:bg-primary/10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] p-0 border-r-0">
              {/* Header */}
              <div className="bg-primary px-6 py-8 text-primary-foreground">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-lg font-bold">I</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Inloom</h2>
                    <p className="text-sm opacity-90">Handcrafted with Love</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="px-6 py-6">
                <nav className="space-y-2">
                  {navigation.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-4 px-4 py-3 rounded-xl text-foreground hover:bg-primary/5 hover:text-primary transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        {item.name === "Home" && <span className="text-sm">🏠</span>}
                        {item.name === "Shop" && <span className="text-sm">🛍️</span>}
                        {item.name === "About" && <span className="text-sm">ℹ️</span>}
                        {item.name === "Artisans" && <span className="text-sm">👨‍🎨</span>}
                        {item.name === "Gallary" && <span className="text-sm">🖼️</span>}
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </nav>

                {/* Categories Section */}
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 px-4">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href="/category/mandala"
                      className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-all duration-200"
                    >
                      <span className="text-base">🎨</span>
                      <span>Mandala Art</span>
                    </Link>
                    <Link
                      href="/category/jewellery"
                      className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-all duration-200"
                    >
                      <span className="text-base">💎</span>
                      <span>Jewellery</span>
                    </Link>
                    <Link
                      href="/category/mirror-arts"
                      className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-all duration-200"
                    >
                      <span className="text-base">✨</span>
                      <span>Mirror Arts</span>
                    </Link>
                    <Link
                      href="/category/crochet"
                      className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-all duration-200"
                    >
                      <span className="text-base">🧶</span>
                      <span>Crochet</span>
                    </Link>
                    <Link
                      href="/category/embroidery"
                      className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-all duration-200"
                    >
                      <span className="text-base">🪡</span>
                      <span>Embroidery</span>
                    </Link>
                    <Link
                      href="/category/fluid-art"
                      className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-all duration-200"
                    >
                      <span className="text-base">🌊</span>
                      <span>Fluid Art</span>
                    </Link>
                    <Link
                      href="/category/aroma"
                      className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-all duration-200"
                    >
                      <span className="text-base">🕯️</span>
                      <span>Aroma Sanctuaries</span>
                    </Link>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/account"
                      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <User className="h-5 w-5 text-primary" />
                      <span className="text-xs font-medium">Account</span>
                    </Link>
                    <Link
                      href="/cart"
                      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors relative"
                    >
                      <ShoppingCart className="h-5 w-5 text-primary" />
                      <span className="text-xs font-medium">Cart</span>
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">
                      Handcrafted with ❤️ in India
                    </p>
                    <div className="flex justify-center gap-4">
                      <Link href="/help" className="text-xs text-primary hover:underline">
                        Help
                      </Link>
                      <Link href="/contact" className="text-xs text-primary hover:underline">
                        Contact
                      </Link>
                      <Link href="/about" className="text-xs text-primary hover:underline">
                        About Us
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary">Inloom</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
            >
              {isSearchOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" aria-label="Wishlist" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>

            {/* Account */}
            <Button variant="ghost" size="icon" aria-label="Account" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Shopping cart"
              asChild
            >
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden pb-4 animate-in slide-in-from-top-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 pr-4"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
