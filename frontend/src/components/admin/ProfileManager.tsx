import React from 'react';

interface Profile { 
    full_name: string; 
    title: string; 
    bio: string; 
    location: string; 
    whatsapp: string; 
    email: string; 
    linkedin: string; 
    image_url: string;
}
interface ProfileManagerProps {
    profile: Profile;
    setProfile: (p: Profile) => void;
    onUpdate: (e: React.FormEvent) => void;
}

export const ProfileManager = ({ profile, setProfile, onUpdate }: ProfileManagerProps) => (
    <form onSubmit={onUpdate} className="glass p-10 rounded-[2.5rem] space-y-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-white border-l-4 border-primary pl-4">Personal Info</h3>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-text-dim uppercase">Full Name</label>
                    <input value={profile.full_name} onChange={e => setProfile({...profile, full_name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-text-dim uppercase">Location</label>
                    <input value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary" />
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-white border-l-4 border-primary pl-4">Contact Details</h3>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-text-dim uppercase">WhatsApp Number</label>
                    <input value={profile.whatsapp} onChange={e => setProfile({...profile, whatsapp: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-text-dim uppercase">Professional Email</label>
                    <input value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-text-dim uppercase">LinkedIn URL</label>
                    <input value={profile.linkedin} onChange={e => setProfile({...profile, linkedin: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary" />
                </div>
            </div>
        </div>
        <hr className="border-white/5" />
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-white border-l-4 border-primary pl-4">Professional Narrative (Auto-Translated)</h3>
            <div className="space-y-2">
                <label className="text-xs font-bold text-text-dim uppercase">Professional Title</label>
                <input value={profile.title} onChange={e => setProfile({...profile, title: e.target.value})} placeholder="e.g. Full Stack Developer" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary" />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-text-dim uppercase">Biography</label>
                <textarea value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} rows={6} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none resize-none focus:border-primary" />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-text-dim uppercase">Profile Picture</label>
                <input 
                    type="file" 
                    name="profile_image"
                    accept="image/*"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-bright" 
                />
                {profile.image_url && <p className="text-[10px] text-text-muted mt-1">Current: {profile.image_url.split('/').pop()}</p>}
            </div>
        </div>
        <button type="submit" className="w-full py-6 bg-primary text-white rounded-2xl font-bold hover:bg-primary-bright transition-all shadow-xl shadow-primary/20">Save Profile</button>
    </form>
);
