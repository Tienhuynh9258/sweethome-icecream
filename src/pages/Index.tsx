import React from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import HowItsMade from "../components/HowItsMade";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <Products />
      <HowItsMade />
      <Footer />
    </div>
  );
};

export default Index;
