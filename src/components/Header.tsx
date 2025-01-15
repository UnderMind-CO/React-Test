import React, { useState, useEffect } from 'react';
import { Swords, Bug, HelpCircle, Menu, X, Languages } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentLang, setCurrentLang] = useState('es');
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Cerrar el menú de idiomas cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLangOpen) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isLangOpen]);

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

  const text = languages[currentLang];

  return (
    <header className={`fixed w-full z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800">
        {/* Support Bar */}
        <div className="bg-slate-800/50 border-b border-slate-700">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-4 flex justify-between items-center h-8">
            <div className="flex items-center space-x-3 text-xs">
              <a href="#" className="flex items-center text-gray-300 hover:text-amber-500 transition-colors">
                <HelpCircle className="w-3 h-3 mr-1" />
                {text.soporte}
              </a>
              <span className="text-gray-600">|</span>
              <a href="#" className="flex items-center text-gray-300 hover:text-amber-500 transition-colors">
                <Bug className="w-3 h-3 mr-1" />
                {text.reportar}
              </a>
            </div>
            <div className="relative">
              <button 
                className="flex items-center space-x-1 text-gray-300 hover:text-amber-500 transition-colors rounded-md text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLangOpen(!isLangOpen);
                }}
              >
                <Languages className="w-3 h-3" />
                <span className="uppercase">{currentLang}</span>
              </button>
              
              {isLangOpen && (
                <div className="absolute right-0 mt-1 py-1 w-20 bg-slate-800 rounded-md shadow-lg border border-slate-700 animate-fade-in">
                  {Object.keys(languages).map((lang) => (
                    <button
                      key={lang}
                      className={`w-full text-left px-3 py-1 text-xs ${currentLang === lang ? 'text-amber-500' : 'text-gray-300'} hover:bg-slate-700/50 transition-colors`}
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
          <div className="flex justify-between items-center h-14 ">
           

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8 m-auto mx-auto">
              <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors">{text.inicio}</a>
              <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors">{text.noticias}</a>
              
               {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#" className="flex items-center">
                <Swords className="h-5 w-5 text-amber-500" />
                <span className="ml-2 mr-2 text-white font-bold">Vision</span>
                <Swords className="h-5 w-5 text-amber-500" />
              </a>
            </div>
              
              <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors">{text.tienda}</a>
              <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors">{text.comunidad}</a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors">{text.iniciarSesion}</a>
              <a href="#" className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors">
                {text.registrarse}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                className="text-gray-300 hover:text-amber-500 transition-colors"
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
                <a href="#" className="block px-3 py-2 text-gray-300 hover:text-amber-500 transition-colors">{text.inicio}</a>
                <a href="#" className="block px-3 py-2 text-gray-300 hover:text-amber-500 transition-colors">{text.noticias}</a>
                <a href="#" className="block px-3 py-2 text-gray-300 hover:text-amber-500 transition-colors">{text.tienda}</a>
                <a href="#" className="block px-3 py-2 text-gray-300 hover:text-amber-500 transition-colors">{text.comunidad}</a>
              </div>
              <div className="px-5 py-3 border-t border-slate-700">
                <a href="#" className="block text-center mb-2 text-gray-300 hover:text-amber-500 transition-colors">{text.iniciarSesion}</a>
                <a href="#" className="block text-center bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors">
                  {text.registrarse}
                </a>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}