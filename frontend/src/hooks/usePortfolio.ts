import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export function usePortfolio(lang: string = 'es') {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const result = await api.getSummary(lang);
        if (result) {
          setData(result);
        } else {
          setError('No se pudieron cargar los datos');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [lang]);

  const groupedSkills = data?.skills?.reduce((acc: any, skill: any) => {
    const cat = skill.category || 'Otros';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {}) || {};

  return { data, groupedSkills, loading, error };
}
