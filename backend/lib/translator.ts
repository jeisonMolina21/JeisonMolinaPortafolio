/**
 * Translation Service
 * Supports LibreTranslate (set LIBRETRANSLATE_URL env var for a hosted instance),
 * with a dictionary-based fallback for common portfolio terms.
 */

const translationCache = new Map<string, string>();

export async function translate(text: string, targetLang: string): Promise<string> {
  if (!text || targetLang === 'es') return text;

  const cacheKey = `${targetLang}:${text}`;
  if (translationCache.has(cacheKey)) return translationCache.get(cacheKey)!;

  // Try dictionary first (fast path)
  const dictResult = applyDictionary(text);
  if (dictResult !== text) {
    translationCache.set(cacheKey, dictResult);
    return dictResult;
  }

  // Try LibreTranslate if configured
  const libreUrl = process.env.LIBRETRANSLATE_URL;
  if (libreUrl) {
    try {
      const res = await fetch(`${libreUrl}/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: text, source: 'es', target: targetLang, format: 'text' }),
      });
      if (res.ok) {
        const data = await res.json();
        const translated = data.translatedText as string;
        translationCache.set(cacheKey, translated);
        return translated;
      }
    } catch (error) {
      console.error('LibreTranslate error:', error);
    }
  }

  // Final fallback: return original text unchanged
  return text;
}

function applyDictionary(text: string): string {
  const dictionary: Record<string, string> = {
    'Desarrollador': 'Developer',
    'Software': 'Software',
    'Experiencia': 'Experience',
    'Proyectos': 'Projects',
    'Educación': 'Education',
    'Contacto': 'Contact',
    'Sobre mí': 'About me',
    'Habilidades': 'Skills',
    'Tecnologías': 'Technologies',
    'Responsabilidades': 'Responsibilities',
    'Logros': 'Achievements',
    'Actualmente': 'Currently',
    'Actuamente': 'Currently',
    'Presente': 'Present',
    'Enero': 'January',
    'Febrero': 'February',
    'Marzo': 'March',
    'Abril': 'April',
    'Mayo': 'May',
    'Junio': 'June',
    'Julio': 'July',
    'Agosto': 'August',
    'Septiembre': 'September',
    'Octubre': 'October',
    'Noviembre': 'November',
    'Diciembre': 'December',
  };

  let result = text;
  Object.entries(dictionary).forEach(([word, translation]) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    result = result.replace(regex, translation);
  });
  return result;
}
