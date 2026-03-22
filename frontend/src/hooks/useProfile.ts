import { useState, useEffect } from 'react';
import { profileService } from '../services/apiService';
import type { Profile } from '../types';

export const useProfile = (lang: string) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await profileService.getProfile(lang);
        setProfile(data);
        setError(null);
      } catch (err) {
        setError('Failed to load profile');
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [lang]);

  return { profile, loading, error };
};
