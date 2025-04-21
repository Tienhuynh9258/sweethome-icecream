import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useFlavors } from "@/hooks/useFlavors";
import { Button } from "./ui/button";
import { FlavorFilters, type FlavorFilter } from "./FlavorFilters";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

const FeaturedFlavors = () => {
  const [activeFilter, setActiveFilter] = useState<FlavorFilter['key']>('all');
  const { flavors, isLoading, error } = useFlavors(activeFilter);
  const { addToCart } = useCart();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-8 w-8 border-b-2 border-orange-500"
        />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <FlavorFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          className="mb-8 justify-center"
        />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {flavors.map((flavor, index) => (
          <motion.div
            key={flavor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100"
          >
            <div className="relative">
              <motion.img
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                src={flavor.image_url}
                alt={flavor.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                {flavor.is_new && (
                  <motion.span
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-orange-300 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg"
                  >
                    NEW
                  </motion.span>
                )}
                {flavor.is_popular && (
                  <motion.span
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-orange-400 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg"
                  >
                    POPULAR
                  </motion.span>
                )}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2 min-h-[40px]">
                <h3 className="text-xl font-bold text-gray-800 max-w-[60%]">
                  {flavor.name}
                </h3>
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  {flavor.is_dairy_free && (
                    <motion.span
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-xs bg-orange-50 text-orange-800 px-2.5 py-1 rounded-full font-medium whitespace-nowrap border border-orange-200"
                    >
                      Dairy-free
                    </motion.span>
                  )}
                  {flavor.is_gluten_free && (
                    <motion.span
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-xs bg-green-50 text-green-800 px-2.5 py-1 rounded-full font-medium whitespace-nowrap border border-green-200"
                    >
                      Gluten-free
                    </motion.span>
                  )}
                </div>
              </div>
              <p className="text-gray-600 mb-4 min-h-[40px]">{flavor.description}</p>
              <div className="flex items-center justify-between">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-orange-500 font-bold text-lg"
                >
                  {flavor.price.toLocaleString()}đ
                </motion.span>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => addToCart(flavor)}
                    className="bg-orange-500 hover:bg-orange-600 w-10 h-10 p-0 group relative overflow-hidden transition-all duration-300 hover:w-[130px] shadow-lg hover:shadow-xl"
                  >
                    <Plus className="h-5 w-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:left-3 group-hover:translate-x-0 transition-all duration-300 text-white group-hover:text-white" />
                    <span className="absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                      Thêm vào giỏ
                    </span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeaturedFlavors;
