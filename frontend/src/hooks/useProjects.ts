import { useState, useEffect } from 'react';
import { projectsService } from '../services/apiService';
import type { Project } from '../types';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await projectsService.getProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError('Failed to load projects');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { projects, loading, error };
};
