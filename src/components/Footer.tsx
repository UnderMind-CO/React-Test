import React from 'react';
import { Swords, Facebook, Twitter, Youtube, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] border-t border-[#ff4d00]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Swords className="h-8 w-8 text-[#ff4d00]" />
              <span className="ml-2 text-xl font-bold">Dofus Vision</span>
            </div>
            <p className="text-gray-400">
              Un mundo de aventuras épicas te espera.
            </p>
            <div className="flex space-x-4 mt-4">
              <Facebook className="w-6 h-6 text-gray-400 hover:text-[#ff4d00] cursor-pointer" />
              <Twitter className="w-6 h-6 text-gray-400 hover:text-[#ff4d00] cursor-pointer" />
              <Youtube className="w-6 h-6 text-gray-400 hover:text-[#ff4d00] cursor-pointer" />
              <Instagram className="w-6 h-6 text-gray-400 hover:text-[#ff4d00] cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-[#ff4d00]">Inicio</a></li>
              <li><a href="/news" className="text-gray-400 hover:text-[#ff4d00]">Noticias</a></li>
              <li><a href="/guide" className="text-gray-400 hover:text-[#ff4d00]">Guía</a></li>
              <li><a href="/shop" className="text-gray-400 hover:text-[#ff4d00]">Tienda</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2">
              <li><a href="/help" className="text-gray-400 hover:text-[#ff4d00]">Centro de Ayuda</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-[#ff4d00]">Contacto</a></li>
              <li><a href="/status" className="text-gray-400 hover:text-[#ff4d00]">Estado del Servidor</a></li>
              <li><a href="/bug-report" className="text-gray-400 hover:text-[#ff4d00]">Reportar Bug</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/terms" className="text-gray-400 hover:text-[#ff4d00]">Términos de Servicio</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-[#ff4d00]">Política de Privacidad</a></li>
              <li><a href="/cookies" className="text-gray-400 hover:text-[#ff4d00]">Cookies</a></li>
              <li><a href="/eula" className="text-gray-400 hover:text-[#ff4d00]">EULA</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#ff4d00]/20 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Dofus Vision. Todos los derechos reservados.</p>
          <p>Developed ❤️ by <b><a href="https://github.com/UnderMind-CO" target="_blank"
          rel="noopener noreferrer" className="text-[#ff4d00] hover:text-[#ff8533]">UnderMind</a></b> &trade;.</p>
        </div>
      </div>
    </footer>
  );
}