import React from 'react';

interface Skill { id: number; name: string; }
interface SkillManagerProps {
    skills: Skill[];
    onAdd: (e: React.FormEvent<HTMLFormElement>) => void;
    onDelete: (id: number) => void;
}

export const SkillManager = ({ skills, onAdd, onDelete }: SkillManagerProps) => (
    <div className="space-y-8">
        <form onSubmit={onAdd} className="glass p-8 rounded-3xl flex gap-4 max-w-xl">
            <input name="name" placeholder="New Skill Name" required className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-primary" />
            <button type="submit" className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-bright">Add</button>
        </form>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
            {skills.map(skill => (
                <div key={skill.id} className="glass p-6 rounded-2xl relative group border-white/5 hover:border-primary/20 transition-all">
                    <span className="text-sm font-bold text-white block mb-2">{skill.name}</span>
                    <button onClick={() => onDelete(skill.id)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                </div>
            ))}
        </div>
    </div>
);
