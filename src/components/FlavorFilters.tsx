import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const FilterButton = ({ label, isActive, onClick, className }: FilterButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      "px-4 py-2 rounded-full text-sm font-medium transition-colors",
      isActive
        ? "bg-[#FF3D00] text-white"
        : "text-[#FF3D00] border-2 border-[#FF3D00] hover:bg-[#FF3D00] hover:text-white",
      className
    )}
  >
    {label}
  </button>
);

export interface FlavorFilter {
  label: string;
  key: 'all' | 'is_popular' | 'is_new' | 'is_dairy_free' | 'is_gluten_free';
}

interface FlavorFiltersProps {
  activeFilter: FlavorFilter['key'];
  onFilterChange: (filter: FlavorFilter['key']) => void;
  className?: string;
}

export function FlavorFilters({ activeFilter, onFilterChange, className }: FlavorFiltersProps) {
  const { t } = useTranslation();
  
  const FILTERS: FlavorFilter[] = [
    { label: t('filters.all'), key: "all" },
    { label: t('filters.mostPopular'), key: "is_popular" },
    { label: t('filters.newFlavors'), key: "is_new" },
    { label: t('filters.dairyFree'), key: "is_dairy_free" },
    { label: t('filters.glutenFree'), key: "is_gluten_free" },
  ];

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {FILTERS.map((filter) => (
        <FilterButton
          key={filter.key}
          label={filter.label}
          isActive={activeFilter === filter.key}
          onClick={() => onFilterChange(filter.key)}
        />
      ))}
    </div>
  );
} 