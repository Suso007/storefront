"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/app/myCopmonent/Header";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    phone: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      if (!formData.name) {
        newErrors.name = "Name is required";
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
      // Store user data in localStorage (in production, use proper authentication)
      const userData = {
        name: isLogin ? "John Doe" : formData.name,
        email: formData.email,
        phone: isLogin ? "+1 234 567 8900" : formData.phone,
        isLoggedIn: true,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");

      setIsLoading(false);

      // Redirect to account page
      router.push("/account");
    }, 1500);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
      phone: "",
    });
    setErrors({});
  };

  return (
    <>
    <Header />
    <div className="flex bg-background">
      {/* Left Side - Beautiful Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/95 to-accent relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-48 h-full bg-white/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-8 text-white">
          {/* Logo */}
          <div className="mb-2">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl border border-white/30 hover:scale-105 transition-transform duration-300">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-center mb-4 tracking-tight leading-tight">
            Welcome to<br />
            <span className="bg-gradient-to-r from-white/90 to-white/70 bg-clip-text text-transparent">
              Inloom
            </span>
          </h1>
          <p className="text-xl text-center text-white/90 max-w-lg font-light leading-relaxed">
            Discover unique handcrafted treasures made with passion by talented artisans from around the world
          </p>

                        {/* Seller/Artisan Login Link */}
              <div className="pt-6 border-t border-border">
                <div className="bg-muted/50 rounded-2xl p-6 border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg
                        className="w-6 h-6 text-primary-foreground"
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
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground mb-1">
                        Are you an Artisan?
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Join our marketplace and showcase your handcrafted products to thousands of customers
                      </p>
                      <Link href="/auth/seller-login">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-2 border-border text-primary hover:bg-muted font-semibold rounded-xl h-11 transition-all duration-200"
                        >
                          Seller Portal →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-4 w-full max-w-lg">
            <div className="text-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="text-4xl font-bold mb-2 text-white">500+</div>
              <div className="text-sm text-white/80 font-medium">Expert Artisans</div>
            </div>
            <div className="text-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="text-4xl font-bold mb-2 text-white">10K+</div>
              <div className="text-sm text-white/80 font-medium">Unique Products</div>
            </div>
            <div className="text-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="text-4xl font-bold mb-2 text-white">50K+</div>
              <div className="text-sm text-white/80 font-medium">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-2 md:p-12 bg-background">
        <div className="w-full max-w-md">
          {/* Header Logo for Mobile */}

          <Card className="border shadow-2xl bg-card p-4">
            <CardHeader className="space-y-2 pb-2 text-center">
              <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">
                {isLogin ? "Welcome back!" : "Create account"}
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                {isLogin
                  ? "Enter your credentials to access your account"
                  : "Sign up to start shopping unique artisan products"}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2 md:px-8 pb-2 md:pb-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name field (only for signup) */}
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`h-12 border-2 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-ring/20 ${errors.name ? "border-destructive focus:border-destructive" : "border-border focus:border-ring"}`}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.name}
                      </p>
                    )}
                  </div>
                )}

                {/* Email field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`h-12 border-2 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-ring/20 ${errors.email ? "border-destructive focus:border-destructive" : "border-border focus:border-ring"}`}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone field (only for signup) */}
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 234 567 8900"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`h-12 border-2 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-ring/20 ${errors.phone ? "border-destructive focus:border-destructive" : "border-border focus:border-ring"}`}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.phone}
                      </p>
                    )}
                  </div>
                )}

                {/* Password field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                    {isLogin && (
                      <Link
                        href="/auth/forgot-password"
                        className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        Forgot password?
                      </Link>
                    )}
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`h-12 border-2 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-ring/20 ${errors.password ? "border-destructive focus:border-destructive" : "border-border focus:border-ring"}`}
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password field (only for signup) */}
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`h-12 border-2 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-ring/20 ${errors.confirmPassword ? "border-destructive focus:border-destructive" : "border-border focus:border-ring"}`}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Please wait...
                    </div>
                  ) : (
                    isLogin ? "Sign In" : "Create Account"
                  )}
                </Button>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-background px-4 text-muted-foreground font-medium">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <Button type="button" variant="outline" className="h-12 border-2 rounded-xl hover:bg-muted transition-all duration-200">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>

                  <Button type="button" variant="outline" className="h-12 border-2 rounded-xl hover:bg-muted transition-all duration-200">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </form>

              {/* Toggle between login and signup */}
              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-primary font-semibold hover:text-primary/80 transition-colors"
                  >
                    {isLogin ? "Sign up for free" : "Sign in"}
                  </button>
                </p>
              </div>
                <div className="block lg:hidden pt-6 border-t border-border">
                <div className="bg-muted/50 rounded-2xl p-6 border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg
                        className="w-6 h-6 text-primary-foreground"
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
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground mb-1">
                        Are you an Artisan?
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Join our marketplace and showcase your handcrafted products to thousands of customers
                      </p>
                      <Link href="/auth/seller-login">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-2 border-border text-primary hover:bg-muted font-semibold rounded-xl h-11 transition-all duration-200"
                        >
                          Seller Portal →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="mt-8 text-center">
                <p className="text-xs text-gray-500">
                  By continuing, you agree to our{" "}
                  <Link href="/terms" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
        </>
  );
}
