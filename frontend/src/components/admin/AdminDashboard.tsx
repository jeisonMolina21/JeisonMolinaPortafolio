import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { api } from '../../utils/api';
import { Save, Image as ImageIcon, Plus, Trash2, Edit2, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
  const { token } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [recognitions, setRecognitions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('perfil');
  
  // Edit State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);

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
    if (!token || !confirm(`¿Estás seguro de eliminar este registro?`)) return;
    try {
      await api.delete(type, id, token);
      fetchAllData();
      alert('✅ Eliminado');
    } catch (err: any) {
      alert('❌ Error: ' + err.message);
    }
  };

  const handleEdit = (item: any = null) => {
    setCurrentItem(item || {});
    setIsFormOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setIsSaving(true);
    try {
      if (currentItem.id) {
        await api.put(activeTab, currentItem.id, currentItem, token);
      } else {
        await api.post(activeTab, currentItem, token);
      }
      setIsFormOpen(false);
      fetchAllData();
      alert('✅ Guardado con éxito');
    } catch (err: any) {
      alert('❌ Error al guardar: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setIsSaving(true);
    try {
      await api.put('profile', 1, profile, token);
      alert('✅ Perfil actualizado');
    } catch (err: any) {
      alert('❌ Error: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string = 'image_url') => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setIsSaving(true);
    try {
      const res = await api.upload(file, token);
      if (field === 'profile') setProfile({ ...profile, image_url: res.url });
      else setCurrentItem({ ...currentItem, [field]: res.url });
      alert('✅ Archivo subido');
    } catch (err: any) {
      alert('❌ Error: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center h-96">
      <Loader2 className="animate-spin text-primary mb-4" size={48} />
      <p className="text-text-muted font-bold animate-pulse">Sincronizando...</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-fade-in pb-20">
      {/* Tabs */}
      {!isFormOpen && (
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
      )}

      {activeTab === 'perfil' && !isFormOpen && (
        <section className="glass p-10 rounded-[3rem] border border-primary/10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-black text-white">Tu <span className="text-primary italic">Identidad</span></h2>
              <p className="text-text-muted text-sm mt-1">Gestiona tu marca personal</p>
            </div>
            <button onClick={handleUpdateProfile} disabled={isSaving} className="flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:scale-105 transition-all">
              {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              Guardar Cambios
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative group">
                <div className="w-56 h-56 rounded-[3rem] overflow-hidden border-4 border-primary/20 shadow-2xl">
                  <img src={profile?.image_url || '/me.png'} alt="" className="w-full h-full object-cover" />
                </div>
                <label className="absolute bottom-4 right-4 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center cursor-pointer shadow-xl">
                  <ImageIcon size={20} />
                  <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, 'profile')} />
                </label>
              </div>
              <div className="w-full p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                <p className="text-[10px] font-bold text-text-muted uppercase mb-2">CV Principal (PDF)</p>
                <input type="text" value={profile?.cv_url || ''} className="w-full bg-transparent text-[10px] text-primary text-center mb-2 outline-none" readOnly />
                <label className="block w-full py-2 bg-primary/10 text-primary text-xs font-bold rounded-lg cursor-pointer hover:bg-primary hover:text-white transition-all">
                  Subir Nuevo CV
                  <input type="file" className="hidden" accept=".pdf" onChange={(e) => handleImageUpload(e, 'cv_url')} />
                </label>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <input type="text" value={profile?.title || ''} onChange={(e) => setProfile({ ...profile, title: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-primary/50 outline-none" placeholder="Título" />
              <textarea rows={6} value={profile?.bio || ''} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4 text-white focus:border-primary/50 outline-none resize-none" placeholder="Biografía" />
            </div>
          </div>
        </section>
      )}

      {/* List Sections */}
      {['experience', 'projects', 'education', 'recognitions'].includes(activeTab) && !isFormOpen && (
        <section className="space-y-8">
          <div className="flex justify-between items-center px-4">
            <h2 className="text-3xl font-black text-white capitalize">Gestionar <span className="text-primary italic">{activeTab}</span></h2>
            <button onClick={() => handleEdit()} className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:scale-105 transition-all">
              <Plus size={20} /> Añadir Nuevo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeTab === 'experience' ? experience : activeTab === 'education' ? education : activeTab === 'recognitions' ? recognitions : projects).map((item) => (
              <div key={item.id} className="glass p-6 rounded-[2rem] border border-white/5 flex gap-4 group hover:border-primary/30 transition-all">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5 shrink-0">
                  <img src={item.logo_url || item.image_url || '/placeholder.png'} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-bold text-white truncate">{item.company || item.institution || item.name || item.title}</h4>
                  <p className="text-text-muted text-[10px] uppercase font-bold tracking-wider">{item.role || item.title || item.entity || item.tech_stack}</p>
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => handleEdit(item)} className="p-2 bg-white/5 rounded-lg text-text-muted hover:text-white transition-colors">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDelete(activeTab, item.id)} className="p-2 bg-red-500/10 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Dynamic Form Editor */}
      {isFormOpen && (
        <section className="glass p-10 rounded-[3rem] border border-primary/20 animate-slide-up">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black text-white">Editor de <span className="text-primary capitalize">{activeTab}</span></h2>
            <button onClick={() => setIsFormOpen(false)} className="text-text-muted hover:text-white">Cerrar</button>
          </div>
          
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-2">Título / Nombre</label>
                <input type="text" value={currentItem.title || currentItem.company || currentItem.institution || currentItem.name || ''} 
                       onChange={(e) => setCurrentItem({ ...currentItem, [activeTab === 'experience' ? 'company' : activeTab === 'education' ? 'institution' : activeTab === 'projects' ? 'title' : 'name']: e.target.value })}
                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-2">Cargo / Grado / Entidad</label>
                <input type="text" value={currentItem.role || currentItem.degree || currentItem.entity || currentItem.tech_stack || ''} 
                       onChange={(e) => setCurrentItem({ ...currentItem, [activeTab === 'experience' ? 'role' : activeTab === 'education' ? 'degree' : activeTab === 'projects' ? 'tech_stack' : 'entity']: e.target.value })}
                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-2">Periodo / Fecha</label>
                <input type="text" value={currentItem.period || currentItem.date || ''} 
                       onChange={(e) => setCurrentItem({ ...currentItem, [activeTab === 'recognitions' ? 'date' : 'period']: e.target.value })}
                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50" placeholder="Ej: 2024 - Actualidad" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-2">Descripción</label>
                <textarea rows={4} value={currentItem.description || currentItem.desc || ''} 
                          onChange={(e) => setCurrentItem({ ...currentItem, [activeTab === 'projects' ? 'description' : 'description']: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 resize-none" />
              </div>
              <div className="flex items-center gap-6 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-20 h-20 rounded-xl bg-white/5 overflow-hidden">
                  <img src={currentItem.logo_url || currentItem.image_url || '/placeholder.png'} className="w-full h-full object-cover" alt="" />
                </div>
                <label className="flex-1 py-3 bg-primary/10 text-primary text-center text-xs font-bold rounded-xl cursor-pointer hover:bg-primary hover:text-white transition-all">
                  Subir Imagen / Logo
                  <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, activeTab === 'experience' || activeTab === 'education' ? 'logo_url' : 'image_url')} />
                </label>
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end gap-4 pt-4">
              <button type="button" onClick={() => setIsFormOpen(false)} className="px-8 py-3 text-text-muted font-bold hover:text-white transition-all">Cancelar</button>
              <button type="submit" disabled={isSaving} className="px-10 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all disabled:opacity-50">
                {isSaving ? <Loader2 className="animate-spin" /> : 'Guardar Registro'}
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
};

export default AdminDashboard;
