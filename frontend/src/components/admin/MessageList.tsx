import React from 'react';

interface Message { 
    id: number; 
    name: string; 
    whatsapp: string; 
    phone: string; 
    city: string; 
    message: string; 
    created_at: string; 
}

export const MessageList = ({ messages, onDelete }: { messages: Message[], onDelete: (id: number) => void }) => (
    <div className="grid grid-cols-1 gap-6">
        {messages.map(msg => (
            <div key={msg.id} className="glass p-8 rounded-3xl flex justify-between items-start gap-8 border-white/5 group">
                <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-2">{msg.name} <span className="text-[10px] text-text-dim ml-4 uppercase">{msg.city}</span></h4>
                    <p className="text-text-dim text-sm italic mb-4">"{msg.message}"</p>
                    <div className="flex gap-4 text-[10px] font-bold text-primary-bright">
                        <span>WhatsApp: {msg.whatsapp}</span>
                        <span>Phone: {msg.phone}</span>
                    </div>
                </div>
                <button 
                    onClick={() => onDelete(msg.id)}
                    className="p-4 glass rounded-xl text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-400/10 active:scale-90"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        ))}
    </div>
);
