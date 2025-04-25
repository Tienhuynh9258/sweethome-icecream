import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FlavorFilter } from '@/components/FlavorFilters';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

export interface Flavor {
  id: string;
  name: string;
  name_en: string;
  description: string;
  description_en: string;
  price: number;
  price_usd: number;
  image_url: string;
  is_popular: boolean;
  is_new: boolean;
  is_dairy_free: boolean;
  is_gluten_free: boolean;
}

export const useFlavors = (activeFilter: FlavorFilter['key'] = 'all') => {
  const [flavors, setFlavors] = useState<Flavor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlavors = async () => {
      try {
        let query: PostgrestFilterBuilder<any, any, any> = supabase.from('flavors').select('*');
        if (activeFilter !== 'all') {
          query = query.eq(activeFilter, true);
        }

        const { data, error } = await query.order('name');

        if (error) throw error;

        setFlavors((data || []).map(flavor => ({
          ...flavor,
          is_popular: flavor.is_popular || false,
          is_new: flavor.is_new || false, 
          is_dairy_free: flavor.is_dairy_free || false,
          is_gluten_free: flavor.is_gluten_free || false
        })));
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    };

    fetchFlavors();
  }, [activeFilter]);

  return { flavors, isLoading, error };
};
