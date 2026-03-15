import React, { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';

const AdminSection = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        window.location.reload();
    };

    if (!token) return null;

    return (
        <section id="admin-dashboard" className="bg-midnight-dark/50 border-y border-white/5">
            <AdminDashboard token={token} onLogout={handleLogout} />
        </section>
    );
};

export default AdminSection;
