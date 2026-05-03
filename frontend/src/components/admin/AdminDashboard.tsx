import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { api } from '../../utils/api';
import { Save, Image as ImageIcon, Plus, Trash2, Edit2, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
  const { token, logout } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('perfil');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await api.getSummary('es');
      if (data) setProfile(data.profile);
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setIsSaving(true);
    try {
      await api.put('profile', 1, profile, token);
      alert('✅ Perfil actualizado correctamente');
    } catch (err: any) {
      alert('❌ Error: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setIsSaving(true);
    try {
      const res = await api.upload(file, token);
      setProfile({ ...profile, image_url: res.url });
      alert('✅ Imagen subida correctamente');
    } catch (err: any) {
      alert('❌ Error al subir imagen: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center h-96">
      <Loader2 className="animate-spin text-primary mb-4" size={48} />
      <p className="text-text-muted font-bold animate-pulse">Sincronizando base de datos...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Perfil Section */}
      <section className="glass p-10 rounded-[3rem] border border-primary/10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black text-white">Configuración del <span className="text-primary">Perfil</span></h2>
            <p className="text-text-muted text-sm mt-1">Gestiona tu identidad profesional y foto de perfil</p>
          </div>
          <button 
            onClick={handleUpdateProfile}
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Guardar Cambios
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Avatar Edit */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative group">
              <div className="w-56 h-56 rounded-[3rem] overflow-hidden border-4 border-primary/20 shadow-2xl transition-transform group-hover:scale-[1.02]">
                <img 
                  src={profile?.image_url || '/me.png'} 
                  alt="Perfil" 
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute bottom-4 right-4 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center cursor-pointer shadow-xl hover:scale-110 transition-all">
                <ImageIcon size={20} />
                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
              </label>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">JPG, PNG o WebP (Max 2MB)</p>
          </div>

          {/* Form fields */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-primary ml-2">Título Profesional</label>
              <input 
                type="text"
                value={profile?.title || ''}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-primary/50 outline-none transition-all"
                placeholder="Ej. Full Stack Developer Senior"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-primary ml-2">Biografía Profesional (Extracto)</label>
              <textarea 
                rows={6}
                value={profile?.bio || ''}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4 text-white focus:border-primary/50 outline-none transition-all resize-none"
                placeholder="Cuéntale al mundo sobre tu experiencia..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder for other sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-50 cursor-not-allowed">
        <div className="glass p-10 rounded-[3rem] border border-white/5">
          <h3 className="text-xl font-bold text-white mb-4">Experiencia Laboral</h3>
          <p className="text-sm text-text-muted">Módulo en construcción...</p>
        </div>
        <div className="glass p-10 rounded-[3rem] border border-white/5">
          <h3 className="text-xl font-bold text-white mb-4">Proyectos Estratégicos</h3>
          <p className="text-sm text-text-muted">Módulo en construcción...</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
