
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedFlavors from "@/components/FeaturedFlavors";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <FeaturedFlavors />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
