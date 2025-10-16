"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  MapPin,
  Lock,
  CheckCircle,
  Gift,
  Tag,
  Edit3,
} from "lucide-react";
import Header from "../myCopmonent/Header";

interface CheckoutItem {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  variant?: {
    size?: string;
    color?: string;
  };
}

interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'netbanking' | 'cod';
  name: string;
  icon: string;
  description: string;
}

// Mock checkout data
const mockCheckoutItems: CheckoutItem[] = [
  {
    id: 1,
    name: "Sacred Mandala Necklace with Turquoise Stone",
    category: "Handmade Jewellery",
    price: 2499,
    originalPrice: 3199,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    quantity: 1,
    variant: { size: "Medium", color: "Silver" },
  },
  {
    id: 2,
    name: "Hand-embroidered Silk Scarf",
    category: "Embroidery",
    price: 1899,
    image: "https://images.unsplash.com/photo-1611652022419-c4b13b1a76c2?w=400&h=400&fit=crop",
    quantity: 2,
    variant: { color: "Royal Blue" },
  },
  {
    id: 3,
    name: "Lavender Aroma Candle Set (Pack of 3)",
    category: "Aroma Sanctuaries",
    price: 899,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1602874801007-62ccadb2761f?w=400&h=400&fit=crop",
    quantity: 1,
  },
];

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    type: 'card',
    name: 'Credit/Debit Card',
    icon: '💳',
    description: 'Visa, Mastercard, RuPay accepted'
  },
  {
    id: 'upi',
    type: 'upi',
    name: 'UPI Payment',
    icon: '📱',
    description: 'Pay using any UPI app'
  },
  {
    id: 'netbanking',
    type: 'netbanking',
    name: 'Net Banking',
    icon: '🏦',
    description: 'All major banks supported'
  },
  {
    id: 'cod',
    type: 'cod',
    name: 'Cash on Delivery',
    icon: '💰',
    description: 'Pay when you receive'
  }
];

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Chandigarh",
  "Andaman and Nicobar Islands", "Dadra and Nagar Haveli", "Daman and Diu", "Lakshadweep"
];

function CheckoutSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-4">
        <Skeleton className="h-64 w-full rounded-lg" />
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-64 w-full rounded-lg" />
        <Skeleton className="h-48 w-full rounded-lg" />
      </div>
    </div>
  );
}

