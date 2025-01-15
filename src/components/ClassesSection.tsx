import React, { useState } from 'react';

/*

const classes = [
  {
    name: "Guerrero",
    description: "Maestro del combate cuerpo a cuerpo y la defensa.",
    image: "https://images.unsplash.com/photo-1615680022647-99c397cbcb8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  },
  {
    name: "Mago",
    description: "Domina los elementos y la magia arcana.",
    image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  },
  {
    name: "Arquero",
    description: "Experto en ataques a distancia y sigilo.",
    image: "https://images.unsplash.com/photo-1511025998370-7d59f82e9c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  }
];

export default function ClassesSection() {
  const [selectedClass, setSelectedClass] = useState(0);

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          Elige tu <span className="text-amber-500">Clase</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {classes.map((classItem, index) => (
            <div
              key={index}
              className={`relative cursor-pointer group ${
                selectedClass === index ? 'ring-2 ring-amber-500' : ''
              }`}
              onClick={() => setSelectedClass(index)}
            >
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img
                  src={classItem.image}
                  alt={classItem.name}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold mb-2">{classItem.name}</h3>
                  <p className="text-gray-300">{classItem.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="px-8 py-4 bg-amber-500 rounded-lg text-slate-900 text-lg font-semibold hover:bg-amber-400 transition">
            Ver Todas las Clases
          </button>
        </div>
      </div>
    </section>
  );
}*\