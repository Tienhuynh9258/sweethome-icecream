import FeaturedFlavors, { SearchProvider } from "@/components/FeaturedFlavors";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { IceCreamCone } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Menu = () => {
  const { t } = useTranslation();
  
  return (
    <SearchProvider>
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
                {t('menu.ourMenu')}
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-gray-600 max-w-2xl mx-auto"
              >
                {t('menu.menuDescription')}
              </motion.p>
            </motion.div>
            <FeaturedFlavors />
          </div>
        </motion.div>
        <Footer />
      </div>
    </SearchProvider>
  );
};

export default Menu;
