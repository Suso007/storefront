"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Header from "../myCopmonent/Header";
import Footer from "../myCopmonent/Footer";

export default function AccountPage() {
  const router = useRouter();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    avatar: "JD",
  });

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const userData = localStorage.getItem("user");

      if (!isLoggedIn || isLoggedIn !== "true") {
        // Not logged in, redirect to login page
        router.push("/auth/login");
        return;
      }

      // Load user data from localStorage
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser({
            name: parsedUser.name || "John Doe",
            email: parsedUser.email || "john.doe@example.com",
            phone: parsedUser.phone || "+1 234 567 8900",
            avatar: parsedUser.name ? parsedUser.name.split(" ").map((n: string) => n[0]).join("").toUpperCase() : "JD",
          });
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const addresses = [
    {
      id: 1,
      type: "Home",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      street: "456 Business Ave",
      city: "New York",
      state: "NY",
      zip: "10002",
      country: "USA",
      isDefault: false,
    },
  ];

  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-10-10",
      status: "Delivered",
      total: 149.99,
      items: 3,
    },
    {
      id: "ORD-2024-002",
      date: "2024-09-25",
      status: "Shipped",
      total: 89.50,
      items: 2,
    },
    {
      id: "ORD-2024-003",
      date: "2024-09-15",
      status: "Processing",
      total: 219.00,
      items: 5,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-background p-2">
      <div className="container mx-auto px-1 md:px-3 py-2 md:py-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-row md:justify-between md:items-center gap-1 md:gap-2 mb-2 md:mb-4 px-1">
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-foreground mb-1 md:mb-2">My Account</h1>
            <p className="text-xs md:text-sm text-muted-foreground">Manage your profile, orders, and preferences</p>
          </div>
          <div className="flex gap-1 md:gap-2">
            <Link href="/auth/seller-login">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs md:text-sm px-2 md:px-3 py-1 md:py-1.5 h-auto">
                Seller/Artisan
              </Button>
            </Link>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="text-xs md:text-sm px-2 md:px-3 py-1 md:py-1.5 h-auto"
            >
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-2 md:space-y-3">
            {/* User Details Card */}
            <Card className="p-1 md:p-2">
              <CardHeader className="p-1.5 md:p-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-sm md:text-base">Profile Information</CardTitle>
                    <CardDescription className="text-xs">Your personal details</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs px-1.5 py-0.5 h-auto"
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                  >
                    {isEditingProfile ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-1.5 md:p-2 pt-0 md:pt-0">
                <div className="flex items-start gap-1.5 md:gap-4">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm md:text-lg font-bold flex-shrink-0">
                    {user.avatar}
                  </div>
                  <div className="flex-1 space-y-1.5 md:space-y-3">
                    {isEditingProfile ? (
                      <div className="space-y-1.5 md:space-y-3">
                        <div>
                          <Label htmlFor="name" className="text-xs">Full Name</Label>
                          <Input id="name" defaultValue={user.name} className="text-xs h-8 md:h-10" />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-xs">Email</Label>
                          <Input id="email" type="email" defaultValue={user.email} className="text-xs h-8 md:h-10" />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-xs">Phone</Label>
                          <Input id="phone" type="tel" defaultValue={user.phone} className="text-xs h-8 md:h-10" />
                        </div>
                        <Button className="bg-primary hover:bg-primary/90 text-xs px-2 py-1 h-auto">Save Changes</Button>
                      </div>
                    ) : (
                      <div className="space-y-1.5 md:space-y-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Name</p>
                          <p className="font-medium text-xs md:text-sm text-foreground">{user.name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="font-medium text-xs md:text-sm text-foreground">{user.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Phone</p>
                          <p className="font-medium text-xs md:text-sm text-foreground">{user.phone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order History Card */}
            <Card className="p-1 md:p-2">
              <CardHeader className="p-1.5 md:p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-sm md:text-base">Order History</CardTitle>
                    <CardDescription className="text-xs">Track and manage your orders</CardDescription>
                  </div>
                  <Link href="/account/orders">
                    <Button variant="outline" size="sm" className="text-xs px-1.5 py-0.5 h-auto">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-1.5 md:p-3 pt-0 md:pt-0">
                <div className="space-y-1 md:space-y-2">
                  {orders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-1 md:p-2 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-2 mb-0.5 md:mb-1">
                          <p className="font-semibold text-xs md:text-sm text-foreground">{order.id}</p>
                          <Badge className={`${getStatusColor(order.status)} text-xs px-1.5 py-0`}>{order.status}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {order.date} • {order.items} items
                        </p>
                      </div>
                      <div className="text-right ml-2">
                        <p className="font-bold text-foreground text-xs md:text-sm">
                          ${order.total.toFixed(2)}
                        </p>
                        <Link href={`/account/orders/${order.id}`}>
                          <Button variant="outline" size="sm" className="mt-0.5 md:mt-1 text-xs px-1.5 py-0.5 h-auto">
                            Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Addresses Card */}
            <Card className="p-1 md:p-2">
              <CardHeader className="p-1.5 md:p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-sm md:text-base">Saved Addresses</CardTitle>
                    <CardDescription className="text-xs">Manage your delivery addresses</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs px-1.5 py-0.5 h-auto">
                    Add New
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-1.5 md:p-3 pt-0 md:pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="p-1 md:p-2 border border-border rounded-lg hover:border-primary transition-colors"
                    >
                      <div className="flex justify-between items-start mb-0.5 md:mb-1">
                        <Badge variant="outline" className="text-xs px-1.5 py-0">{address.type}</Badge>
                        {address.isDefault && (
                          <Badge className="bg-primary text-primary-foreground text-xs px-1.5 py-0">Default</Badge>
                        )}
                      </div>
                      <p className="text-xs text-foreground mt-0.5 md:mt-1">{address.street}</p>
                      <p className="text-xs text-muted-foreground">
                        {address.city}, {address.state} {address.zip}
                      </p>
                      <p className="text-xs text-muted-foreground">{address.country}</p>
                      <div className="flex gap-0.5 md:gap-1 mt-1 md:mt-2">
                        <Button variant="outline" size="sm" className="text-xs px-1.5 py-0.5 h-auto">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive text-xs px-1.5 py-0.5 h-auto">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-2 md:space-y-3">
            {/* Settings Card */}
            <Card className="p-1 md:p-2">
              <CardHeader className="p-1.5 md:p-3">
                <CardTitle className="text-sm md:text-base">Account Settings</CardTitle>
                <CardDescription className="text-xs">Manage your preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-0.5 md:space-y-2 p-1.5 md:p-3 pt-0 md:pt-0">
                <Button variant="outline" className="w-full justify-start text-xs h-8 md:h-10">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start text-xs h-8 md:h-10">
                  Email Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start text-xs h-8 md:h-10">
                  Notification Settings
                </Button>
                <Button variant="outline" className="w-full justify-start text-xs h-8 md:h-10">
                  Privacy & Security
                </Button>
              </CardContent>
            </Card>

            {/* Support Card */}
            <Card className="p-1 md:p-2">
              <CardHeader className="p-1.5 md:p-3">
                <CardTitle className="text-sm md:text-base">Need Help?</CardTitle>
                <CardDescription className="text-xs">We&apos;re here to assist you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-0.5 md:space-y-2 p-1.5 md:p-3 pt-0 md:pt-0">
                <Button variant="outline" className="w-full justify-start text-xs h-8 md:h-10">
                  Contact Support
                </Button>
                <Button variant="outline" className="w-full justify-start text-xs h-8 md:h-10">
                  FAQs
                </Button>
                <Button variant="outline" className="w-full justify-start text-xs h-8 md:h-10">
                  Return Policy
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats Card */}
            <Card className="bg-primary/10 p-1 md:p-2">
              <CardHeader className="p-1.5 md:p-3">
                <CardTitle className="text-sm md:text-base">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 md:space-y-2 p-1.5 md:p-3 pt-0 md:pt-0">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Total Orders</span>
                  <span className="font-bold text-foreground">{orders.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Saved Addresses</span>
                  <span className="font-bold text-foreground">{addresses.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="font-bold text-foreground">Jan 2024</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
