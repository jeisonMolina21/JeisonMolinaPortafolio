import { api } from '../utils/api';
import type { Profile, Skill, ExperienceItem, EducationItem, Project } from '../types';

export const profileService = {
  getProfile: async (lang: string): Promise<Profile> => {
    const data = await api.get('profile', lang);
    if (data && !data.error) return data;
    throw new Error('Failed to fetch profile');
  },
  getSummary: async (lang: string): Promise<any> => {
    const data = await api.getSummary(lang);
    if (data && !data.error) return data;
    throw new Error('Failed to fetch summary');
  }
};

export const skillsService = {
  getSkills: async (): Promise<Skill[]> => {
    const data = await api.get('skills');
    return Array.isArray(data) ? data : [];
  }
};

export const experienceService = {
  getExperience: async (lang: string): Promise<ExperienceItem[]> => {
    const data = await api.get('experience', lang);
    return Array.isArray(data) ? data : [];
  }
};

export const educationService = {
  getEducation: async (lang: string): Promise<EducationItem[]> => {
    const data = await api.get('education', lang);
    return Array.isArray(data) ? data : [];
  }
};

export const projectsService = {
  getProjects: async (): Promise<Project[]> => {
    const data = await api.get('projects');
    return Array.isArray(data) ? data : [];
  }
};
