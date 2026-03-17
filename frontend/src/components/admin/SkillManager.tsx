import React from 'react';

interface Skill { id: number; name: string; }
interface SkillManagerProps {
    skills: Skill[];
    onAdd: (e: React.FormEvent<HTMLFormElement>) => void;
    onDelete: (id: number) => void;
}

export const SkillManager = ({ skills, onAdd, onDelete }: SkillManagerProps) => {
    const commonSkills = [
        'Python', 'React', 'Node.js', 'TypeScript', 'Docker', 'JavaScript', 'SQL', 'Pandas', 'AWS', 'Git', 'Tailwind',
        'Helpdesk', 'O365', 'Office 365', 'Infrastructure', 'Linux', 'PHP', 'Excel', 'n8n', 'ServiceNow', 'Jira',
        'PowerShell', 'Networking', 'Active Directory', 'Cybersecurity', 'IT Support'
    ];

    return (
        <div className="space-y-8">
            <form onSubmit={onAdd} className="glass p-8 rounded-3xl flex flex-col md:flex-row gap-4 max-w-4xl">
                <input 
                    name="name" 
                    list="skill-suggestions"
                    placeholder="Skill Name (e.g. Python)" 
                    required 
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-primary" 
                />
                <datalist id="skill-suggestions">
                    {commonSkills.map(s => <option key={s} value={s} />)}
                </datalist>
                
                <select name="category" className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-primary">
                    <option value="General">General</option>
                    <option value="Automation Engineering">Automation Engineering</option>
                    <option value="Software Architecture">Software Architecture</option>
                    <option value="Data Intelligence">Data Intelligence</option>
                    <option value="DevOps & Tooling">DevOps & Tooling</option>
                    <option value="Infrastructure & Support">Infrastructure & Support</option>
                </select>

                <button type="submit" className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-bright transition-all">Add Skill</button>
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
};
