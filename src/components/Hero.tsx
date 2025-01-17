import React from 'react';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src='https://veloora.site/filemanager/userfiles/News/Ouverture.png'
          alt="Header Image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/70 to-[#1a1a1a]/30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Tu Destino te Espera en
          <span className="block text-[#ff4d00]">Dofus Vision</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Embárcate en una aventura épica en el mundo de los Doce. 
        </p>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"> 
          Forja alianzas, conquista territorios y conviértete en leyenda.
        </p>
        <button className="px-8 py-4 bg-[#ff4d00]/90 hover:bg-[#ff4d00] rounded-lg text-white text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(255,77,0,0.3)] backdrop-blur-sm">
          Jugar Ahora
        </button>
      </div>
    </div>
  );
}