import React, { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-midnight flex items-center justify-center p-6 text-center">
          <div className="glass p-12 rounded-[3.5rem] border-white/5 max-w-xl">
            <h1 className="text-4xl font-display font-black text-white mb-6">Oops! Algo salió mal.</h1>
            <p className="text-text-dim text-lg mb-10 leading-relaxed">
              El portafolio ha experimentado un error inesperado al cargar los datos. 
              Estamos trabajando para restaurar la conexión con el servidor.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-12 py-5 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:shadow-[0_0_40px_rgba(153,27,27,0.4)] transition-all"
            >
              Reintentar Carga
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
