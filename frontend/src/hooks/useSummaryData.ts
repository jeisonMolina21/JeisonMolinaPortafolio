import { useState, useEffect, useRef } from 'react';
import { profileService } from '../services/apiService';

export const useSummaryData = (lang: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cache = useRef<Record<string, any>>({});

  useEffect(() => {
    const fetchData = async () => {
      if (cache.current[lang]) {
        setData(cache.current[lang]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const summary = await profileService.getSummary(lang);
        setData(summary);
        cache.current[lang] = summary;
        setError(null);
      } catch (err) {
        console.error('Failed to load portfolio summary:', err);
        setError('Failed to load data. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lang]);

  return { data, loading, error };
};
