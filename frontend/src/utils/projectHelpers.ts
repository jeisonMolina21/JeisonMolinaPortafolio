/**
 * Formats a comma-separated tech stack string into a clean array of strings.
 */
export const formatTechStack = (stack: string | null): string[] => {
  if (!stack) return [];
  return stack.split(',').map(tag => tag.trim()).filter(Boolean);
};

/**
 * Converts a standard YouTube or Vimeo URL into its embeddable version.
 */
export const getEmbedUrl = (url: string | null): string | null => {
  if (!url) return null;
  
  // YouTube Handling
  if (url.includes('youtube.com/watch?v=')) {
    return url.replace('watch?v=', 'embed/');
  }
  if (url.includes('youtu.be/')) {
    const id = url.split('/').pop();
    return `https://www.youtube.com/embed/${id}`;
  }
  
  // Vimeo Handling
  if (url.includes('vimeo.com/')) {
    const id = url.split('/').pop();
    return `https://player.vimeo.com/video/${id}`;
  }
  
  return url;
};

/**
 * Validates if a string is a valid URL.
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
