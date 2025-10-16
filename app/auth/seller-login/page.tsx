"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "../../myCopmonent/Header";
import Footer from "../../myCopmonent/Footer";

export default function SellerLoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    businessName: "",
    ownerName: "",
    confirmPassword: "",
    phone: "",
    businessType: "",
    address: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Signup-specific validations
    if (!isLogin) {
      if (!formData.businessName) {
        newErrors.businessName = "Business name is required";
      }

      if (!formData.ownerName) {
        newErrors.ownerName = "Owner name is required";
      }

      if (!formData.businessType) {
        newErrors.businessType = "Business type is required";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
        newErrors.phone = "Invalid phone number format";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Store seller data in localStorage
      const sellerData = {
        businessName: isLogin ? "Artisan Workshop" : formData.businessName,
        ownerName: isLogin ? "Jane Smith" : formData.ownerName,
        email: formData.email,
        phone: isLogin ? "+1 234 567 8900" : formData.phone,
        businessType: isLogin ? "Pottery & Ceramics" : formData.businessType,
        address: isLogin ? "456 Craft Lane, Art District" : formData.address,
        isSellerLoggedIn: true,
        isSeller: true,
      };

      localStorage.setItem("seller", JSON.stringify(sellerData));
      localStorage.setItem("isSellerLoggedIn", "true");

      setIsLoading(false);

      // Redirect to artisan/seller dashboard
      router.push("/artisans");
    }, 1500);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      businessName: "",
      ownerName: "",
      confirmPassword: "",
      phone: "",
      businessType: "",
      address: "",
    });
    setErrors({});
  };

  return (
    <>
      <Header />
      <div className="bg-background flex items-center justify-center">
        <div className="container mx-auto px-2 md:px-4 py-4 md:py-8 max-w-2xl">
          <Card className="p-1 md:p-2">
            <CardHeader className="p-3 md:p-4 text-center">
              <div className="flex items-center justify-center mb-2 md:mb-3">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              </div>
              <CardTitle className="text-lg md:text-2xl">
                {isLogin ? "Seller Portal" : "Become a Seller"}
              </CardTitle>
              <CardDescription className="text-xs md:text-sm">
                {isLogin
                  ? "Sign in to manage your products and orders"
                  : "Join our marketplace and start selling your artisan products"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 md:p-4 pt-0 md:pt-0">
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                {/* Business Name field (only for signup) */}
                {!isLogin && (
                  <div className="space-y-1">
                    <Label htmlFor="businessName" className="text-xs md:text-sm">
                      Business/Shop Name *
                    </Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      type="text"
                      placeholder="Artisan Workshop"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className={`text-xs md:text-sm h-8 md:h-10 ${
                        errors.businessName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.businessName && (
                      <p className="text-xs text-red-500 mt-0.5">{errors.businessName}</p>
                    )}
                  </div>
                )}

                {/* Owner Name field (only for signup) */}
                {!isLogin && (
                  <div className="space-y-1">
                    <Label htmlFor="ownerName" className="text-xs md:text-sm">
                      Owner Full Name *
                    </Label>
                    <Input
                      id="ownerName"
                      name="ownerName"
                      type="text"
                      placeholder="Jane Smith"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      className={`text-xs md:text-sm h-8 md:h-10 ${
                        errors.ownerName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.ownerName && (
                      <p className="text-xs text-red-500 mt-0.5">{errors.ownerName}</p>
                    )}
                  </div>
                )}

                {/* Email field */}
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-xs md:text-sm">
                    Business Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="business@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`text-xs md:text-sm h-8 md:h-10 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-0.5">{errors.email}</p>
                  )}
                </div>

                {/* Business Type and Phone (only for signup) */}
                {!isLogin && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="businessType" className="text-xs md:text-sm">
                        Business Type *
                      </Label>
                      <select
                        id="businessType"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className={`flex h-8 md:h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-xs md:text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                          errors.businessType ? "border-red-500" : ""
                        }`}
                      >
                        <option value="">Select type</option>
                        <option value="pottery">Pottery & Ceramics</option>
                        <option value="woodwork">Woodwork & Carpentry</option>
                        <option value="textiles">Textiles & Fabrics</option>
                        <option value="jewelry">Jewelry & Accessories</option>
                        <option value="painting">Painting & Art</option>
                        <option value="metalwork">Metalwork</option>
                        <option value="glasswork">Glasswork</option>
                        <option value="leatherwork">Leatherwork</option>
                        <option value="other">Other Crafts</option>
                      </select>
                      {errors.businessType && (
                        <p className="text-xs text-red-500 mt-0.5">{errors.businessType}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="phone" className="text-xs md:text-sm">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 234 567 8900"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`text-xs md:text-sm h-8 md:h-10 ${
                          errors.phone ? "border-red-500" : ""
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500 mt-0.5">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Business Address (only for signup) */}
                {!isLogin && (
                  <div className="space-y-1">
                    <Label htmlFor="address" className="text-xs md:text-sm">
                      Business Address (Optional)
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      placeholder="123 Craft Lane, Art District"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="text-xs md:text-sm h-8 md:h-10"
                    />
                  </div>
                )}

                {/* Password field */}
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-xs md:text-sm">
                    Password *
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`text-xs md:text-sm h-8 md:h-10 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  {errors.password && (
                    <p className="text-xs text-red-500 mt-0.5">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password field (only for signup) */}
                {!isLogin && (
                  <div className="space-y-1">
                    <Label htmlFor="confirmPassword" className="text-xs md:text-sm">
                      Confirm Password *
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`text-xs md:text-sm h-8 md:h-10 ${
                        errors.confirmPassword ? "border-red-500" : ""
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-500 mt-0.5">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                )}

                {/* Forgot Password (only for login) */}
                {isLogin && (
                  <div className="flex justify-end">
                    <Link
                      href="/auth/forgot-password"
                      className="text-xs md:text-sm text-primary hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs md:text-sm h-9 md:h-10"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Please wait..."
                    : isLogin
                    ? "Sign In to Seller Portal"
                    : "Register as Seller"}
                </Button>

                {/* Info Box for Signup */}
                {!isLogin && (
                  <div className="bg-muted/50 border border-border rounded-lg p-2 md:p-3 mt-3">
                    <h4 className="font-semibold text-xs md:text-sm text-foreground mb-1">
                      Benefits of Selling on Inloom:
                    </h4>
                    <ul className="text-xs space-y-0.5 text-muted-foreground list-disc list-inside">
                      <li>Reach thousands of customers</li>
                      <li>Easy-to-use seller dashboard</li>
                      <li>Secure payment processing</li>
                      <li>Marketing support and tools</li>
                      <li>Low commission rates</li>
                    </ul>
                  </div>
                )}

                {/* Toggle between login and signup */}
                <div className="text-center pt-3 md:pt-4">
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {isLogin ? "New to selling?" : "Already a seller?"}{" "}
                    <button
                      type="button"
                      onClick={toggleMode}
                      className="text-primary font-semibold hover:underline"
                    >
                      {isLogin ? "Register Now" : "Sign In"}
                    </button>
                  </p>
                </div>

                {/* Customer Login Link */}
                <div className="text-center pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Are you a customer?{" "}
                    <Link href="/auth/login" className="text-primary hover:underline">
                      Customer Login
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-4 md:mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Seller Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
