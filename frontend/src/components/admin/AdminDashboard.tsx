import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';
import { 
  Save, Image as ImageIcon, Plus, Trash2, Edit2, Loader2, 
  LayoutDashboard, Briefcase, Code, GraduationCap, Settings, LogOut,
  ChevronRight, ExternalLink
} from 'lucide-react';

const AdminDashboard = () => {
  const { token, logout } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [recognitions, setRecognitions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('resumen');
  
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

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleDelete = async (type: string, id: number) => {
    if (!token || !confirm(`¿Estás seguro de eliminar este registro?`)) return;
    try {
      const endpoint = type === 'proyectos' ? 'projects' : 
                       type === 'experiencia' ? 'experience' : 
                       type === 'educacion' ? 'education' : type;
      await api.delete(endpoint, id, token);
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
      const endpoint = activeTab === 'proyectos' ? 'projects' : 
                       activeTab === 'experiencia' ? 'experience' : 
                       activeTab === 'educacion' ? 'education' : 'recognitions';

      if (currentItem.id) {
        await api.put(endpoint, currentItem.id, currentItem, token);
      } else {
        await api.post(endpoint, currentItem, token);
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
      if (field === 'profile' || field === 'cv_url') setProfile({ ...profile, [field]: res.url });
      else setCurrentItem({ ...currentItem, [field]: res.url });
      alert('✅ Archivo subido');
    } catch (err: any) {
      alert('❌ Error: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg-deep fixed inset-0 z-[100]">
      <Loader2 className="animate-spin text-primary mb-4" size={64} />
      <p className="text-primary font-black tracking-widest animate-pulse uppercase text-xs">Sincronizando Sistema Admin...</p>
    </div>
  );

  const menuItems = [
    { id: 'resumen', icon: <LayoutDashboard size={20} />, label: 'Resumen' },
    { id: 'experiencia', icon: <Briefcase size={20} />, label: 'Experiencia' },
    { id: 'proyectos', icon: <Code size={20} />, label: 'Proyectos' },
    { id: 'educacion', icon: <GraduationCap size={20} />, label: 'Educación' },
    { id: 'ajustes', icon: <Settings size={20} />, label: 'Ajustes' },
  ];

  return (
    <div className="flex min-h-screen bg-bg-deep text-text-main font-sans relative overflow-x-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-midnight/50 backdrop-blur-xl border-r border-white/5 p-8 flex flex-col h-full shrink-0">
        <div className="mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-1">Sistema Admin</p>
          <h1 className="text-2xl font-black text-white tracking-tighter">
            Jeison <span className="text-primary italic">M.</span>
          </h1>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map(item => (
            <button 
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsFormOpen(false); }}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all group ${
                activeTab === item.id 
                ? 'bg-primary text-white shadow-2xl shadow-primary/30' 
                : 'text-text-muted hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={`${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
                {item.icon}
              </span>
              <span className="text-sm">{item.label}</span>
              {activeTab === item.id && <ChevronRight size={16} className="ml-auto opacity-50" />}
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-4 p-4 text-red-500 font-bold hover:bg-red-500/10 rounded-2xl transition-all group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Cerrar Sesión</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto custom-scrollbar bg-gradient-to-br from-bg-deep to-midnight/20">
        <header className="flex justify-between items-center mb-16">
          <div>
            <h2 className="text-4xl font-black text-white tracking-tighter capitalize">
              {activeTab === 'resumen' ? 'Bienvenido de nuevo,' : 'Panel de'} <span className="text-primary">{activeTab === 'resumen' ? 'Jeison' : activeTab}</span>
            </h2>
            <p className="text-text-muted text-sm mt-2 font-medium">Gestiona tu presencia digital y métricas en tiempo real.</p>
          </div>
          <div className="flex items-center gap-6">
             <div className="text-right hidden md:block">
                <p className="text-xs font-black text-white">Jeison Molina</p>
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Administrator</p>
             </div>
             <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/20 flex items-center justify-center text-primary font-black shadow-inner">JM</div>
          </div>
        </header>

        {activeTab === 'resumen' && !isFormOpen && (
          <div className="space-y-12 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'Total Proyectos', val: projects.length, color: 'primary' },
                { label: 'Impacto Reportado', val: '99%', color: 'primary' },
                { label: 'Mensajes Nuevos', val: '0', color: 'primary' }
              ].map((stat, i) => (
                <div key={i} className="glass p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group hover:border-primary/20 transition-all">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-2">{stat.label}</p>
                  <p className="text-5xl font-black text-white tracking-tighter">{stat.val}</p>
                </div>
              ))}
            </div>

            <section className="glass p-12 rounded-[3rem] border border-primary/10 relative overflow-hidden">
               <div className="absolute right-0 top-0 w-1/3 h-full bg-primary/5 blur-[100px] pointer-events-none" />
               <div className="flex justify-between items-start mb-8 relative z-10">
                 <div className="max-w-2xl">
                   <h3 className="text-2xl font-black text-white mb-4">Resumen de Contenido</h3>
                   <p className="text-text-muted text-base leading-relaxed italic">
                     "El panel está listo para recibir actualizaciones de tu base de datos en tiempo real. Todos los módulos (Experiencia, Proyectos, Educación) están sincronizados con tu identidad Senior Full-Stack."
                   </p>
                 </div>
                 <button onClick={() => setActiveTab('ajustes')} className="px-8 py-4 bg-white/5 text-primary-bright font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-primary hover:text-white transition-all shadow-xl">
                    Editar Todo
                 </button>
               </div>
            </section>
          </div>
        )}

        {activeTab === 'ajustes' && !isFormOpen && (
          <section className="glass p-10 rounded-[3rem] border border-primary/10 animate-fade-in">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black text-white">Configuración del <span className="text-primary italic">Perfil</span></h2>
              <button onClick={handleUpdateProfile} disabled={isSaving} className="flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl hover:scale-105 transition-all">
                {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                Guardar Perfil
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
                <div className="w-full p-6 bg-white/5 rounded-3xl border border-white/10">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest text-center mb-4">Gestor de CV (PDF)</p>
                  <label className="flex items-center justify-center gap-2 w-full py-4 bg-white/5 text-white text-xs font-bold rounded-2xl border border-dashed border-white/20 cursor-pointer hover:border-primary/50 transition-all">
                    <ExternalLink size={14} />
                    {profile?.cv_url ? 'Cambiar PDF' : 'Subir CV'}
                    <input type="file" className="hidden" accept=".pdf" onChange={(e) => handleImageUpload(e, 'cv_url')} />
                  </label>
                  {profile?.cv_url && <p className="text-[8px] text-text-muted mt-2 truncate text-center">{profile.cv_url}</p>}
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <input type="text" value={profile?.title_es || ''} onChange={(e) => setProfile({ ...profile, title_es: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-primary/50 outline-none" placeholder="Título Profesional" />
                <textarea rows={8} value={profile?.bio_es || ''} onChange={(e) => setProfile({ ...profile, bio_es: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4 text-white focus:border-primary/50 outline-none resize-none" placeholder="Biografía unificada..." />
              </div>
            </div>
          </section>
        )}

        {['experiencia', 'proyectos', 'educacion'].includes(activeTab) && !isFormOpen && (
          <section className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-black text-white capitalize">Listado de <span className="text-primary italic">{activeTab}</span></h3>
              <button onClick={() => handleEdit()} className="flex items-center gap-3 px-8 py-4 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:scale-105 transition-all shadow-xl">
                <Plus size={18} /> Añadir {activeTab === 'experiencia' ? 'Cargo' : activeTab === 'educacion' ? 'Título' : 'Proyecto'}
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {(activeTab === 'experiencia' ? experience : activeTab === 'educacion' ? education : projects).map((item) => (
                <div key={item.id} className="glass p-8 rounded-[3rem] border border-white/5 flex gap-8 group hover:border-primary/40 transition-all">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden bg-white/5 shrink-0 border border-white/10">
                    <img src={item.logo_url || item.image_url || '/placeholder.png'} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h4 className="text-xl font-bold text-white truncate mb-1">{item.company || item.institution || item.title}</h4>
                    <p className="text-primary text-xs font-black uppercase tracking-widest mb-2">{item.role || item.degree || item.tech_stack}</p>
                    <p className="text-text-muted text-xs font-medium">{item.period || 'Periodo no definido'}</p>
                    
                    <div className="flex gap-3 mt-6">
                      <button onClick={() => handleEdit(item)} className="px-4 py-2 bg-white/5 rounded-xl text-white text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all">Editar</button>
                      <button onClick={() => handleDelete(activeTab, item.id)} className="px-4 py-2 bg-red-500/10 rounded-xl text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Borrar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Dynamic Form Editor */}
        {isFormOpen && (
          <section className="glass p-12 rounded-[3rem] border border-primary/30 animate-slide-up">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-black text-white">Editor de <span className="text-primary capitalize">{activeTab}</span></h2>
              <button onClick={() => setIsFormOpen(false)} className="text-text-muted hover:text-white font-black text-xs uppercase tracking-widest">Descartar</button>
            </div>
            
            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-2">Nombre Principal</label>
                  <input type="text" value={currentItem.title || currentItem.company || currentItem.institution || ''} 
                         onChange={(e) => setCurrentItem({ ...currentItem, [activeTab === 'experiencia' ? 'company' : activeTab === 'educacion' ? 'institution' : 'title']: e.target.value })}
                         className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary/50" required />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-2">Subtítulo / Cargo / Grado</label>
                  <input type="text" value={currentItem.role || currentItem.degree || currentItem.tech_stack || ''} 
                         onChange={(e) => setCurrentItem({ ...currentItem, [activeTab === 'experiencia' ? 'role' : activeTab === 'educacion' ? 'degree' : 'tech_stack']: e.target.value })}
                         className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary/50" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-2">Periodo o Fecha</label>
                  <input type="text" value={currentItem.period || ''} 
                         onChange={(e) => setCurrentItem({ ...currentItem, period: e.target.value })}
                         className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary/50" placeholder="Ej: 2024 - Actualidad" />
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-2">Descripción Detallada</label>
                  <textarea rows={6} value={currentItem.description || ''} 
                            onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-6 py-4 text-white outline-none focus:border-primary/50 resize-none" />
                </div>
                <div className="flex items-center gap-8 p-6 bg-white/5 rounded-[2.5rem] border border-white/10">
                  <div className="w-24 h-24 rounded-2xl bg-white/5 overflow-hidden shrink-0 border border-white/10">
                    <img src={currentItem.logo_url || currentItem.image_url || '/placeholder.png'} className="w-full h-full object-cover" alt="" />
                  </div>
                  <label className="flex-1 py-4 bg-primary/10 text-primary text-center text-xs font-black uppercase tracking-widest rounded-2xl cursor-pointer hover:bg-primary hover:text-white transition-all">
                    Actualizar Imagen
                    <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, activeTab === 'proyectos' ? 'image_url' : 'logo_url')} />
                  </label>
                </div>
              </div>

              <div className="lg:col-span-2 flex justify-end gap-6 pt-8 border-t border-white/5">
                <button type="button" onClick={() => setIsFormOpen(false)} className="text-text-muted font-black text-xs uppercase tracking-widest hover:text-white transition-all">Cancelar</button>
                <button type="submit" disabled={isSaving} className="px-12 py-5 bg-primary text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 transition-all disabled:opacity-50">
                  {isSaving ? <Loader2 className="animate-spin" /> : 'Confirmar Cambios'}
                </button>
              </div>
            </form>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
