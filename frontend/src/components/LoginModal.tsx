import React, { useState } from 'react';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }: { isOpen: boolean, onClose: () => void, onLoginSuccess: (token: string) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        onLoginSuccess(data.token);
        onClose();
      } else {
        setError(data.error || 'Credenciales inválidas');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        className="glass w-full max-w-md p-8 rounded-[2rem] animate-fade-in relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
            <h2 className="text-3xl font-display font-bold text-white mb-2 text-center">Bienvenido, <span className="text-primary italic">Jeison</span></h2>
            <p className="text-slate-400 text-sm text-center mb-8">Accede a tu panel administrativo</p>

            <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Usuario</label>
                <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all"
                    placeholder="Tu usuario"
                    required
                />
            </div>

            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Contraseña</label>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all"
                    placeholder="••••••••"
                    required
                />
            </div>

            {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-[0_0_20px_rgba(153,27,27,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 mt-4"
            >
                {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>
            
            <button 
                type="button" 
                onClick={onClose}
                className="w-full py-2 text-slate-500 text-xs hover:text-white transition-colors mt-2"
            >
                Cerrar
            </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
