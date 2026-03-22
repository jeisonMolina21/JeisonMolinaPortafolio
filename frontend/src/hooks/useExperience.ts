import { useState, useEffect } from 'react';
import { experienceService } from '../services/apiService';
import type { ExperienceItem } from '../types';

export const useExperience = (lang: string) => {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await experienceService.getExperience(lang);
        setItems(data);
        setError(null);
      } catch (err) {
        setError('Failed to load experience');
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [lang]);

  return { items, loading, error };
};
