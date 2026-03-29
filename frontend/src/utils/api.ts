// If PUBLIC_API_URL is set in the environment (e.g. Vercel), it uses it.
// Otherwise, in local development, it talks directly to the local backend.
const envApiUrl = import.meta.env.PUBLIC_API_URL;
const isLocal = import.meta.env.DEV;

// On vercel this will be the production backend URL.
// Locally, if envApiUrl is /api, we should override it to localhost:3000 to use direct CORS instead of proxy
const rawApiUrl = envApiUrl && envApiUrl !== '/api' 
    ? envApiUrl 
    : (isLocal ? 'http://localhost:3000/api' : '/api');

let sanitizedUrl = rawApiUrl.replace(/\/+$/, '');
// If it's an absolute URL and doesn't end with /api, append it.
if (sanitizedUrl.startsWith('http') && !sanitizedUrl.endsWith('/api')) {
    sanitizedUrl += '/api';
}
export const API_BASE_URL = sanitizedUrl;

if (typeof window !== 'undefined') {
    console.log('📡 API_BASE_URL initialized as:', API_BASE_URL);
}

// Ensure images load correctly regardless of whether it's local or production
export const IMAGE_BASE_URL = API_BASE_URL.replace('/api', '');

const handleResponse = async (res: Response, endpoint: string) => {
    if (!res.ok) {
        let errorMessage = `Failed to ${endpoint}`;
        try {
            const errorData = await res.json();
            errorMessage = errorData.details || errorData.error || errorMessage;
        } catch (e) {
            // No JSON body
        }
        throw new Error(errorMessage);
    }
    return res.json();
};

export const api = {
    async get(endpoint: string, lang?: string) {
        if (typeof window === 'undefined' && !API_BASE_URL.startsWith('http')) {
            console.warn(`Skipping fetch for ${endpoint} during SSR/Build`);
            return null;
        }
        const url = lang ? `${API_BASE_URL}/${endpoint}?lang=${lang}` : `${API_BASE_URL}/${endpoint}`;
        try {
            const res = await fetch(url);
            return handleResponse(res, `fetch ${endpoint}`);
        } catch (err) {
            console.error(`Fetch error for ${endpoint}:`, err);
            return null;
        }
    },

    async getSummary(lang: string = 'es') {
        return this.get('summary', lang);
    },

    async getAuthenticated(endpoint: string, token: string) {
        const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return handleResponse(res, `fetch ${endpoint}`);
    },

    async post(endpoint: string, data: any, token?: string) {
        const headers: any = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        
        const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
        return handleResponse(res, `post to ${endpoint}`);
    },

    async put(endpoint: string, id: number, data: any, token: string) {
        const res = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(data)
        });
        return handleResponse(res, `update ${endpoint}`);
    },

    async delete(endpoint: string, id: number, token: string) {
        const res = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return handleResponse(res, `delete ${endpoint}`);
    },

    async upload(file: File, token: string) {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch(`${API_BASE_URL}/upload`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });
        return handleResponse(res, 'upload file');
    }
};
