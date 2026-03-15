import React from 'react';

interface EntityManagerProps {
    type: string;
    editingItem: any;
    setEditingItem: (item: any) => void;
    onSave: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const EntityForm = ({ type, editingItem, setEditingItem, onSave }: EntityManagerProps) => (
    <div className="lg:col-span-8">
        <form onSubmit={onSave} key={editingItem?.id || 'new'} className="glass p-10 rounded-[2.5rem] space-y-6 border-white/5 relative">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                    {editingItem ? 'Editar' : 'Agregar'} <span className="wine-gradient italic">{type.charAt(0).toUpperCase() + type.slice(1, -1)}</span>
                </h3>
                {editingItem && (
                    <button 
                        type="button" 
                        onClick={() => setEditingItem(null)}
                        className="px-4 py-2 glass rounded-lg text-emerald-400 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400/10 transition-all"
                    >
                        + Nuevo
                    </button>
                )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {type === 'projects' && <input name="title" defaultValue={editingItem?.title} placeholder="Title" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary" />}
                {type === 'experience' && <input name="company" defaultValue={editingItem?.company} placeholder="Company" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary" />}
                {type === 'education' && <input name="institution" defaultValue={editingItem?.institution} placeholder="Institution" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary" />}
            </div>

            {type === 'experience' && <input name="role" defaultValue={editingItem?.role} placeholder="Role" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none" />}
            {type === 'education' && <input name="degree" defaultValue={editingItem?.degree} placeholder="Degree" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none" />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="period" defaultValue={editingItem?.period} placeholder="Period (e.g. 2023 - 2024)" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none" />
                {type === 'projects' && <input name="tech_stack" defaultValue={editingItem?.tech_stack} placeholder="Tech Stack (comma separated)" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none" />}
                {type === 'experience' && <input name="skills" defaultValue={editingItem?.skills} placeholder="Skills used (comma separated)" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none" />}
            </div>

            {type === 'projects' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-dim">Project Image</label>
                        <input 
                            key={editingItem?.id}
                            type="file" 
                            name="image_file"
                            accept="image/*"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-bright" 
                        />
                        {editingItem?.image_url && <p className="text-[10px] text-text-muted mt-1">Actual: {editingItem.image_url.split('/').pop()}</p>}
                    </div>
                    <input name="github_url" defaultValue={editingItem?.github_url} placeholder="GitHub URL" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none flex-grow" />
                </div>
            )}

            <textarea name="description" defaultValue={editingItem?.description} placeholder="Full Description..." required rows={6} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary resize-none" />
            
            <div className="flex gap-4">
                <button type="submit" className="flex-1 py-5 bg-primary text-white rounded-2xl font-bold hover:bg-primary-bright transition-all shadow-xl">
                    {editingItem ? 'Update Item' : 'Publish Item'}
                </button>
                {editingItem && (
                    <button type="button" onClick={() => setEditingItem(null)} className="px-10 py-5 glass rounded-2xl font-bold hover:bg-white/10 transition-all">Cancel</button>
                )}
            </div>
        </form>
    </div>
);
