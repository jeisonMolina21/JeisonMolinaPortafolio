import { useState, useEffect, useRef } from 'react';
import { profileService } from '../services/apiService';
import { fallbackData } from '../data/fallbackData';

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
        if (!summary || summary.error) throw new Error(summary?.error || 'Empty summary');
        setData(summary);
        cache.current[lang] = summary;
        setError(null);
      } catch (err) {
        console.error('Failed to load portfolio summary, using fallback:', err);
        setData(fallbackData);
        setError(null); // Clear error since we have fallback
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lang]);

  return { data, loading, error };
};
