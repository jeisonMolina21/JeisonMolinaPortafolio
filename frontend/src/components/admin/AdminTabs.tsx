import React from 'react';

interface AdminTabsProps {
    activeTab: string;
    onTabChange: (tab: any) => void;
}

const tabs = ['profile', 'projects', 'experience', 'education', 'skills'];

export const AdminTabs = ({ activeTab, onTabChange }: AdminTabsProps) => (
    <div className="flex flex-wrap gap-4 mb-12 p-2 glass rounded-2xl w-full md:w-fit overflow-x-auto">
        {tabs.map(tab => (
            <button 
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-primary text-white shadow-lg' : 'text-text-dim hover:text-white'}`}
            >
                {tab}
            </button>
        ))}
    </div>
);
