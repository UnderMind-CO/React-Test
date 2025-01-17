import React, { useState, useEffect } from 'react';
import { Swords, Bug, HelpCircle, Menu, X, Languages, LogIn, UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentLang, setCurrentLang] = useState('es');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [user, setUser] = useState(null);

  const languages = {
    es: {
      inicio: 'Inicio',
      noticias: 'Noticias',
      tienda: 'Tienda',
      comunidad: 'Comunidad',
      soporte: 'Soporte',
      reportar: 'Reportar Bug',
      iniciarSesion: 'Iniciar Sesión',
      registrarse: 'Registrarse'
    },
    en: {
      inicio: 'Home',
      noticias: 'News',
      tienda: 'Shop',
      comunidad: 'Community',
      soporte: 'Support',
      reportar: 'Report Bug',
      iniciarSesion: 'Login',
      registrarse: 'Register'
    },
    fr: {
      inicio: 'Accueil',
      noticias: 'Actualités',
      tienda: 'Boutique',
      comunidad: 'Communauté',
      soporte: 'Support',
      reportar: 'Signaler un Bug',
      iniciarSesion: 'Connexion',
      registrarse: 'S\'inscrire'
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLangOpen) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isLangOpen]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const text = languages[currentLang];

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      window.location.href = '/';
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="bg-[#1a1a1a]/80 backdrop-blur-sm border-b border-[#ff4d00]/20">
        {/* Support Bar */}
        <div className="bg-[#2a2a2a]/50 border-b border-[#ff4d00]/20">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-4 flex justify-between items-center h-8">
            <div className="flex items-center space-x-3 text-xs">
              <a href="#" className="flex items-center text-gray-300 hover:text-[#ff4d00] transition-colors">
                <HelpCircle className="w-3 h-3 mr-1" />
                {text.soporte}
              </a>
              <span className="text-[#ff4d00]/40">|</span>
              <a href="#" className="flex items-center text-gray-300 hover:text-[#ff4d00] transition-colors">
                <Bug className="w-3 h-3 mr-1" />
                {text.reportar}
              </a>
            </div>
            <div className="relative">
              <button 
                className="flex items-center space-x-1 text-gray-300 hover:text-[#ff4d00] transition-colors rounded-md text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLangOpen(!isLangOpen);
                }}
              >
                <Languages className="w-3 h-3" />
                <span className="uppercase">{currentLang}</span>
              </button>
              
              {isLangOpen && (
                <div className="absolute right-0 mt-1 py-1 w-20 bg-[#2a2a2a] rounded-md shadow-lg border border-[#ff4d00]/20 animate-fade-in">
                  {Object.keys(languages).map((lang) => (
                    <button
                      key={lang}
                      className={`w-full text-left px-3 py-1 text-xs ${currentLang === lang ? 'text-[#ff4d00]' : 'text-gray-300'} hover:bg-[#ff4d00]/10 transition-colors`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentLang(lang);
                        setIsLangOpen(false);
                      }}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="max-w-auto mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8 m-auto mx-auto">
              <a href="/" className="text-gray-300 hover:text-[#ff4d00] transition-colors">{text.inicio}</a>
              <a href="/news" className="text-gray-300 hover:text-[#ff4d00] transition-colors">{text.noticias}</a>
              
              {/* Logo */}
              <div className="flex-shrink-0">
                <a href="/" className="flex items-center">
                  <Swords className="h-5 w-5 text-[#ff4d00]" />
                  <span className="ml-2 mr-2 text-white font-bold">Vision</span>
                  <Swords className="h-5 w-5 text-[#ff4d00]" />
                </a>
              </div>
              
              <a href="/shop" className="text-gray-300 hover:text-[#ff4d00] transition-colors">{text.tienda}</a>
              <a href="/community" className="text-gray-300 hover:text-[#ff4d00] transition-colors">{text.comunidad}</a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-[#ff4d00] transition-colors"
                >
                  Cerrar Sesión
                </button>
              ) : (
                <>
                  <a 
                    href="/auth/login" 
                    className="text-gray-300 hover:text-[#ff4d00] transition-colors flex items-center"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    {text.iniciarSesion}
                  </a>
                  <a 
                    href="/auth/register" 
                    className="bg-[#ff4d00] text-white px-4 py-2 rounded-md hover:bg-[#ff8533] transition-colors flex items-center"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {text.registrarse}
                  </a>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                className="text-gray-300 hover:text-[#ff4d00] transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="/" className="block px-3 py-2 text-gray-300 hover:text-[#ff4d00] transition-colors">{text.inicio}</a>
                <a href="/news" className="block px-3 py-2 text-gray-300 hover:text-[#ff4d00] transition-colors">{text.noticias}</a>
                <a href="/shop" className="block px-3 py-2 text-gray-300 hover:text-[#ff4d00] transition-colors">{text.tienda}</a>
                <a href="/community" className="block px-3 py-2 text-gray-300 hover:text-[#ff4d00] transition-colors">{text.comunidad}</a>
              </div>
              <div className="px-5 py-3 border-t border-[#ff4d00]/20">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-[#ff4d00] transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                ) : (
                  <>
                    <a href="/auth/login" className="flex items-center text-gray-300 hover:text-[#ff4d00] transition-colors">
                      <LogIn className="w-4 h-4 mr-2" />
                      {text.iniciarSesion}
                    </a>
                    <a href="/auth/register" className="flex items-center bg-[#ff4d00] text-white px-4 py-2 rounded-md hover:bg-[#ff8533] transition-colors mt-2">
                      <UserPlus className="w-4 h-4 mr-2" />
                      {text.registrarse}
                    </a>
                  </>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}