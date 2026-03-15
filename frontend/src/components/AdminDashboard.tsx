import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../utils/api';
import { AdminTabs } from './admin/AdminTabs';
import { MessageList } from './admin/MessageList';
import { ProfileManager } from './admin/ProfileManager';
import { SkillManager } from './admin/SkillManager';
import { EntityList } from './admin/EntityList';
import { EntityForm } from './admin/EntityForm';

interface Message { id: number; name: string; whatsapp: string; phone: string; city: string; message: string; created_at: string; }
interface Skill { id: number; name: string; category: string; }
interface Profile { full_name: string; title: string; bio: string; location: string; whatsapp: string; email: string; linkedin: string; image_url?: string; }

const AdminDashboard = ({ token, onLogout }: { token: string, onLogout: () => void }) => {
    const { t, lang } = useLanguage();
    const [mainView, setMainView] = useState<'control' | 'messages'>('control');
    const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'experience' | 'skills' | 'education'>('projects');
    const [loading, setLoading] = useState(false);
    
    const [messages, setMessages] = useState<Message[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [profile, setProfile] = useState<Profile>({ full_name: '', title: '', bio: '', location: '', whatsapp: '', email: '', linkedin: '' });
    const [items, setItems] = useState<any[]>([]);
    const [editingItem, setEditingItem] = useState<any>(null);

    useEffect(() => {
        loadData();
    }, [mainView, activeTab]);

    const loadData = async () => {
        setLoading(true);
        try {
            if (mainView === 'messages') {
                const data = await api.getAuthenticated('messages', token);
                setMessages(Array.isArray(data) ? data : []);
            } else {
                if (activeTab === 'skills') {
                    const data = await api.get('skills');
                    setSkills(Array.isArray(data) ? data : []);
                } else if (activeTab === 'profile') {
                    const data = await api.get('profile');
                    setProfile(data && !data.error ? data : profile);
                } else {
                    const data = await api.get(activeTab, 'es');
                    setItems(Array.isArray(data) ? data : []);
                }
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        const type = mainView === 'messages' ? 'messages' : activeTab;
        if (!confirm('Eliminar permanentemente?')) return;
        try {
            await api.delete(type, id, token);
            loadData();
        } catch (err) {
            alert('Error eliminando');
        }
    };

    const handleSaveEntity = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        try {
            setLoading(true);
            // Handle image upload if it's a project and a file was selected
            if (activeTab === 'projects') {
                const imageFile = formData.get('image_file') as File;
                if (imageFile && imageFile.name) {
                    const uploadRes = await api.upload(imageFile, token);
                    data.image_url = uploadRes.url;
                } else if (editingItem) {
                    data.image_url = editingItem.image_url;
                }
            }

            if (editingItem) await api.put(activeTab, editingItem.id, data, token);
            else await api.post(activeTab, data, token);
            alert('Guardado!');
            setEditingItem(null);
            loadData();
        } catch (err: any) {
            alert('Error al guardar: ' + err.message);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = { ...profile } as any;

        try {
            setLoading(true);
            const imageFile = formData.get('profile_image') as File;
            if (imageFile && imageFile.name) {
                const uploadRes = await api.upload(imageFile, token);
                data.image_url = uploadRes.url;
            }

            await api.post('profile', data, token);
            alert('Perfil actualizado!');
            loadData();
        } catch (err: any) {
            alert('Error al actualizar perfil: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddSkill = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = new FormData(e.currentTarget).get('name');
        try {
            await api.post('skills', { name }, token);
            loadData();
            e.currentTarget.reset();
        } catch (err) {
            alert('Error añadiendo skill');
        }
    };

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
            {/* Header with Main Navigation */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
                <div>
                   <div className="flex gap-4 mb-2">
                        <button 
                            onClick={() => setMainView('control')}
                            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${mainView === 'control' ? 'bg-primary border-primary text-white' : 'border-white/10 text-text-dim hover:text-white'}`}
                        >
                            Control Center
                        </button>
                        <button 
                            onClick={() => setMainView('messages')}
                            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${mainView === 'messages' ? 'bg-primary border-primary text-white' : 'border-white/10 text-text-dim hover:text-white'}`}
                        >
                            Direct Messages
                        </button>
                   </div>
                   <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter">
                        {mainView === 'control' ? <>Control <span className="wine-gradient italic">Center</span></> : <>Direct <span className="wine-gradient italic">Messages</span></>}
                   </h2>
                   <p className="text-text-dim mt-2 tracking-wide uppercase text-[10px] font-black">{t('admin.control')}</p>
                </div>
                <button onClick={onLogout} className="px-10 py-4 glass rounded-2xl text-white font-bold hover:bg-primary transition-all active:scale-95 border-white/5">
                    {t('admin.logout')}
                </button>
            </div>

            {mainView === 'control' && (
                <AdminTabs activeTab={activeTab} onTabChange={(tab) => { setActiveTab(tab); setEditingItem(null); }} />
            )}

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="animate-fade-in pb-20">
                    {mainView === 'messages' ? (
                        <MessageList messages={messages} onDelete={(id) => handleDelete(id)} />
                    ) : (
                        <>
                            {activeTab === 'profile' && <ProfileManager profile={profile} setProfile={setProfile} onUpdate={handleUpdateProfile} />}
                            {activeTab === 'skills' && <SkillManager skills={skills} onAdd={handleAddSkill} onDelete={handleDelete} />}
                            
                            {(['projects', 'experience', 'education'].includes(activeTab)) && (
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                    <EntityList items={items} type={activeTab} onEdit={setEditingItem} onDelete={handleDelete} />
                                    <EntityForm type={activeTab} editingItem={editingItem} setEditingItem={setEditingItem} onSave={handleSaveEntity} />
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