function OrderSummaryItem({ item }: { item: CheckoutItem }) {
  const discount = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  return (
    <div className="flex gap-3">
      <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-[10px] md:text-xs font-semibold">
          {item.quantity}
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-xs md:text-sm line-clamp-2 leading-tight mb-1">
          {item.name}
        </h4>
        <p className="text-[10px] md:text-xs text-muted-foreground mb-1">
          {item.category}
        </p>
        
        {item.variant && (
          <div className="flex gap-1 mb-1">
            {item.variant.size && (
              <Badge variant="outline" className="text-[8px] md:text-[10px] px-1 py-0 h-4">
                {item.variant.size}
              </Badge>
            )}
            {item.variant.color && (
              <Badge variant="outline" className="text-[8px] md:text-[10px] px-1 py-0 h-4">
                {item.variant.color}
              </Badge>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-xs md:text-sm font-bold text-primary">
              ₹{(item.price * item.quantity).toLocaleString()}
            </span>
            {item.originalPrice && (
              <span className="text-[10px] md:text-xs text-muted-foreground line-through">
                ₹{(item.originalPrice * item.quantity).toLocaleString()}
              </span>
            )}
          </div>
          {discount > 0 && (
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-[8px] md:text-[10px]">
              -{discount}% off
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Form states
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });
  
  const [billingIsSame, setBillingIsSame] = useState(true);
  const [saveAddress, setSaveAddress] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [promoCode, setPromoCode] = useState("WELCOME10");
  const [promoDiscount] = useState(10);

  // Load checkout data
  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckoutItems(mockCheckoutItems);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Calculate totals
  const subtotal = checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = checkoutItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + ((item.originalPrice - item.price) * item.quantity);
    }
    return sum;
  }, 0);
  const promoDiscountAmount = (subtotal * promoDiscount) / 100;
  const shipping = subtotal >= 1000 ? 0 : 99;
  const gst = Math.round((subtotal - promoDiscountAmount) * 0.18);
  const total = subtotal - promoDiscountAmount + shipping + gst;

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          shippingAddress.fullName &&
          shippingAddress.email &&
          shippingAddress.phone &&
          shippingAddress.addressLine1 &&
          shippingAddress.city &&
          shippingAddress.state &&
          shippingAddress.pincode
        );
      case 2:
        return !!selectedPaymentMethod;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePlaceOrder = async () => {
    if (!agreeTerms) {
      alert("Please agree to terms and conditions");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      setCurrentStep(4);
    }, 3000);
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-4 md:py-8">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-8 w-32" />
            </div>
            <CheckoutSkeleton />
          </div>
        </div>
      </>
    );
  }

  if (orderPlaced) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 md:h-12 md:w-12 text-green-600" />
              </div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
                Order Placed Successfully!
              </h1>
              <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base px-4">
                Thank you for your purchase! Your order has been confirmed and will be processed shortly.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 md:p-6 mb-6 md:mb-8">
                <div className="flex justify-between items-center text-sm md:text-base">
                  <span className="font-medium">Order ID:</span>
                  <span className="font-mono">#INL{Date.now().toString().slice(-6)}</span>
                </div>
                <div className="flex justify-between items-center text-sm md:text-base mt-2">
                  <span className="font-medium">Total Amount:</span>
                  <span className="font-bold text-primary">₹{total.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Button onClick={() => router.push("/account/orders")} size="lg" className="w-full sm:w-auto">
                  Track Your Order
                </Button>
                <Button variant="outline" onClick={() => router.push("/shop")} size="lg" className="w-full sm:w-auto">
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 md:gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="hover:bg-muted h-8 w-8 md:h-10 md:w-10"
              >
                <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <div>
                <h1 className="text-md md:text-2xl font-bold">
                  Checkout
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {checkoutItems.length} item{checkoutItems.length !== 1 ? 's' : ''} • Step {currentStep} of 3
                </p>
              </div>
            </div>

            {/* Trust Badges - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Shield className="h-3 w-3 text-green-600" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Truck className="h-3 w-3 text-blue-600" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-4">
            <div className="flex items-center justify-center">
              {[1, 2, 3].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full text-xs md:text-sm font-semibold
                    ${step <= currentStep 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {step < currentStep ? (
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      step
                    )}
                  </div>
                  <div className="hidden md:block mx-2 text-xs font-medium">
                    {step === 1 && 'Shipping'}
                    {step === 2 && 'Payment'}
                    {step === 3 && 'Review'}
                  </div>
                  {index < 2 && (
                    <div className={`
                      w-8 md:w-16 h-0.5 mx-2
                      ${step < currentStep ? 'bg-primary' : 'bg-muted'}
                    `} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base md:text-lg flex items-center gap-2">
                      <Truck className="h-4 w-4 md:h-5 md:w-5" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 md:space-y-6">
                    {/* Contact Information */}
                    <div className="space-y-3 md:space-y-4">
                      <h3 className="text-sm md:text-base font-semibold">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <div className="space-y-1 md:space-y-2">
                          <Label htmlFor="fullName" className="text-xs md:text-sm">Full Name *</Label>
                          <Input
                            id="fullName"
                            placeholder="Enter your full name"
                            value={shippingAddress.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            className="text-sm"
                          />
                        </div>
                        <div className="space-y-1 md:space-y-2">
                          <Label htmlFor="email" className="text-xs md:text-sm">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={shippingAddress.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="text-sm"
                          />
                        </div>
                      </div>
                      <div className="space-y-1 md:space-y-2">
                        <Label htmlFor="phone" className="text-xs md:text-sm">Phone Number *</Label>
                        <Input
                          id="phone"
                          placeholder="Enter your phone number"
                          value={shippingAddress.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="text-sm"
                        />
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="space-y-3 md:space-y-4">
                      <h3 className="text-sm md:text-base font-semibold">Shipping Address</h3>
                      <div className="space-y-3 md:space-y-4">
                        <div className="space-y-1 md:space-y-2">
                          <Label htmlFor="addressLine1" className="text-xs md:text-sm">Address Line 1 *</Label>
                          <Input
                            id="addressLine1"
                            placeholder="House number, street name"
                            value={shippingAddress.addressLine1}
                            onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                            className="text-sm"
                          />
                        </div>
                        <div className="space-y-1 md:space-y-2">
                          <Label htmlFor="addressLine2" className="text-xs md:text-sm">Address Line 2</Label>
                          <Input
                            id="addressLine2"
                            placeholder="Apartment, suite, etc. (optional)"
                            value={shippingAddress.addressLine2}
                            onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                            className="text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                          <div className="space-y-1 md:space-y-2">
                            <Label htmlFor="city" className="text-xs md:text-sm">City *</Label>
                            <Input
                              id="city"
                              placeholder="City"
                              value={shippingAddress.city}
                              onChange={(e) => handleInputChange('city', e.target.value)}
                              className="text-sm"
                            />
                          </div>
                          <div className="space-y-1 md:space-y-2">
                            <Label htmlFor="state" className="text-xs md:text-sm">State *</Label>
                            <Select
                              value={shippingAddress.state}
                              onValueChange={(value) => handleInputChange('state', value)}
                            >
                              <SelectTrigger className="text-sm">
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                              <SelectContent>
                                {indianStates.map((state) => (
                                  <SelectItem key={state} value={state} className="text-sm">
                                    {state}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1 md:space-y-2">
                            <Label htmlFor="pincode" className="text-xs md:text-sm">PIN Code *</Label>
                            <Input
                              id="pincode"
                              placeholder="000000"
                              value={shippingAddress.pincode}
                              onChange={(e) => handleInputChange('pincode', e.target.value)}
                              className="text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="billingIsSame"
                          checked={billingIsSame}
                          onCheckedChange={(checked) => setBillingIsSame(checked === true)}
                        />
                        <Label htmlFor="billingIsSame" className="text-xs md:text-sm">
                          Billing address is same as shipping address
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="saveAddress"
                          checked={saveAddress}
                          onCheckedChange={(checked) => setSaveAddress(checked === true)}
                        />
                        <Label htmlFor="saveAddress" className="text-xs md:text-sm">
                          Save this address for future orders
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Payment Method */}
              {currentStep === 2 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base md:text-lg flex items-center gap-2">
                      <CreditCard className="h-4 w-4 md:h-5 md:w-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 md:space-y-6">
                    {/* Payment Methods */}
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`
                            border rounded-lg p-3 md:p-4 cursor-pointer transition-all
                            ${selectedPaymentMethod === method.id 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50'
                            }
                          `}
                          onClick={() => setSelectedPaymentMethod(method.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-lg md:text-xl">{method.icon}</div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-xs md:text-sm">{method.name}</h4>
                                {selectedPaymentMethod === method.id && (
                                  <CheckCircle className="h-4 w-4 text-primary" />
                                )}
                              </div>
                              <p className="text-[10px] md:text-xs text-muted-foreground">
                                {method.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Card Details Form */}
                    {selectedPaymentMethod === 'card' && (
                      <div className="space-y-3 md:space-y-4 pt-4 border-t">
                        <h4 className="font-medium text-sm md:text-base">Card Details</h4>
                        <div className="space-y-3 md:space-y-4">
                          <div className="space-y-1 md:space-y-2">
                            <Label htmlFor="cardNumber" className="text-xs md:text-sm">Card Number</Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              className="text-sm"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3 md:gap-4">
                            <div className="space-y-1 md:space-y-2">
                              <Label htmlFor="expiryDate" className="text-xs md:text-sm">Expiry Date</Label>
                              <Input
                                id="expiryDate"
                                placeholder="MM/YY"
                                className="text-sm"
                              />
                            </div>
                            <div className="space-y-1 md:space-y-2">
                              <Label htmlFor="cvv" className="text-xs md:text-sm">CVV</Label>
                              <Input
                                id="cvv"
                                placeholder="123"
                                className="text-sm"
                              />
                            </div>
                          </div>
                          <div className="space-y-1 md:space-y-2">
                            <Label htmlFor="cardName" className="text-xs md:text-sm">Cardholder Name</Label>
                            <Input
                              id="cardName"
                              placeholder="Name as on card"
                              className="text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* UPI Details */}
                    {selectedPaymentMethod === 'upi' && (
                      <div className="space-y-3 md:space-y-4 pt-4 border-t">
                        <h4 className="font-medium text-sm md:text-base">UPI Details</h4>
                        <div className="space-y-1 md:space-y-2">
                          <Label htmlFor="upiId" className="text-xs md:text-sm">UPI ID</Label>
                          <Input
                            id="upiId"
                            placeholder="yourname@upi"
                            className="text-sm"
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <div className="space-y-4 md:space-y-6">
                  {/* Order Items */}
                  <Card>
                    <CardHeader className="pb-3 md:pb-6">
                      <CardTitle className="text-base md:text-lg">Review Your Order</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 md:space-y-4">
                      {checkoutItems.map((item) => (
                        <OrderSummaryItem key={item.id} item={item} />
                      ))}
                    </CardContent>
                  </Card>

                  {/* Shipping Address Summary */}
                  <Card>
                    <CardHeader className="pb-3 md:pb-6">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base md:text-lg flex items-center gap-2">
                          <MapPin className="h-4 w-4 md:h-5 md:w-5" />
                          Shipping Address
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentStep(1)}
                          className="text-xs"
                        >
                          <Edit3 className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs md:text-sm space-y-1">
                        <p className="font-medium">{shippingAddress.fullName}</p>
                        <p>{shippingAddress.addressLine1}</p>
                        {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
                        <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.pincode}</p>
                        <p>{shippingAddress.phone}</p>
                        <p>{shippingAddress.email}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Method Summary */}
                  <Card>
                    <CardHeader className="pb-3 md:pb-6">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base md:text-lg flex items-center gap-2">
                          <CreditCard className="h-4 w-4 md:h-5 md:w-5" />
                          Payment Method
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentStep(2)}
                          className="text-xs"
                        >
                          <Edit3 className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <span className="text-lg">
                          {paymentMethods.find(m => m.id === selectedPaymentMethod)?.icon}
                        </span>
                        <div>
                          <p className="font-medium text-xs md:text-sm">
                            {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
                          </p>
                          <p className="text-[10px] md:text-xs text-muted-foreground">
                            {paymentMethods.find(m => m.id === selectedPaymentMethod)?.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Terms & Conditions */}
                  <Card>
                    <CardContent className="pt-4 md:pt-6">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="agreeTerms"
                          checked={agreeTerms}
                          onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                          className="mt-1"
                        />
                        <Label htmlFor="agreeTerms" className="text-xs md:text-sm leading-relaxed">
                          I agree to the{' '}
                          <a href="#" className="text-primary hover:underline">
                            Terms & Conditions
                          </a>{' '}
                          and{' '}
                          <a href="#" className="text-primary hover:underline">
                            Privacy Policy
                          </a>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Remove navigation buttons from here - they'll be moved to bottom */}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Card>
                <CardHeader className="pb-3 md:pb-6">
                  <CardTitle className="text-base md:text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4">
                  {/* Items Summary - Mobile */}
                  <div className="lg:hidden space-y-3">
                    <div className="text-xs md:text-sm font-medium">
                      {checkoutItems.length} item{checkoutItems.length !== 1 ? 's' : ''} in your order
                    </div>
                    <div className="max-h-32 overflow-y-auto space-y-2">
                      {checkoutItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-8 h-8 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-medium line-clamp-1">{item.name}</p>
                            <p className="text-[9px] text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <span className="text-[10px] font-bold">₹{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Promo Code */}
                  {promoCode && (
                    <div className="flex items-center justify-between p-2 md:p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-1 md:gap-2">
                        <Tag className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
                        <span className="font-medium text-green-800 dark:text-green-200 text-xs md:text-sm">
                          {promoCode} applied
                        </span>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-[10px]">
                          -{promoDiscount}%
                        </Badge>
                      </div>
                    </div>
                  )}

                  {/* Price Breakdown */}
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex justify-between text-xs md:text-sm">
                      <span>Subtotal ({checkoutItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    
                    {savings > 0 && (
                      <div className="flex justify-between text-xs md:text-sm text-green-600">
                        <span>You save</span>
                        <span>-₹{savings.toLocaleString()}</span>
                      </div>
                    )}
                    
                    {promoDiscountAmount > 0 && (
                      <div className="flex justify-between text-xs md:text-sm text-green-600">
                        <span>Promo discount ({promoDiscount}%)</span>
                        <span>-₹{promoDiscountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-xs md:text-sm">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? "text-green-600" : ""}>
                        {shipping === 0 ? "FREE" : `₹${shipping}`}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-xs md:text-sm">
                      <span>GST (18%)</span>
                      <span>₹{gst.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="border-t pt-2 md:pt-3">
                    <div className="flex justify-between font-semibold text-base md:text-lg">
                      <span>Total</span>
                      <span className="text-primary">₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="flex justify-center gap-3 md:gap-4 pt-3 md:pt-4 border-t">
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-muted-foreground">
                      <Shield className="h-2.5 w-2.5 md:h-3 md:w-3 text-green-600" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-muted-foreground">
                      <Truck className="h-2.5 w-2.5 md:h-3 md:w-3 text-blue-600" />
                      <span>Fast Delivery</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-muted-foreground">
                      <Gift className="h-2.5 w-2.5 md:h-3 md:w-3 text-purple-600" />
                      <span>Gift Wrap</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Add bottom padding to prevent content from being hidden behind fixed buttons */}
          <div className="h-20 md:h-16"></div>
        </div>
        
        {/* Fixed Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-50">
          <div className="container mx-auto px-4 py-3 md:py-4">
            <div className="flex justify-between items-center max-w-4xl mx-auto">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="text-xs md:text-sm h-10 md:h-11 px-4 md:px-6"
              >
                <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Previous
              </Button>
              
              {/* Step indicator for mobile */}
              <div className="flex md:hidden items-center gap-1">
                <span className="text-xs text-muted-foreground">
                  Step {currentStep} of 3
                </span>
              </div>
              
              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={!validateStep(currentStep)}
                  className="text-xs md:text-sm h-10 md:h-11 px-4 md:px-6"
                >
                  Next
                  <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 ml-1 md:ml-2 rotate-180" />
                </Button>
              ) : (
                <Button
                  onClick={handlePlaceOrder}
                  disabled={!agreeTerms || isProcessing}
                  className="text-xs md:text-sm h-10 md:h-11 px-4 md:px-6"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 md:h-4 md:w-4 border-b-2 border-white mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      Place Order
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}