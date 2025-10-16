import Image from "next/image";
import Header from "./myCopmonent/Header";
import Hero from "./myCopmonent/Hero";
import NewArrivals from "./myCopmonent/NewArrivals";
import CategoryNav from "./myCopmonent/watchBuy";
import BestSellers from "./myCopmonent/BestSellers";
import Footer from "./myCopmonent/Footer";
import CustomerReviews from "./myCopmonent/CTA";

export default function Home() {
  return (
    <div className="min-h-screen">
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20">
      <Header bgsetup="bg-transparent"/>
      <Hero />
    </div>
      <CategoryNav />
      <NewArrivals />
      <BestSellers />
      <CustomerReviews />
      <Footer />

      </div>
  );
}
