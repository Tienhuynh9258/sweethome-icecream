import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { IceCreamCone } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const About = () => { 
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <IceCreamCone className="h-20 w-20 text-orange-500 mx-auto mb-6" />
              <h1 className="text-5xl font-bold text-gray-800 mb-4">
                {t('about.title')}
              </h1>
              <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
            </motion.div>
            <div className="grid gap-8 md:grid-cols-2">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-orange-50 p-8 rounded-2xl shadow-lg"
              >
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {t('about.description1')}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('about.description2')}
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="bg-orange-500 p-8 rounded-2xl shadow-lg text-white"
              >
                <p className="text-lg leading-relaxed">
                  {t('about.description3')}
                </p>
                <div className="mt-8 flex items-center justify-center">
                  <IceCreamCone className="h-12 w-12 text-white opacity-50" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default About;
