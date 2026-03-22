const API_BASE_URL = typeof window !== 'undefined' 
    ? (import.meta.env.PUBLIC_API_URL || '/api') 
    : (import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api');

if (typeof window !== 'undefined' && !import.meta.env.PUBLIC_API_URL) {
    console.warn('PUBLIC_API_URL is not defined. Falling back to /api');
}

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
