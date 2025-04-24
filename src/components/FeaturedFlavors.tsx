import React from "react";
import { useState, createContext, useContext } from "react";
import { useCart } from "@/contexts/CartContext";
import { useFlavors } from "@/hooks/useFlavors";
import { Button } from "./ui/button";
import { FlavorFilters, type FlavorFilter } from "./FlavorFilters";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import PriceRangeSlider from "./PriceRangeSlider";
import { useTranslation } from "react-i18next";

// Create a context for search
type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  maxPrice: number;
};

export const SearchContext = createContext<SearchContextType>({
  searchQuery: "",
  setSearchQuery: () => { },
  priceRange: [0, 150000],
  setPriceRange: () => { },
  maxPrice: 150000,
});

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000]);
  const maxPrice = 150000; // Updated maximum price

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, priceRange, setPriceRange, maxPrice }}>
      {children}
    </SearchContext.Provider>
  );
};

const ITEMS_PER_PAGE = 9;

const FeaturedFlavors = () => {
  const [activeFilter, setActiveFilter] = useState<FlavorFilter['key']>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { flavors, isLoading, error } = useFlavors(activeFilter);
  const { addToCart } = useCart();
  const { searchQuery, priceRange } = useSearch();
  const { t } = useTranslation();

  const filteredFlavors = flavors
    .filter(flavor => {
      const matchesSearch = searchQuery
        ? new RegExp(searchQuery.trim(), 'i').test(flavor.name)
        : true;
      const matchesPrice = flavor.price >= priceRange[0] && flavor.price <= priceRange[1];
      return matchesSearch && matchesPrice;
    });

  // Pagination calculations
  const totalPages = Math.ceil(filteredFlavors.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFlavors = filteredFlavors.slice(startIndex, endIndex);

  // Handle page changes
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when filter or search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery, priceRange]);

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
        <PriceRangeSlider />
      </motion.div>

      {filteredFlavors.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 py-8"
        >
          {t('featuredFlavors.noFlavorsFound')}
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentFlavors.map((flavor, index) => (
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
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    {flavor.is_new && (
                      <motion.span
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-orange-300 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg"
                      >
                        {t('featuredFlavors.new')}
                      </motion.span>
                    )}
                    {flavor.is_popular && (
                      <motion.span
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-orange-400 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg"
                      >
                        {t('featuredFlavors.popular')}
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
                          className="flex justify-center items-center text-xs bg-orange-50 text-orange-800 px-2.5 py-1 rounded-full font-medium whitespace-nowrap border border-orange-200"
                        >
                          {t('featuredFlavors.dairyFree')}
                        </motion.span>
                      )}
                      {flavor.is_gluten_free && (
                        <motion.span
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="text-xs bg-green-50 text-green-800 px-2.5 py-1 rounded-full font-medium whitespace-nowrap border border-green-200"
                        >
                          {t('featuredFlavors.glutenFree')}
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
                          {t('featuredFlavors.addToCart')}
                        </span>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex justify-center items-center gap-4 mt-12 mb-8"
            >
              <Button
                variant="outline"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="flex items-center gap-2 hover:bg-orange-50 hover:text-orange-500 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
                {t('featuredFlavors.previous')}
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">
                  {t('featuredFlavors.page')} {currentPage} / {totalPages}
                </span>
              </div>
              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 hover:bg-orange-50 hover:text-orange-500 disabled:opacity-50"
              >
                {t('featuredFlavors.next')}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default FeaturedFlavors;
