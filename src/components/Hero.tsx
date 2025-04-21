import { Button } from "./ui/button";
import { IceCreamCone } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-[80vh] flex items-center relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
      />
      <div className="container mx-auto px-4 relative">
        <div className="text-center">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <IceCreamCone className="h-16 w-16 text-orange-500 animate-float" />
          </motion.div>
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-orange-gradient mb-6"
          >
            Kem Sweethome
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Hương vị ngọt ngào của tổ ấm, nơi mỗi muỗng kem là một kỷ niệm đáng nhớ
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200">
              Khám phá menu
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
