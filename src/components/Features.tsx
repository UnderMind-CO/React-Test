import React from 'react';
import { Sword, Users, Trophy, ShoppingBag } from 'lucide-react';

const features = [
  {
    icon: <Sword className="w-8 h-8 text-amber-500" />,
    title: "Combate Épico",
    description: "Sistema de combate dinámico con habilidades únicas y combos."
  },
  {
    icon: <Users className="w-8 h-8 text-amber-500" />,
    title: "Comunidad Activa",
    description: "Únete a gremios, forma alianzas y participa en eventos sociales."
  },
  {
    icon: <Trophy className="w-8 h-8 text-amber-500" />,
    title: "PvP Competitivo",
    description: "Compite en arenas, batallas de territorio y rankings globales."
  },
  {
    icon: <ShoppingBag className="w-8 h-8 text-amber-500" />,
    title: "Economía Dinámica",
    description: "Comercia, craftea y participa en el mercado del juego."
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          Características <span className="text-amber-500">Principales</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-900 p-6 rounded-lg hover:transform hover:scale-105 transition duration-300">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}