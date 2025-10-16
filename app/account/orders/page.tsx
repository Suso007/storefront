"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "../../myCopmonent/Header";
import Footer from "../../myCopmonent/Footer";

export default function OrdersHistoryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
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

  // Mock orders data - replace with actual data from your backend
  const allOrders = [
    {
      id: "ORD-2024-001",
      date: "2024-10-10",
      status: "Delivered",
      total: 149.99,
      items: 3,
      itemsList: [
        { name: "Handcrafted Wooden Bowl", qty: 1, price: 59.99 },
        { name: "Artisan Ceramic Mug", qty: 2, price: 45.00 },
      ],
      shippingAddress: "123 Main Street, New York, NY 10001",
      trackingNumber: "TRK123456789",
    },
    {
      id: "ORD-2024-002",
      date: "2024-09-25",
      status: "Shipped",
      total: 89.50,
      items: 2,
      itemsList: [
        { name: "Handwoven Basket", qty: 1, price: 49.50 },
        { name: "Natural Soap Set", qty: 1, price: 40.00 },
      ],
      shippingAddress: "456 Business Ave, New York, NY 10002",
      trackingNumber: "TRK987654321",
    },
    {
      id: "ORD-2024-003",
      date: "2024-09-15",
      status: "Processing",
      total: 219.00,
      items: 5,
      itemsList: [
        { name: "Handmade Leather Bag", qty: 1, price: 129.00 },
        { name: "Silver Jewelry Set", qty: 2, price: 90.00 },
      ],
      shippingAddress: "123 Main Street, New York, NY 10001",
      trackingNumber: null,
    },
    {
      id: "ORD-2024-004",
      date: "2024-08-20",
      status: "Delivered",
      total: 75.00,
      items: 1,
      itemsList: [
        { name: "Hand-painted Canvas Art", qty: 1, price: 75.00 },
      ],
      shippingAddress: "123 Main Street, New York, NY 10001",
      trackingNumber: "TRK555666777",
    },
    {
      id: "ORD-2024-005",
      date: "2024-08-05",
      status: "Cancelled",
      total: 120.00,
      items: 2,
      itemsList: [
        { name: "Wooden Chess Set", qty: 1, price: 120.00 },
      ],
      shippingAddress: "456 Business Ave, New York, NY 10002",
      trackingNumber: null,
    },
    {
      id: "ORD-2024-006",
      date: "2024-07-12",
      status: "Delivered",
      total: 195.00,
      items: 4,
      itemsList: [
        { name: "Pottery Dinner Set", qty: 1, price: 195.00 },
      ],
      shippingAddress: "123 Main Street, New York, NY 10001",
      trackingNumber: "TRK111222333",
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
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const filteredOrders = allOrders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.itemsList.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleDownloadInvoice = (orderId: string) => {
    // Implement invoice download logic
    console.log(`Downloading invoice for ${orderId}`);
  };

  const handleTrackOrder = (orderId: string, trackingNumber: string | null) => {
    if (trackingNumber) {
      console.log(`Tracking order ${orderId} with tracking number: ${trackingNumber}`);
      // Redirect to tracking page or open modal
    }
  };

  const handleReorder = (orderId: string) => {
    console.log(`Reordering items from ${orderId}`);
    // Add items to cart logic
  };

  const handleCancelOrder = (orderId: string) => {
    console.log(`Cancelling order ${orderId}`);
    // Cancel order logic
  };

  const handleReturnRequest = (orderId: string) => {
    console.log(`Requesting return for ${orderId}`);
    // Return request logic
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-2 md:px-3 py-3 md:py-4 max-w-7xl space-y-3">
          {/* Header */}
          <div className="flex flex-row justify-between items-center">
            <div>
            <h1 className="text-lg md:text-2xl font-bold text-foreground mb-1 md:mb-2">Order History</h1>
            <p className="text-xs md:text-sm text-muted-foreground">View and manage all your orders</p>
            </div>
            <div className="flex items-center gap-2 mb-2 md:mb-4">
              <Link href="/account">
                <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-auto">
                  ← Back
                </Button>
              </Link>
            </div>

          </div>

          {/* Filters and Search */}
          <Card className="p-2">
            <CardContent className="p-2 md:p-2">
              <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by order ID or item name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs md:text-sm h-8 md:h-10"
                  />
                </div>
                <div className="w-full md:w-48">
                  <select
                    className="w-full h-8 md:h-10 px-2 md:px-3 text-xs md:text-sm rounded-md border border-input bg-background text-foreground"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders Stats */}
          <div className="hidden grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-foreground">{allOrders.length}</p>
                  <p className="text-sm text-muted-foreground mt-1">Total Orders</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {allOrders.filter(o => o.status === "Delivered").length}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Delivered</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">
                    {allOrders.filter(o => o.status === "Shipped").length}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Shipped</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-600">
                    {allOrders.filter(o => o.status === "Processing").length}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Processing</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
            {filteredOrders.length === 0 ? (
              <Card>
                <CardContent className="py-8 md:py-12 text-center p-2 md:p-4">
                  <p className="text-xs md:text-sm text-muted-foreground">No orders found matching your criteria.</p>
                </CardContent>
              </Card>
            ) : (
              filteredOrders.map((order) => (
                <Card key={order.id} className="p-2 overflow-hidden flex flex-col">
                  <CardHeader className="bg-muted/50 p-1.5 md:p-3">
                    <div className="flex items-start justify-between gap-2">
                      {/* Left: Order ID and Date */}
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-xs md:text-sm truncate">{order.id}</CardTitle>
                        <CardDescription className="mt-0.5 text-xs">
                          {order.date}
                        </CardDescription>
                      </div>
                      
                      {/* Right: Status and Total */}
                      <div className="flex flex-col items-end gap-1">
                        <Badge className={`${getStatusColor(order.status)} text-xs px-1.5 py-0`}>
                          {order.status}
                        </Badge>
                        <div className="text-right">
                          <p className="text-sm md:text-base font-bold text-foreground">
                            ${order.total.toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {order.items} {order.items === 1 ? 'item' : 'items'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2 md:pt-3 p-1.5 md:p-3 flex-1 flex flex-col">
                    {/* Items List */}
                    <div className="mb-1.5 flex-1">
                      <h4 className="font-semibold text-xs md:text-sm text-foreground mb-1">Order Items:</h4>
                      <div className="space-y-1">
                        {order.itemsList.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-1 md:p-2 bg-muted/30 rounded-lg"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-xs text-foreground truncate">{item.name}</p>
                              <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                            </div>
                            <p className="font-semibold text-xs text-foreground ml-2">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="mb-1.5 p-1 md:p-2 bg-muted/30 rounded-lg">
                      <p className="text-xs font-semibold text-foreground mb-0.5">Shipping:</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{order.shippingAddress}</p>
                      {order.trackingNumber && (
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="font-mono font-semibold">{order.trackingNumber}</span>
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-1">
                      <Link href={`/account/orders/${order.id}`} className="flex-1">
                        <Button variant="default" size="sm" className="text-xs px-2 py-1 h-auto w-full">
                          Details
                        </Button>
                      </Link>

                      {order.trackingNumber && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs px-2 py-1 h-auto flex-1"
                          onClick={() => handleTrackOrder(order.id, order.trackingNumber)}
                        >
                          Track
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs px-2 py-1 h-auto"
                        onClick={() => handleDownloadInvoice(order.id)}
                      >
                        Invoice
                      </Button>

                      {order.status === "Delivered" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs px-2 py-1 h-auto"
                            onClick={() => handleReorder(order.id)}
                          >
                            Reorder
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs px-2 py-1 h-auto"
                            onClick={() => handleReturnRequest(order.id)}
                          >
                            Return
                          </Button>
                        </>
                      )}

                      {order.status === "Processing" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive text-xs px-2 py-1 h-auto"
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          Cancel
                        </Button>
                      )}

                      {order.status === "Shipped" && (
                        <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-auto">
                          Support
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Pagination (optional - add if needed) */}
          {filteredOrders.length > 0 && (
            <div className="mt-4 md:mt-8 flex justify-center">
              <div className="flex gap-1 md:gap-2">
                <Button variant="outline" size="sm" disabled className="text-xs px-2 py-1 h-auto">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground text-xs px-2 py-1 h-auto">
                  1
                </Button>
                <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-auto">
                  2
                </Button>
                <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-auto">
                  3
                </Button>
                <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-auto">
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
