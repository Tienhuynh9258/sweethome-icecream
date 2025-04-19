
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Flavor {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export const useFlavors = () => {
  const [flavors, setFlavors] = useState<Flavor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlavors = async () => {
      try {
        const { data, error } = await supabase
          .from('flavors')
          .select('*');

        if (error) throw error;

        setFlavors(data || []);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    };

    fetchFlavors();
  }, []);

  return { flavors, isLoading, error };
};
