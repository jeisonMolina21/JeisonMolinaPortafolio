import React from 'react';

interface EntityListProps {
    items: any[];
    type: string;
    onEdit: (item: any) => void;
    onDelete: (id: number) => void;
}

export const EntityList = ({ items, type, onEdit, onDelete }: EntityListProps) => (
    <div className="lg:col-span-4 space-y-6">
        <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-tighter">Existing <span className="wine-gradient">{type}</span></h3>
        <div className="max-h-[600px] overflow-y-auto space-y-4 pr-4 custom-scrollbar">
            {items.map((item) => (
                <div key={item.id} className="glass p-5 rounded-2xl border-white/5 flex flex-col gap-4 group hover:border-primary/20 transition-all">
                    <div className="flex justify-between items-start">
                        <div>
                            <h5 className="font-bold text-white leading-tight">{item.title || item.company || item.institution || item.degree}</h5>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{item.lang}</span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => onEdit(item)} className="p-2 glass rounded-lg hover:text-cyan-400 transition-colors">✎</button>
                            <button onClick={() => onDelete(item.id)} className="p-2 glass rounded-lg hover:text-red-500 transition-colors">✕</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
