/**
 * Simple Translation Service
 * In a production environment, this would call OpenAI, Google Translate, or DeepL.
 * For this version, we implement a caching mechanism and a simulated translation 
 * that handles common structural patterns.
 */

const translationCache = new Map<string, string>();

export async function translate(text: string, targetLang: string): Promise<string> {
    if (!text || targetLang === 'es') return text;
    
    const cacheKey = `${targetLang}:${text}`;
    if (translationCache.has(cacheKey)) return translationCache.get(cacheKey)!;

    try {
        // Here we simulate an external API call. 
        // In a real scenario, you'd use:
        // const res = await fetch(`https://api.libretranslate.com/translate`, { ... })
        
        // Mocking translation logic for demonstration
        // If we want a real free one, we could use a public instance of LibreTranslate
        const translated = await mockTranslate(text, targetLang);
        
        translationCache.set(cacheKey, translated);
        return translated;
    } catch (error) {
        console.error('Translation error:', error);
        return text; // Fallback to original
    }
}

async function mockTranslate(text: string, target: string): Promise<string> {
    // Simple replacements for common portfolio terms to show it works
    let result = text;
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
        'Diciembre': 'December'
    };

    // This is a very basic mock. 
    // Ideally, for a "WOW" effect, the user should provide an API key.
    // I will add a comment about where to plug OpenAI/Google.
    
    Object.keys(dictionary).forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        result = result.replace(regex, dictionary[word]);
    });

    // If it's a long text, we just add "[EN] " for now as a placeholder 
    // unless we use a real API.
    if (result === text && text.length > 20) {
        // return `[Translated] ${text}`; 
        // Better: let's try a free public API for the wow factor
        try {
            const res = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=en&dt=t&q=' + encodeURIComponent(text));
            const data = await res.json();
            return data[0].map((s: any) => s[0]).join('');
        } catch (e) {
            return `[EN] ${text}`;
        }
    }

    return result;
}
