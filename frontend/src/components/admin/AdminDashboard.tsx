import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { api } from '../../utils/api';
import { Save, Image as ImageIcon, Plus, Trash2, Edit2, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
  const { token, logout } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [recognitions, setRecognitions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('perfil');

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const data = await api.getSummary('es');
      if (data) {
        setProfile(data.profile);
        setProjects(data.projects || []);
        setExperience(data.experience || []);
        setEducation(data.education || []);
        setRecognitions(data.recognitions || []);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (type: string, id: number) => {
    if (!token || !confirm(`¿Estás seguro de eliminar este registro de ${type}?`)) return;
    try {
      await api.delete(type, id, token);
      if (type === 'projects') setProjects(projects.filter(p => p.id !== id));
      if (type === 'experience') setExperience(experience.filter(p => p.id !== id));
      if (type === 'education') setEducation(education.filter(p => p.id !== id));
      if (type === 'recognitions') setRecognitions(recognitions.filter(p => p.id !== id));
      alert('✅ Eliminado correctamente');
    } catch (err: any) {
      alert('❌ Error: ' + err.message);
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
    <div className="space-y-12 animate-fade-in pb-20">
      {/* Tabs */}
      <div className="flex flex-wrap gap-4 p-2 bg-white/5 rounded-2xl w-fit">
        {[
          { id: 'perfil', label: 'Perfil' },
          { id: 'experience', label: 'Experiencia' },
          { id: 'projects', label: 'Proyectos' },
          { id: 'education', label: 'Educación' },
          { id: 'recognitions', label: 'Premios' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'text-text-muted hover:text-white'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'perfil' && (
        <section className="glass p-10 rounded-[3rem] border border-primary/10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-black text-white">Tu <span className="text-primary italic">Identidad</span></h2>
              <p className="text-text-muted text-sm mt-1">Gestiona tu marca personal</p>
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
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-primary ml-2">Título</label>
                <input 
                  type="text"
                  value={profile?.title || ''}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-primary/50 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-primary ml-2">Bio</label>
                <textarea 
                  rows={4}
                  value={profile?.bio || ''}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4 text-white focus:border-primary/50 outline-none transition-all resize-none"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Sections (Experience, Projects, Education, Recognitions) */}
      {['experience', 'projects', 'education', 'recognitions'].includes(activeTab) && (
        <section className="space-y-8">
          <div className="flex justify-between items-center px-4">
            <h2 className="text-3xl font-black text-white capitalize">
              Gestionar <span className="text-primary italic">{activeTab === 'experience' ? 'Experiencia' : activeTab === 'education' ? 'Educación' : activeTab === 'recognitions' ? 'Premios' : 'Proyectos'}</span>
            </h2>
            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-primary transition-all">
              <Plus size={20} />
              Añadir {activeTab === 'experience' ? 'Cargo' : activeTab === 'education' ? 'Título' : activeTab === 'recognitions' ? 'Mención' : 'Proyecto'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeTab === 'experience' ? experience : 
              activeTab === 'education' ? education : 
              activeTab === 'recognitions' ? recognitions : 
              projects).map((item) => (
              <div key={item.id} className="glass p-6 rounded-[2rem] border border-white/5 flex gap-4 group hover:border-primary/30 transition-all">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5 shrink-0">
                  <img src={item.logo_url || item.image_url || '/placeholder.png'} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-bold text-white truncate">{item.company || item.institution || item.name || item.title}</h4>
                  <p className="text-text-muted text-[10px] uppercase font-bold tracking-wider">{item.role || item.title || item.entity}</p>
                  <p className="text-text-dim text-[10px] mt-1">{item.period || item.date}</p>
                  
                  <div className="flex gap-2 mt-4">
                    <button className="p-2 bg-white/5 rounded-lg text-text-muted hover:text-white transition-colors">
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={() => handleDelete(activeTab, item.id)}
                      className="p-2 bg-red-500/10 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AdminDashboard;
