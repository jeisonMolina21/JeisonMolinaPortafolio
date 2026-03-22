import { useState, useEffect } from 'react';
import { skillsService } from '../services/apiService';
import type { Skill } from '../types';

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await skillsService.getSkills();
        setSkills(data);
        setError(null);
      } catch (err) {
        setError('Failed to load skills');
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { skills, loading, error };
};
