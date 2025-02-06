import React from 'react';

const About = () => {
  return (
    <div className="relative bg-[#f5ede0] min-h-screen"> {/* Asegura que tenga el mismo color de fondo que el body */}
      {/* Hero Section */}
      <div className="relative h-96">
        <img
          src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2"
          alt="Beach houses"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Nosotros</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Nuestra Historia
            </h2>
            <p className="text-gray-600 mb-8">
              Desde 2015, nos hemos dedicado a ofrecer las mejores experiencias de alojamiento
              en las hermosas playas del norte del Perú. Nuestro compromiso con la excelencia
              y el servicio personalizado nos ha convertido en líderes del sector.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Misión
            </h3>
            <p className="text-gray-600 mb-8">
              Brindar a nuestros clientes experiencias únicas y memorables, ofreciendo
              propiedades excepcionales y un servicio de primera clase que supere sus expectativas.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Visión
            </h3>
            <p className="text-gray-600">
              Ser reconocidos como la empresa líder en alquiler de propiedades vacacionales
              en el norte del Perú, destacando por nuestra calidad, servicio y compromiso
              con la satisfacción del cliente.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.pexels.com/photos/931018/pexels-photo-931018.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Beach view"
              className="w-full h-64 object-cover rounded-lg"
            />
            <img
              src="https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="House interior"
              className="w-full h-64 object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGJlYWNofGVufDB8fDB8fHww"
              alt="Pool view"
              className="w-full h-64 object-cover rounded-lg"
            />
            <img
              src="https://plus.unsplash.com/premium_photo-1677691961682-490fc5c593bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGJlYWNofGVufDB8fDB8fHww"
              alt="Beach house"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
