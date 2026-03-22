import { useState, useEffect } from 'react';
import { educationService } from '../services/apiService';
import type { EducationItem } from '../types';

export const useEducation = (lang: string) => {
  const [items, setItems] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await educationService.getEducation(lang);
        setItems(data);
        setError(null);
      } catch (err) {
        setError('Failed to load education');
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [lang]);

  return { items, loading, error };
};
