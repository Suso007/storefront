"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Eye, User, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Footer from "../myCopmonent/Footer";
import Header from "../myCopmonent/Header";

interface CustomerPhoto {
  id: string;
  image: string;
  customerName: string;
  location: string;
  productId: string;
  productName: string;
  category: string;
  caption: string;
  likes: number;
  featured: boolean;
  size: "small" | "medium" | "large";
}

// Mock customer photos
const customerPhotos: CustomerPhoto[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop",
    customerName: "Anjali M.",
    location: "Delhi",
    productId: "prod-1",
    productName: "Sacred Mandala Wall Art",
    category: "Mandala Art",
    caption: "Absolutely love how this mandala transformed my meditation space! 🙏",
    likes: 245,
    featured: true,
    size: "large",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop",
    customerName: "Priya K.",
    location: "Mumbai",
    productId: "prod-2",
    productName: "Handcrafted Clay Earrings",
    category: "Handmade Jewellery",
    caption: "Perfect for everyday wear! Quality is amazing ✨",
    likes: 189,
    featured: true,
    size: "medium",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=800&fit=crop",
    customerName: "Sneha R.",
    location: "Bangalore",
    productId: "prod-3",
    productName: "Mirror Work Clutch",
    category: "Mirror Arts",
    caption: "Got so many compliments at the wedding! 💕",
    likes: 312,
    featured: false,
    size: "medium",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=600&h=600&fit=crop",
    customerName: "Divya S.",
    location: "Chennai",
    productId: "prod-4",
    productName: "Crochet Table Runner",
    category: "Crochet",
    caption: "Adds such a cozy touch to my dining table 🏡",
    likes: 156,
    featured: false,
    size: "small",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=800&fit=crop",
    customerName: "Rahul M.",
    location: "Pune",
    productId: "prod-5",
    productName: "Abstract Fluid Art Canvas",
    category: "Fluid Art",
    caption: "Statement piece for my living room! Worth every penny 🎨",
    likes: 428,
    featured: true,
    size: "large",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1602874801006-c2b14c17b0b3?w=600&h=600&fit=crop",
    customerName: "Neha P.",
    location: "Jaipur",
    productId: "prod-6",
    productName: "Lavender Aroma Candle Set",
    category: "Aroma Sanctuaries",
    caption: "Best candles I've ever owned! The scent is divine 🕯️",
    likes: 201,
    featured: false,
    size: "small",
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1601924638867-2a5e6c5d6c6f?w=600&h=800&fit=crop",
    customerName: "Meera L.",
    location: "Kolkata",
    productId: "prod-7",
    productName: "Embroidered Silk Scarf",
    category: "Embroidery",
    caption: "The craftsmanship is incredible! Such fine details 🧵",
    likes: 267,
    featured: true,
    size: "medium",
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop",
    customerName: "Kavya T.",
    location: "Hyderabad",
    productId: "prod-8",
    productName: "Geometric Mandala Coasters",
    category: "Mandala Art",
    caption: "Perfect housewarming gift! Everyone asks where I got them 🎁",
    likes: 178,
    featured: false,
    size: "small",
  },
  {
    id: "9",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=800&fit=crop",
    customerName: "Aarav S.",
    location: "Ahmedabad",
    productId: "prod-9",
    productName: "Bohemian Necklace Set",
    category: "Handmade Jewellery",
    caption: "Unique pieces that stand out! Love supporting artisans 💚",
    likes: 334,
    featured: true,
    size: "large",
  },
  {
    id: "10",
    image: "https://images.unsplash.com/photo-1618609378039-b572f64c5b42?w=600&h=600&fit=crop",
    customerName: "Ishita B.",
    location: "Lucknow",
    productId: "prod-10",
    productName: "Handwoven Dream Catcher",
    category: "Crochet",
    caption: "Brings such positive vibes to my bedroom ✨",
    likes: 192,
    featured: false,
    size: "medium",
  },
  {
    id: "11",
    image: "https://images.unsplash.com/photo-1590739225017-e8d5af733e4e?w=600&h=600&fit=crop",
    customerName: "Riya K.",
    location: "Surat",
    productId: "prod-11",
    productName: "Mirror Work Cushion Cover",
    category: "Mirror Arts",
    caption: "Transformed my boring couch! So pretty 🌟",
    likes: 145,
    featured: false,
    size: "small",
  },
  {
    id: "12",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=800&fit=crop",
    customerName: "Arjun V.",
    location: "Kochi",
    productId: "prod-12",
    productName: "Modern Fluid Art Print",
    category: "Fluid Art",
    caption: "Conversation starter in my office! 🖼️",
    likes: 298,
    featured: false,
    size: "medium",
  },
  {
    id: "13",
    image: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=600&h=800&fit=crop",
    customerName: "Pooja M.",
    location: "Chandigarh",
    productId: "prod-13",
    productName: "Crochet Baby Blanket",
    category: "Crochet",
    caption: "So soft and beautifully made! Perfect for my newborn 👶",
    likes: 423,
    featured: true,
    size: "large",
  },
  {
    id: "14",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop",
    customerName: "Vikram S.",
    location: "Indore",
    productId: "prod-14",
    productName: "Sandalwood Scented Candles",
    category: "Aroma Sanctuaries",
    caption: "Creates such a calming atmosphere! 🧘‍♂️",
    likes: 167,
    featured: false,
    size: "small",
  },
  {
    id: "15",
    image: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=600&h=800&fit=crop",
    customerName: "Sanya P.",
    location: "Vadodara",
    productId: "prod-15",
    productName: "Kashmiri Embroidered Shawl",
    category: "Embroidery",
    caption: "Heirloom quality! Will treasure this forever 💎",
    likes: 389,
    featured: true,
    size: "medium",
  },
  {
    id: "16",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=600&fit=crop",
    customerName: "Kiran D.",
    location: "Nagpur",
    productId: "prod-16",
    productName: "Beaded Anklet Set",
    category: "Handmade Jewellery",
    caption: "Delicate and beautiful! Perfect summer accessory ☀️",
    likes: 134,
    featured: false,
    size: "small",
  },
  {
    id: "17",
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=800&fit=crop",
    customerName: "Aditi R.",
    location: "Mysore",
    productId: "prod-17",
    productName: "Macrame Wall Hanging",
    category: "Crochet",
    caption: "Adds so much character to my room! Love it 🌿",
    likes: 256,
    featured: false,
    size: "large",
  },
  {
    id: "18",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop",
    customerName: "Rohan K.",
    location: "Coimbatore",
    productId: "prod-18",
    productName: "Ocean Waves Fluid Art",
    category: "Fluid Art",
    caption: "The colors are mesmerizing! 🌊",
    likes: 312,
    featured: true,
    size: "medium",
  },
  {
    id: "19",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop",
    customerName: "Tanvi S.",
    location: "Bhopal",
    productId: "prod-19",
    productName: "Lotus Mandala Canvas",
    category: "Mandala Art",
    caption: "Spiritual and stunning! Perfect for my yoga studio 🧘‍♀️",
    likes: 445,
    featured: true,
    size: "large",
  },
  {
    id: "20",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=600&fit=crop",
    customerName: "Lakshmi N.",
    location: "Visakhapatnam",
    productId: "prod-20",
    productName: "Rajasthani Mirror Work Bag",
    category: "Mirror Arts",
    caption: "Unique and eye-catching! Gets noticed everywhere 👜",
    likes: 278,
    featured: false,
    size: "small",
  },
  {
    id: "21",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=800&fit=crop",
    customerName: "Shruti M.",
    location: "Nashik",
    productId: "prod-21",
    productName: "Silver Oxidized Earrings",
    category: "Handmade Jewellery",
    caption: "Indo-western fusion at its best! 💫",
    likes: 201,
    featured: false,
    size: "medium",
  },
  {
    id: "22",
    image: "https://images.unsplash.com/photo-1602874801006-c2b14c17b0b3?w=600&h=600&fit=crop",
    customerName: "Amit P.",
    location: "Rajkot",
    productId: "prod-22",
    productName: "Rose & Jasmine Candle Trio",
    category: "Aroma Sanctuaries",
    caption: "Gift set goals! Everyone loved these 🎁",
    likes: 189,
    featured: false,
    size: "small",
  },
  {
    id: "23",
    image: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=600&h=800&fit=crop",
    customerName: "Nisha V.",
    location: "Thiruvananthapuram",
    productId: "prod-23",
    productName: "Crochet Doily Set",
    category: "Crochet",
    caption: "Vintage charm for modern homes! 🏠",
    likes: 167,
    featured: false,
    size: "medium",
  },
  {
    id: "24",
    image: "https://images.unsplash.com/photo-1601924638867-2a5e6c5d6c6f?w=600&h=600&fit=crop",
    customerName: "Deepika L.",
    location: "Ludhiana",
    productId: "prod-24",
    productName: "Phulkari Embroidered Dupatta",
    category: "Embroidery",
    caption: "Traditional meets contemporary! Absolutely gorgeous 🌸",
    likes: 356,
    featured: true,
    size: "small",
  },
  {
    id: "25",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=800&fit=crop",
    customerName: "Kartik J.",
    location: "Gurgaon",
    productId: "prod-25",
    productName: "Galaxy Abstract Painting",
    category: "Fluid Art",
    caption: "Out of this world! My guests can't stop staring 🌌",
    likes: 512,
    featured: true,
    size: "large",
  },
  {
    id: "26",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=600&fit=crop",
    customerName: "Zara K.",
    location: "Noida",
    productId: "prod-26",
    productName: "Tribal Pendant Necklace",
    category: "Handmade Jewellery",
    caption: "Statement piece that elevates any outfit! 👗",
    likes: 234,
    featured: false,
    size: "medium",
  },
  {
    id: "27",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop",
    customerName: "Varun B.",
    location: "Faridabad",
    productId: "prod-27",
    productName: "Chakra Mandala Wall Decor",
    category: "Mandala Art",
    caption: "Brings positive energy to my workspace! 🔆",
    likes: 198,
    featured: false,
    size: "small",
  },
  {
    id: "28",
    image: "https://images.unsplash.com/photo-1590739225017-e8d5af733e4e?w=600&h=800&fit=crop",
    customerName: "Gayatri S.",
    location: "Patna",
    productId: "prod-28",
    productName: "Mirror Work Table Mat",
    category: "Mirror Arts",
    caption: "Functional art! Makes every meal special 🍽️",
    likes: 176,
    featured: false,
    size: "medium",
  },
  {
    id: "29",
    image: "https://images.unsplash.com/photo-1618609378039-b572f64c5b42?w=600&h=600&fit=crop",
    customerName: "Rahul D.",
    location: "Ranchi",
    productId: "prod-29",
    productName: "Boho Dream Catcher Trio",
    category: "Crochet",
    caption: "Sweet dreams guaranteed! 😴💤",
    likes: 223,
    featured: false,
    size: "small",
  },
  {
    id: "30",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=800&fit=crop",
    customerName: "Simran K.",
    location: "Amritsar",
    productId: "prod-30",
    productName: "Eucalyptus Mint Candle",
    category: "Aroma Sanctuaries",
    caption: "Spa vibes at home! So refreshing 🌿",
    likes: 267,
    featured: false,
    size: "large",
  },
  {
    id: "31",
    image: "https://images.unsplash.com/photo-1601924638867-2a5e6c5d6c6f?w=600&h=600&fit=crop",
    customerName: "Manisha P.",
    location: "Kanpur",
    productId: "prod-31",
    productName: "Chikankari Cushion Covers",
    category: "Embroidery",
    caption: "Lucknow's finest craft! Worth every rupee 💰",
    likes: 198,
    featured: false,
    size: "small",
  },
  {
    id: "32",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=800&fit=crop",
    customerName: "Aditya M.",
    location: "Ghaziabad",
    productId: "prod-32",
    productName: "Fire & Ice Fluid Painting",
    category: "Fluid Art",
    caption: "The contrast is incredible! 🔥❄️",
    likes: 389,
    featured: true,
    size: "medium",
  },
  {
    id: "33",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop",
    customerName: "Priyanka R.",
    location: "Meerut",
    productId: "prod-33",
    productName: "Kundan Choker Set",
    category: "Handmade Jewellery",
    caption: "Bridal quality at affordable prices! 👰",
    likes: 445,
    featured: true,
    size: "small",
  },
  {
    id: "34",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop",
    customerName: "Harsh V.",
    location: "Agra",
    productId: "prod-34",
    productName: "Sacred Geometry Mandala",
    category: "Mandala Art",
    caption: "Mathematical perfection in art form! 📐",
    likes: 234,
    featured: false,
    size: "large",
  },
  {
    id: "35",
    image: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=600&h=600&fit=crop",
    customerName: "Anjali K.",
    location: "Varanasi",
    productId: "prod-35",
    productName: "Crochet Coasters Set",
    category: "Crochet",
    caption: "Practical and pretty! 🎨",
    likes: 156,
    featured: false,
    size: "medium",
  },
  {
    id: "36",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=600&fit=crop",
    customerName: "Sakshi M.",
    location: "Jodhpur",
    productId: "prod-36",
    productName: "Rajasthani Mirror Potli",
    category: "Mirror Arts",
    caption: "Traditional meets trendy! Love it 👛",
    likes: 212,
    featured: false,
    size: "small",
  },
  {
    id: "37",
    image: "https://images.unsplash.com/photo-1602874801006-c2b14c17b0b3?w=600&h=800&fit=crop",
    customerName: "Yash S.",
    location: "Udaipur",
    productId: "prod-37",
    productName: "Mogra & Rose Candle Set",
    category: "Aroma Sanctuaries",
    caption: "Smells like a garden in bloom! 🌹",
    likes: 298,
    featured: false,
    size: "medium",
  },
  {
    id: "38",
    image: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=600&h=600&fit=crop",
    customerName: "Ritika P.",
    location: "Jamshedpur",
    productId: "prod-38",
    productName: "Kantha Stitch Table Runner",
    category: "Embroidery",
    caption: "Bengali artistry at its finest! 🎭",
    likes: 187,
    featured: false,
    size: "small",
  },
  {
    id: "39",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=800&fit=crop",
    customerName: "Kunal J.",
    location: "Raipur",
    productId: "prod-39",
    productName: "Marble Effect Art Panel",
    category: "Fluid Art",
    caption: "Luxury vibes on a budget! 💎",
    likes: 367,
    featured: true,
    size: "large",
  },
  {
    id: "40",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=600&fit=crop",
    customerName: "Diya T.",
    location: "Dehradun",
    productId: "prod-40",
    productName: "Bohemian Layered Necklace",
    category: "Handmade Jewellery",
    caption: "Boho chic perfection! 🌼",
    likes: 289,
    featured: false,
    size: "medium",
  },
  {
    id: "41",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop",
    customerName: "Aryan M.",
    location: "Shimla",
    productId: "prod-41",
    productName: "Mountain Mandala Art",
    category: "Mandala Art",
    caption: "Himalayan inspiration! 🏔️",
    likes: 234,
    featured: false,
    size: "small",
  },
  {
    id: "42",
    image: "https://images.unsplash.com/photo-1618609378039-b572f64c5b42?w=600&h=800&fit=crop",
    customerName: "Kavita S.",
    location: "Srinagar",
    productId: "prod-42",
    productName: "Handmade Macrame Plant Hanger",
    category: "Crochet",
    caption: "Urban jungle approved! 🌱",
    likes: 312,
    featured: false,
    size: "medium",
  },
  {
    id: "43",
    image: "https://images.unsplash.com/photo-1590739225017-e8d5af733e4e?w=600&h=600&fit=crop",
    customerName: "Neelam R.",
    location: "Jammu",
    productId: "prod-43",
    productName: "Shisha Mirror Work Saree",
    category: "Mirror Arts",
    caption: "Showstopper material! ✨",
    likes: 478,
    featured: true,
    size: "small",
  },
  {
    id: "44",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop",
    customerName: "Siddharth K.",
    location: "Manali",
    productId: "prod-44",
    productName: "Pine & Cedar Candles",
    category: "Aroma Sanctuaries",
    caption: "Forest in a jar! 🌲",
    likes: 201,
    featured: false,
    size: "small",
  },
  {
    id: "45",
    image: "https://images.unsplash.com/photo-1601924638867-2a5e6c5d6c6f?w=600&h=800&fit=crop",
    customerName: "Tara M.",
    location: "Pondicherry",
    productId: "prod-45",
    productName: "French Knot Embroidery Art",
    category: "Embroidery",
    caption: "Patience and skill on display! 🪡",
    likes: 345,
    featured: false,
    size: "large",
  },
  {
    id: "46",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop",
    customerName: "Kabir V.",
    location: "Goa",
    productId: "prod-46",
    productName: "Beach Sunset Fluid Art",
    category: "Fluid Art",
    caption: "Goan vibes forever! 🌅",
    likes: 423,
    featured: true,
    size: "medium",
  },
  {
    id: "47",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop",
    customerName: "Isha P.",
    location: "Panaji",
    productId: "prod-47",
    productName: "Shell & Bead Anklet",
    category: "Handmade Jewellery",
    caption: "Beach babe essentials! 🐚",
    likes: 267,
    featured: false,
    size: "small",
  },
  {
    id: "48",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop",
    customerName: "Vivek R.",
    location: "Gangtok",
    productId: "prod-48",
    productName: "Tibetan Mandala Thangka",
    category: "Mandala Art",
    caption: "Spiritual masterpiece! 🙏",
    likes: 389,
    featured: false,
    size: "large",
  },
  {
    id: "49",
    image: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=600&h=600&fit=crop",
    customerName: "Palak S.",
    location: "Shillong",
    productId: "prod-49",
    productName: "Crochet Baby Booties",
    category: "Crochet",
    caption: "Too cute to handle! 👶💕",
    likes: 312,
    featured: false,
    size: "small",
  },
  {
    id: "50",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=800&fit=crop",
    customerName: "Chirag M.",
    location: "Imphal",
    productId: "prod-50",
    productName: "Traditional Mirror Jacket",
    category: "Mirror Arts",
    caption: "Festival fashion winner! 🎊",
    likes: 456,
    featured: true,
    size: "medium",
  },
  {
    id: "51",
    image: "https://images.unsplash.com/photo-1602874801006-c2b14c17b0b3?w=600&h=600&fit=crop",
    customerName: "Rhea K.",
    location: "Aizawl",
    productId: "prod-51",
    productName: "Lemongrass & Ginger Candles",
    category: "Aroma Sanctuaries",
    caption: "Energizing and refreshing! ⚡",
    likes: 234,
    featured: false,
    size: "small",
  },
  {
    id: "52",
    image: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=600&h=600&fit=crop",
    customerName: "Dev P.",
    location: "Kohima",
    productId: "prod-52",
    productName: "Naga Tribal Embroidery",
    category: "Embroidery",
    caption: "Cultural heritage preserved! 🎨",
    likes: 298,
    featured: false,
    size: "medium",
  },
  {
    id: "53",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=800&fit=crop",
    customerName: "Ananya R.",
    location: "Itanagar",
    productId: "prod-53",
    productName: "Nature Inspired Fluid Art",
    category: "Fluid Art",
    caption: "Brings the outdoors inside! 🌿",
    likes: 367,
    featured: false,
    size: "large",
  },
  {
    id: "54",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=600&fit=crop",
    customerName: "Vishal S.",
    location: "Dibrugarh",
    productId: "prod-54",
    productName: "Assamese Gamosa Earrings",
    category: "Handmade Jewellery",
    caption: "Cultural pride in jewelry form! 🔴⚪",
    likes: 289,
    featured: false,
    size: "small",
  },
  {
    id: "55",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop",
    customerName: "Nandini M.",
    location: "Silchar",
    productId: "prod-55",
    productName: "Flower of Life Mandala",
    category: "Mandala Art",
    caption: "Sacred geometry at its best! 🌸",
    likes: 412,
    featured: true,
    size: "medium",
  },
];

