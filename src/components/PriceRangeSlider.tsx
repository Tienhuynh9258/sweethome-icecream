import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"
import { useSearch } from "./FeaturedFlavors"
import { useTranslation } from "react-i18next";

const PriceRangeSlider = () => {
  const { priceRange, setPriceRange, maxPrice } = useSearch() 
  const { t, i18n } = useTranslation()
  const isEnglish = i18n.language === 'en';

  const formatPrice = (price: number) => {
    if (isEnglish) {
      return `$${price.toFixed(2)}`;
    }
    return `${price.toLocaleString()}đ`;
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 py-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{t('priceRangeSlider.filterByPrice')}</h3>
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>
      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center"
        value={priceRange}
        max={maxPrice}
        step={isEnglish ? 0.1 : 1000}
        onValueChange={setPriceRange}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-orange-100">
          <SliderPrimitive.Range className="absolute h-full bg-orange-500" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="block h-5 w-5 rounded-full border-2 border-orange-500 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
        <SliderPrimitive.Thumb
          className="block h-5 w-5 rounded-full border-2 border-orange-500 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      </SliderPrimitive.Root>
    </div>
  )
}

export default PriceRangeSlider 