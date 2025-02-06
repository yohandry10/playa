import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Determina si la ruta coincide con la actual (sección activa)
  const isActive = (path: string) => location.pathname === path;

  // Definición de los enlaces de navegación
  const links = [
    { path: '/', text: 'Inicio' },
    { path: '/alquiler', text: 'Alquiler' },
    { path: '/nosotros', text: 'Nosotros' },
    { path: '/contacto', text: 'Contacto' },
  ];

  // Alterna el menú móvil
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    // Aumentamos la altura del navbar a h-32 para dar más espacio
    <nav className="fixed top-0 left-0 right-0 bg-[#f5ede0] backdrop-blur-sm z-50 shadow-none h-32 flex items-center font-serif">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex items-center justify-between">
          {/* Logo: Se reemplaza el texto por la imagen "C12.png" con mayor tamaño.
              Se añade la clase bg-[#f5ede0] para que el fondo del logo coincida con el navbar */}
          <Link to="/" className="block bg-[#f5ede0]">
            <img
              src="/c2.png"
              alt="Logo CasasVerano"
              className="h-32 w-auto object-contain"
            />
          </Link>

          {/* Navegación para escritorio */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map(({ path, text }) => (
              <Link key={path} to={path}>
                <span
                  className={`px-6 py-3 rounded-lg text-lg font-medium border-2 transition-all duration-200 ${
                    isActive(path)
                      ? 'border-gray-800 text-gray-800'
                      : 'border-transparent text-gray-600 hover:border-gray-800 hover:text-gray-800'
                  }`}
                >
                  {text}
                </span>
              </Link>
            ))}
            <button className="bg-[#5d3b1a] text-white px-6 py-2 rounded-lg text-lg font-medium hover:bg-[#7a5430] transition-colors duration-300">
              Reservar
            </button>
          </div>

          {/* Botón para el menú móvil */}
          <div className="md:hidden">
            <button
              className="text-gray-800 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menú desplegable para móviles */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 bg-[#f5ede0] p-4 rounded-lg">
            {links.map(({ path, text }) => (
              <Link key={path} to={path} onClick={toggleMenu}>
                <span
                  className={`block px-6 py-3 rounded-lg text-lg font-medium border-2 transition-all duration-200 ${
                    isActive(path)
                      ? 'border-gray-800 text-gray-800'
                      : 'border-transparent text-gray-600 hover:border-gray-800 hover:text-gray-800'
                  }`}
                >
                  {text}
                </span>
              </Link>
            ))}
            <button className="w-full bg-[#5d3b1a] text-white px-6 py-2 rounded-lg text-lg font-medium hover:bg-[#7a5430] transition-colors duration-300">
              Reservar
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
