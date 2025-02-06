import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2"
          alt="Luxury beach house"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold text-white mb-6">
            Descubre tu escape perfecto en las playas del norte
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Casas de lujo frente al mar en las mejores ubicaciones de Vichayito.
            Vive una experiencia única con todas las comodidades.
          </p>
          <Link
            to="/alquiler"
            className="inline-flex items-center bg-[#faf6ee] text-brown-900 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#5d3b1a] hover:text-white transition-colors duration-300"
          >
            Ver propiedades
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
