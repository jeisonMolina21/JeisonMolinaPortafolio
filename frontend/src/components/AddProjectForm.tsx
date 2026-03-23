import React, { useState } from 'react';
import { API_BASE_URL } from '../utils/api';

const AddProjectForm = ({ onProjectAdded }: { onProjectAdded: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    video_url: '',
    github_url: '',
    demo_url: '',
    tech_stack: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormData({
          title: '',
          description: '',
          image_url: '',
          video_url: '',
          github_url: '',
          demo_url: '',
          tech_stack: ''
        });
        setIsOpen(false);
        onProjectAdded();
        alert('¡Proyecto agregado con éxito!');
      } else {
        alert('Error al agregar el proyecto');
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="mb-12">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="admin-toggle-btn w-full sm:w-auto"
      >
        {isOpen ? 'Cancelar Registro' : '+ Agregar Nuevo Proyecto'}
      </button>

      {isOpen && (
        <div className="admin-card">
          <h3 className="text-xl sm:text-2xl font-display font-bold mb-6 text-white text-center sm:text-left">
            Detalles del Proyecto
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="form-group">
                <label htmlFor="title" className="form-label">Título</label>
                <input required id="title" value={formData.title} onChange={handleChange} className="form-input" placeholder="Nombre del proyecto" />
              </div>
              <div className="form-group">
                <label htmlFor="tech_stack" className="form-label">Skills (Separa por comas)</label>
                <input required id="tech_stack" value={formData.tech_stack} onChange={handleChange} className="form-input" placeholder="React, Astro, MySQL" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">Descripción</label>
              <textarea required id="description" value={formData.description} onChange={handleChange} rows={3} className="form-textarea" placeholder="Resumen de lo que hace el proyecto..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="form-group">
                <label htmlFor="image_url" className="form-label">URL de Imagen</label>
                <input required id="image_url" value={formData.image_url} onChange={handleChange} className="form-input" placeholder="https://..." />
              </div>
              <div className="form-group">
                <label htmlFor="video_url" className="form-label">URL de Video (Youtube/Vimeo)</label>
                <input id="video_url" value={formData.video_url} onChange={handleChange} className="form-input" placeholder="https://youtube.com/..." />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="form-group">
                <label htmlFor="github_url" className="form-label">Link GitHub</label>
                <input id="github_url" value={formData.github_url} onChange={handleChange} className="form-input" placeholder="https://github.com/..." />
              </div>
              <div className="form-group">
                <label htmlFor="demo_url" className="form-label">Link Demo</label>
                <input id="demo_url" value={formData.demo_url} onChange={handleChange} className="form-input" placeholder="https://..." />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="form-submit-btn"
            >
              {isLoading ? 'Guardando...' : 'Publicar Proyecto'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddProjectForm;
