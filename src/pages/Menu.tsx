
import FeaturedFlavors from "@/components/FeaturedFlavors";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Menu = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <div className="py-16">
        <h1 className="text-4xl font-bold text-chocolate text-center mb-8">
          Thực đơn của chúng tôi
        </h1>
        <FeaturedFlavors />
      </div>
      <Footer />
    </div>
  );
};

export default Menu;
