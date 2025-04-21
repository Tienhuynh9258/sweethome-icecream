import FeaturedFlavors from "@/components/FeaturedFlavors";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { IceCreamCone } from "lucide-react";
import { motion } from "framer-motion";

const Menu = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-4"
            >
              <IceCreamCone className="h-12 w-12 text-orange-500" />
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-orange-gradient mb-4"
            >
              Thực đơn của chúng tôi
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Khám phá thế giới kem đa dạng của chúng tôi với những hương vị độc đáo và hấp dẫn
            </motion.p>
          </motion.div>
          <FeaturedFlavors />
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Menu;
