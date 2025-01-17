import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { register } from '../../lib/auth';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    acceptTerms: false
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const { user, error } = await register({
        email: formData.email,
        password: formData.password,
        username: formData.username
      });

      if (error) throw error;
      // Redirect to home page or dashboard
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] px-4">
      <div className="max-w-md w-full space-y-8 bg-[#2a2a2a] p-8 rounded-lg shadow-xl">
        <div>
          <h2 className="text-3xl font-bold text-center text-[#ff4d00]">Crear Cuenta</h2>
          <p className="mt-2 text-center text-gray-400">Únete a nuestra comunidad</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <label className="text-sm font-medium text-gray-300" htmlFor="username">
                Nombre de Usuario
              </label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="username"
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-md bg-[#1a1a1a] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff4d00] focus:border-transparent"
                  placeholder="Tu nombre de usuario"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-sm font-medium text-gray-300" htmlFor="email">
                Correo Electrónico
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-md bg-[#1a1a1a] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff4d00] focus:border-transparent"
                  placeholder="monmail@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-sm font-medium text-gray-300" htmlFor="password">
                Contraseña
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="block w-full pl-10 pr-10 py-2 border border-slate-600 rounded-md bg-[#1a1a1a] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff4d00] focus:border-transparent"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="accept-terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-slate-600 bg-[#1a1a1a] text-[#ff4d00] focus:ring-[#ff4d00]"
                checked={formData.acceptTerms}
                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
              />
              <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-300">
                Acepto los <a href="#" className="text-[#ff4d00] hover:text-[#ff8533]">términos y condiciones</a>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ff4d00] hover:bg-[#ff8533] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff4d00] transition-colors disabled:opacity-50"
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>

          <p className="text-center text-sm text-gray-400">
            ¿Ya tienes una cuenta?{' '}
            <a href="/login" className="text-[#ff4d00] hover:text-[#ff8533]">
              Inicia sesión
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}