const categories = ["All", "Mandala Art", "Handmade Jewellery", "Mirror Arts", "Crochet", "Embroidery", "Fluid Art", "Aroma Sanctuaries"];

function PhotoCard({ photo }: { photo: CustomerPhoto }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/shop/${photo.productId}`}>
      <Card
        className={`group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 hover:border-primary/30 p-0 ${
          photo.size === "large" ? "row-span-2" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden">
          {/* Image */}
          <img
            src={photo.image}
            alt={photo.productName}
            className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
              photo.size === "large"
                ? "h-[400px] md:h-[500px]"
                : photo.size === "medium"
                ? "h-[280px] md:h-[320px]"
                : "h-[200px] md:h-[240px]"
            }`}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Featured Badge */}
          {photo.featured && (
            <Badge className="absolute top-3 right-3 bg-primary text-white text-[10px] md:text-xs">
              ⭐ Featured
            </Badge>
          )}

          {/* Like Button */}
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-3 left-3 h-8 w-8 md:h-9 md:w-9 rounded-full bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
          >
            <Heart
              className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
            />
          </Button>

          {/* Hover Actions */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button
              size="sm"
              variant="secondary"
              className="rounded-full bg-white/90 hover:bg-white text-xs md:text-sm"
              onClick={(e) => {
                e.preventDefault();
                // Quick view functionality
              }}
            >
              <Eye className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              Quick View
            </Button>
            <Button
              size="sm"
              className="rounded-full bg-primary hover:bg-primary/90 text-xs md:text-sm"
              onClick={(e) => {
                e.preventDefault();
                // Add to cart functionality
              }}
            >
              <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              Add to Cart
            </Button>
          </div>

          {/* Info Overlay */}
          <CardContent className="absolute inset-x-0 bottom-0 p-3 md:p-4 text-white space-y-2">
            {/* Customer Info */}
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <User className="h-3 w-3 md:h-4 md:w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{photo.customerName}</p>
                <p className="text-[10px] md:text-xs text-white/80 flex items-center gap-1">
                  <MapPin className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  {photo.location}
                </p>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-1">
              <Badge
                variant="secondary"
                className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 text-[10px] md:text-xs"
              >
                {photo.category}
              </Badge>
              <h3 className="font-semibold text-sm md:text-base line-clamp-1">
                {photo.productName}
              </h3>
              <p className="text-xs md:text-sm text-white/90 line-clamp-2">
                {photo.caption}
              </p>
            </div>

            {/* Likes */}
            <div className="flex items-center gap-1 text-xs md:text-sm">
              <Heart className="h-3 w-3 md:h-4 md:w-4 fill-white/80" />
              <span>{photo.likes} likes</span>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}

export default function CustomersPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  // Filter photos
  const filteredPhotos = customerPhotos.filter((photo) =>
    selectedCategory === "All" ? true : photo.category === selectedCategory
  );

  // Sort photos
  const sortedPhotos = [...filteredPhotos].sort((a, b) => {
    switch (sortBy) {
      case "likes":
        return b.likes - a.likes;
      case "featured":
      default:
        return b.featured === a.featured ? 0 : b.featured ? 1 : -1;
    }
  });

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-background">
      {/* Call to Action */}
      <section className="py-8 md:py-12 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h2 className="text-xl md:text-2xl font-bold">
              Share Your Inloom Story
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              Tag us on Instagram{" "}
              <span className="text-primary font-semibold">@inloom</span> or use{" "}
              <span className="text-primary font-semibold">#MyInloomStory</span>{" "}
              to be featured!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button variant="outline" className="rounded-full" asChild>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="ri-instagram-line mr-2"></i>
                  Follow on Instagram
                </a>
              </Button>
              <Button className="rounded-full bg-primary hover:bg-primary/90">
                <i className="ri-camera-line mr-2"></i>
                Share Your Photo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b py-3 md:py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 sm:pb-0 w-full sm:w-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full text-xs whitespace-nowrap flex-shrink-0 ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                Sort by:
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[120px] text-xs h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="likes">Most Liked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery - Masonry Grid */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <p className="text-xs md:text-sm text-muted-foreground">
              {sortedPhotos.length} customer photo{sortedPhotos.length !== 1 ? "s" : ""}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
          </div>

          {/* Masonry Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 auto-rows-auto">
            {sortedPhotos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>

          {/* No Results */}
          {sortedPhotos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No customer photos in this category yet
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
    <Footer/>
    </>
  );
}
