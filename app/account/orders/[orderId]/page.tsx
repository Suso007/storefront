"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "../../../myCopmonent/Header";
import Footer from "../../../myCopmonent/Footer";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId as string;
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");

      if (!isLoggedIn || isLoggedIn !== "true") {
        router.push("/auth/login");
        return;
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

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

  // Mock order data - replace with actual API call using orderId
  const orderDetails = {
    id: orderId,
    orderNumber: orderId,
    date: "2024-10-10",
    status: "Delivered",
    deliveredDate: "2024-10-15",
    estimatedDelivery: "2024-10-14",
    subtotal: 135.99,
    shipping: 10.00,
    tax: 4.00,
    total: 149.99,
    paymentMethod: "Credit Card (****1234)",
    paymentStatus: "Paid",
    items: [
      {
        id: 1,
        name: "Handcrafted Wooden Bowl",
        artisan: "Wood Artisan Co.",
        image: "/placeholder-product.jpg",
        quantity: 1,
        price: 59.99,
        sku: "WB-001",
      },
      {
        id: 2,
        name: "Artisan Ceramic Mug",
        artisan: "Clay Creations Studio",
        image: "/placeholder-product.jpg",
        quantity: 2,
        price: 45.00,
        sku: "CM-002",
      },
      {
        id: 3,
        name: "Hand-painted Coaster Set",
        artisan: "Color & Canvas",
        image: "/placeholder-product.jpg",
        quantity: 1,
        price: 31.00,
        sku: "CS-003",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
      phone: "+1 234 567 8900",
    },
    billingAddress: {
      name: "John Doe",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    trackingInfo: {
      carrier: "FedEx",
      trackingNumber: "TRK123456789",
      currentLocation: "Out for Delivery",
      estimatedDelivery: "Oct 14, 2024",
    },
    timeline: [
      { date: "Oct 15, 2024 2:30 PM", status: "Delivered", description: "Package delivered to recipient" },
      { date: "Oct 15, 2024 8:00 AM", status: "Out for Delivery", description: "Package out for delivery" },
      { date: "Oct 14, 2024 6:45 PM", status: "In Transit", description: "Package in transit - New York, NY" },
      { date: "Oct 13, 2024 11:20 AM", status: "In Transit", description: "Package in transit - Philadelphia, PA" },
      { date: "Oct 12, 2024 9:15 AM", status: "Shipped", description: "Package picked up by carrier" },
      { date: "Oct 11, 2024 3:00 PM", status: "Processing", description: "Package ready for shipment" },
      { date: "Oct 10, 2024 10:30 AM", status: "Order Placed", description: "Order confirmed and payment received" },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "shipped":
      case "out for delivery":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "processing":
      case "in transit":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const handleDownloadInvoice = () => {
    console.log(`Downloading invoice for ${orderId}`);
  };

  const handleTrackPackage = () => {
    console.log(`Tracking package: ${orderDetails.trackingInfo.trackingNumber}`);
  };

  const handleCancelOrder = () => {
    console.log(`Cancelling order ${orderId}`);
  };

  const handleRequestReturn = () => {
    console.log(`Requesting return for ${orderId}`);
  };

  const handleContactSupport = () => {
    console.log(`Contacting support about ${orderId}`);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-1 md:px-3 py-2 md:py-4 max-w-7xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 md:gap-1.5 mb-2 md:mb-3 text-xs">
            <Link href="/account" className="text-muted-foreground hover:text-foreground">
              Account
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/account/orders" className="text-muted-foreground hover:text-foreground">
              Orders
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium truncate">{orderId}</span>
          </div>

          {/* Header */}
          <div className="flex items-start justify-between gap-1 md:gap-2 mb-2 md:mb-4 px-1 md:px-2">
            <div className="flex-1">
              <h1 className="text-lg md:text-2xl font-bold text-foreground mb-0.5 md:mb-1">Order Details</h1>
              <div className="flex items-center gap-1 md:gap-2">
                <p className="text-xs md:text-sm text-muted-foreground">Order #{orderDetails.orderNumber}</p>
                <Badge className={`${getStatusColor(orderDetails.status)} text-xs px-1.5 py-0`}>
                  {orderDetails.status}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-0.5 md:gap-1">
              {orderDetails.trackingInfo && (
                <Button variant="outline" onClick={handleTrackPackage} className="text-xs px-1.5 py-0.5 h-auto">
                  Track
                </Button>
              )}
              <Button variant="outline" onClick={handleDownloadInvoice} className="text-xs px-1.5 py-0.5 h-auto">
                Invoice
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-2 md:space-y-3">
              {/* Order Items */}
              <Card className="p-2">
                <CardHeader className="p-1.5 md:p-3">
                  <CardTitle className="text-sm md:text-base">Order Items</CardTitle>
                  <CardDescription className="text-xs">
                    Ordered on {orderDetails.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-1.5 md:p-3 pt-0 md:pt-0">
                  <div className="space-y-1 md:space-y-2">
                    {orderDetails.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-1 md:gap-2 p-1 md:p-2 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="w-10 h-10 md:w-16 md:h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-muted-foreground text-xs">Img</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-xs md:text-sm text-foreground mb-0.5 truncate">{item.name}</h4>
                          <p className="text-xs text-muted-foreground mb-0.5 truncate">by {item.artisan}</p>
                          <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
                          <p className="text-xs text-foreground mt-0.5 md:mt-1">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right flex flex-col justify-between">
                          <p className="font-bold text-foreground text-xs md:text-sm">
                            ${item.price.toFixed(2)}
                          </p>
                          <Button variant="link" size="sm" className="mt-0.5 h-auto p-0 text-xs">
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Information */}
              {orderDetails.trackingInfo && (
                <Card className="p-2">
                  <CardHeader className="p-1.5 md:p-3">
                    <CardTitle className="text-sm md:text-base">Tracking Information</CardTitle>
                    <CardDescription className="text-xs">Live package tracking updates</CardDescription>
                  </CardHeader>
                  <CardContent className="p-1.5 md:p-3 pt-0 md:pt-0">
                    <div className="space-y-1 md:space-y-2">
                      <div className="flex justify-between items-center p-1 md:p-2 bg-primary/10 rounded-lg">
                        <div>
                          <p className="text-xs text-muted-foreground">Carrier</p>
                          <p className="font-semibold text-xs md:text-sm text-foreground">{orderDetails.trackingInfo.carrier}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Tracking Number</p>
                          <p className="font-mono font-semibold text-xs text-foreground">
                            {orderDetails.trackingInfo.trackingNumber}
                          </p>
                        </div>
                      </div>
                      <div className="p-1 md:p-2 border border-border rounded-lg">
                        <p className="text-xs text-muted-foreground mb-0.5">Current Status</p>
                        <p className="text-sm md:text-base font-bold text-foreground">
                          {orderDetails.trackingInfo.currentLocation}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 md:mt-1">
                          Estimated Delivery: {orderDetails.trackingInfo.estimatedDelivery}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Order Timeline */}
              <Card className="p-2">
                <CardHeader className="p-1.5 md:p-3">
                  <CardTitle className="text-sm md:text-base">Order Timeline</CardTitle>
                  <CardDescription className="text-xs">Track your order journey</CardDescription>
                </CardHeader>
                <CardContent className="p-1.5 md:p-3 pt-0 md:pt-0">
                  <div className="relative space-y-1 md:space-y-2">
                    {orderDetails.timeline.map((event, index) => (
                      <div key={index} className="flex gap-1.5 md:gap-2">
                        <div className="relative flex flex-col items-center">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              index === 0 ? "bg-primary" : "bg-muted"
                            } z-10`}
                          />
                          {index !== orderDetails.timeline.length - 1 && (
                            <div className="w-0.5 h-full bg-border absolute top-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-2 md:pb-3">
                          <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1 mb-0.5">
                            <Badge
                              variant="outline"
                              className={`${index === 0 ? getStatusColor(event.status) : ""} text-xs px-1.5 py-0 w-fit`}
                            >
                              {event.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{event.date}</span>
                          </div>
                          <p className="text-xs text-foreground">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-2 md:space-y-3">
              {/* Order Summary */}
              <Card className="p-2">
                <CardHeader className="p-1.5 md:p-3">
                  <CardTitle className="text-sm md:text-base">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 md:space-y-2 p-1.5 md:p-3 pt-0 md:pt-0">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">
                      ${orderDetails.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-foreground">
                      ${orderDetails.shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium text-foreground">
                      ${orderDetails.tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-border pt-1 md:pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-xs md:text-sm text-foreground">Total</span>
                      <span className="font-bold text-foreground text-sm md:text-base">
                        ${orderDetails.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="pt-1 md:pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-0.5">Payment Method</p>
                    <p className="font-medium text-xs text-foreground">{orderDetails.paymentMethod}</p>
                    <Badge className="mt-0.5 md:mt-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-1.5 py-0">
                      {orderDetails.paymentStatus}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="p-2">
                <CardHeader className="p-1.5 md:p-3">
                  <CardTitle className="text-sm md:text-base">Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="p-1.5 md:p-3 pt-0 md:pt-0">
                  <div className="text-xs space-y-0.5">
                    <p className="font-semibold text-foreground">{orderDetails.shippingAddress.name}</p>
                    <p className="text-muted-foreground">{orderDetails.shippingAddress.street}</p>
                    <p className="text-muted-foreground">
                      {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}{" "}
                      {orderDetails.shippingAddress.zip}
                    </p>
                    <p className="text-muted-foreground">{orderDetails.shippingAddress.country}</p>
                    <p className="text-muted-foreground pt-0.5 md:pt-1">{orderDetails.shippingAddress.phone}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Billing Address */}
              <Card className="p-2">
                <CardHeader className="p-1.5 md:p-3">
                  <CardTitle className="text-sm md:text-base">Billing Address</CardTitle>
                </CardHeader>
                <CardContent className="p-1.5 md:p-3 pt-0 md:pt-0">
                  <div className="text-xs space-y-0.5">
                    <p className="font-semibold text-foreground">{orderDetails.billingAddress.name}</p>
                    <p className="text-muted-foreground">{orderDetails.billingAddress.street}</p>
                    <p className="text-muted-foreground">
                      {orderDetails.billingAddress.city}, {orderDetails.billingAddress.state}{" "}
                      {orderDetails.billingAddress.zip}
                    </p>
                    <p className="text-muted-foreground">{orderDetails.billingAddress.country}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="p-2">
                <CardHeader className="p-1.5 md:p-3">
                  <CardTitle className="text-sm md:text-base">Order Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-0.5 md:space-y-1 p-1.5 md:p-3 pt-0 md:pt-0">
                  {orderDetails.status === "Delivered" && (
                    <>
                      <Button variant="outline" className="w-full text-xs h-8" onClick={handleRequestReturn}>
                        Request Return/Refund
                      </Button>
                      <Button variant="outline" className="w-full text-xs h-8">
                        Reorder Items
                      </Button>
                    </>
                  )}
                  {orderDetails.status === "Processing" && (
                    <Button
                      variant="outline"
                      className="w-full text-destructive text-xs h-8"
                      onClick={handleCancelOrder}
                    >
                      Cancel Order
                    </Button>
                  )}
                  <Button variant="outline" className="w-full text-xs h-8" onClick={handleContactSupport}>
                    Contact Support
                  </Button>
                  <Button variant="outline" className="w-full text-xs h-8">
                    Report an Issue
                  </Button>
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
