const API_BASE_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';

export const api = {
    async get(endpoint: string, lang?: string) {
        const url = lang ? `${API_BASE_URL}/${endpoint}?lang=${lang}` : `${API_BASE_URL}/${endpoint}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
        return res.json();
    },

    async getAuthenticated(endpoint: string, token: string) {
        const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
        return res.json();
    },

    async post(endpoint: string, data: any, token?: string) {
        const headers: any = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        
        const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(`Failed to post to ${endpoint}`);
        return res.json();
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
        if (!res.ok) throw new Error(`Failed to update ${endpoint}`);
        return res.json();
    },

    async delete(endpoint: string, id: number, token: string) {
        const res = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error(`Failed to delete ${endpoint}`);
        return res.json();
    },

    async upload(file: File, token: string) {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch(`${API_BASE_URL}/upload`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });
        if (!res.ok) throw new Error('Failed to upload file');
        return res.json();
    }
};
