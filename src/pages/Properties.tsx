import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Users, Home, ArrowRight } from 'lucide-react';

// Arreglo de propiedades con información única
export const properties = [
  {
    id: 'casa-1',
    name: 'Pocitas 1',
    location: 'Vichayito',
    price: 750,
    capacity: 14,
    bedrooms: 4,
    mainImage: '/1/5.jpeg',
    features: [
      "4 habitaciones - Distribución: 3 Habitaciones: cama matrimonial y baño incorporado; Habitación: cama matrimonial + camarote de 3 pisos y baño incorporado"
    ],
    description: "Hermosa propiedad con todas las comodidades.",
    images: Array.from({ length: 16 }, (_, i) => `/1/${i + 1}.jpeg`),
    // Aunque aquí se definen _characteristics_, en el detalle se usará el arreglo fijo
    characteristics: [
      { icon: 'cocina', name: 'Cocina equipada y menaje' },
      { icon: 'piscina', name: 'Piscina' },
      { icon: 'wifi', name: 'Wifi' },
      { icon: 'salaTv', name: 'Sala con TV' },
      { icon: 'horno', name: 'Horno de barro' },
      { icon: 'comedor', name: 'Comedor' },
      { icon: 'terraza', name: 'Terraza' },
      { icon: 'parrilla', name: 'Parrilla' },
      { icon: 'vistaAlMar', name: 'Vista al mar' }
    ],
    additionalInfo: {
      minStay: '1 noche',
      priceNote:
        'El costo y mínimo de noches pueden cambiar en fechas como feriados, Semana Santa, fiestas patrias o fin de año.'
    },
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d10881.513824198739!2d-81.0827778!3d-4.1165278!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses-419!2spe!4v1738790789475!5m2!1ses-419!2spe"
  },
  {
    id: 'casa-2',
    name: 'Pocitas 2',
    location: 'Vichayito',
    price: 750,
    capacity: 15,
    bedrooms: 5,
    mainImage: '/2/18.jpeg',
    features: [
      "5 habitaciones - Distribución: Habitación: cama king, baño completo y terraza con vista al mar; 2 habitaciones: cama doble, baño completo, balcón y vista al jardín; Habitación: cama doble y 2 camas de 1.5 plazas (tipo camarote), baño completo y vista al jardín; Habitación: cama doble y dos camas de 1.5 plazas (tipo camarote), baño completo y vista al jardín"
    ],
    description: "Espectacular villa con servicios adicionales y cocina equipada.",
    images: Array.from({ length: 20 }, (_, i) => `/2/${i + 17}.jpeg`),
    characteristics: [
      { icon: 'cocina', name: 'Cocina equipada' },
      { icon: 'pet', name: 'Pet friendly' },
      { icon: 'guardian', name: 'Guardian 24h' },
      { icon: 'estacionamiento', name: 'Estacionamiento' },
      { icon: 'piscina', name: 'Piscina' }
    ],
    additionalInfo: {
      minStay: '1 noche',
      priceNote:
        'El costo y mínimo de noches pueden cambiar en fechas especiales.'
    },
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m8!1m3!1d10881.478122879627!2d-81.0884167!3d-4.1191389!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d-4.119138899999999!2d-81.0884167!5e1!3m2!1ses-419!2spe!4v1738790920513!5m2!1ses-419!2spe"
  },
  {
    id: 'casa-3',
    name: 'Zorritos 1',
    location: 'Zorritos',
    price: 800,
    capacity: 16,
    bedrooms: 4,
    mainImage: '/3/42.jpeg',
    features: [
      "Habitación con cama King, dos camarotes, aire acondicionado y baño; Habitación principal con vista al mar, cama King, aire acondicionado, baño y terraza; Habitación con cama King, aire acondicionado y baño; Habitación con cama King, aire acondicionado y baño"
    ],
    description: "Casa moderna con servicios de limpieza y cocina.",
    images: Array.from({ length: 20 }, (_, i) => `/3/${i + 37}.jpeg`),
    characteristics: [
      { icon: 'limpieza', name: 'Personal de limpieza' },
      { icon: 'piscina', name: 'Piscina' },
      { icon: 'wifi', name: 'Wifi' },
      { icon: 'comedor', name: 'Comedor' },
      { icon: 'terraza', name: 'Terraza' }
    ],
    additionalInfo: {
      minStay: '1 noche',
      priceNote:
        'El costo y mínimo de noches pueden variar según la temporada.'
    },
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m8!1m3!1d10886.736944882388!2d-80.7370833!3d-3.7148333!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d-3.7148333!2d-80.7370833!5e1!3m2!1ses-419!2spe!4v1738790952900!5m2!1ses-419!2spe"
  },
  {
    id: 'casa-4',
    name: 'Punta Sal',
    location: 'Punta Sal',
    price: 800,
    capacity: 18,
    bedrooms: 7,
    mainImage: '/4/57.jpeg',
    features: [
      "7 habitaciones - Distribución: 1er nivel: Habitación con cama matrimonial y baño incorporado; 2do nivel: habitación con cama queen y baño incorporado, habitación con 2 camas matrimoniales y baño incorporado, habitación con cama matrimonial en cuarto de juegos; 1 baño compartido para las habitaciones secundarias; 3er nivel: habitación matrimonial + cama individual, habitación matrimonial + cama individual, 1 baño compartido para las del 3er nivel"
    ],
    description: "Bungalow moderno con servicios de limpieza y cocina.",
    images: Array.from({ length: 20 }, (_, i) => `/4/${i + 57}.jpeg`),
    characteristics: [
      { icon: 'limpieza', name: 'Personal de limpieza' },
      { icon: 'cocina', name: 'Personal de cocina' },
      { icon: 'wifi', name: 'Wifi' },
      { icon: 'terraza', name: 'Terraza' }
    ],
    additionalInfo: {
      minStay: '1 noche',
      priceNote:
        'El costo y mínimo de noches pueden cambiar en fechas especiales.'
    },
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d10883.90412339108!2d-80.9268056!3d-3.9377778!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses-419!2spe!4v1738790999122!5m2!1ses-419!2spe"
  },
  {
    id: 'casa-5',
    name: 'Vichayito 1',
    location: 'Vichayito',
    price: 750,
    capacity: 20,
    bedrooms: 6,
    mainImage: '/5/88.jpeg',
    features: [
      "6 habitaciones - Distribución: Habitación principal con cama de 2 plazas, TV, baño incorporado y terraza con vista al mar; Habitación con cama de 2 plazas, 1 camarote de 1 plaza, TV, baño incorporado y terraza con vista al mar; Habitación con 2 camarotes de 1 plaza, TV y baño incorporado; Habitación con cama de 2 plazas y 1 camarote de 1 plaza, TV y baño incorporado; Todos los dormitorios tienen agua caliente, ventiladores y aire acondicionado"
    ],
    description: "Casa en Vichayito con guardian 24h y servicios adicionales.",
    images: Array.from({ length: 16 }, (_, i) => `/5/${i + 78}.jpeg`),
    characteristics: [
      { icon: 'guardian', name: 'Guardian 24h' },
      { icon: 'limpieza', name: 'Personal de limpieza' },
      { icon: 'cocina', name: 'Personal de cocina' },
      { icon: 'piscina', name: 'Piscina' }
    ],
    additionalInfo: {
      minStay: '1 noche',
      priceNote:
        'El costo y mínimo de noches pueden cambiar en fechas especiales.'
    },
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m8!1m3!1d10881.13171614031!2d-81.1077778!3d-4.1443889!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d-4.1443889!2d-81.1077778!5e1!3m2!1ses-419!2spe!4v1738791036261!5m2!1ses-419!2spe"
  },
  {
    id: 'casa-6',
    name: 'Lor Organos 1',
    location: 'Lor Organos',
    price: 700,
    capacity: 20,
    bedrooms: 7,
    mainImage: '/6/101.jpeg',
    features: [
      "7 habitaciones - Distribución: Todas las habitaciones tienen vista al mar; 3 habitaciones triples (cada una con baño incorporado); 1 habitación cuádruple (con baño incorporado); 3 habitaciones dobles (cada una con baño incorporado)"
    ],
    description: "Propiedad con vistas al mar y servicios de limpieza y cocina.",
    images: Array.from({ length: 18 }, (_, i) => `/6/${i + 94}.jpeg`),
    characteristics: [
      { icon: 'limpieza', name: 'Personal de limpieza' },
      { icon: 'cocina', name: 'Personal de cocina' },
      { icon: 'wifi', name: 'Wifi' },
      { icon: 'terraza', name: 'Terraza' },
      { icon: 'piscina', name: 'Piscina' }
    ],
    additionalInfo: {
      minStay: '1 noche',
      priceNote:
        'El costo y mínimo de noches pueden cambiar en fechas especiales.'
    },
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m8!1m3!1d10880.644198444554!2d-81.1354444!3d-4.1796667!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d-4.179666699999999!2d-81.1354444!5e1!3m2!1ses-419!2spe!4v1738791064869!5m2!1ses-419!2spe"
  }
];

// Arreglo fijo de 9 características específicas que se mostrarán en el detalle
export const defaultCharacteristics = [
  { icon: 'cocina', name: 'Cocina equipada y menaje' },
  { icon: 'piscina', name: 'Piscina' },
  { icon: 'wifi', name: 'Wifi' },
  { icon: 'salaTv', name: 'Sala con TV' },
  { icon: 'horno', name: 'Horno de barro' },
  { icon: 'comedor', name: 'Comedor' },
  { icon: 'terraza', name: 'Terraza' },
  { icon: 'parrilla', name: 'Parrilla' },
  { icon: 'vistaAlMar', name: 'Vista al mar' }
];

// Componente Footer reutilizable
export const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`relative overflow-hidden py-32 px-4 ${isVisible ? 'fade-in' : 'opacity-0'}`}
      style={{ fontFamily: '"Poppins", sans-serif', minHeight: '500px' }}
    >
      <img
        src="/CA.png"
        alt="Imagen del footer"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: -1, backgroundSize: 'cover' }}
      />
      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center md:justify-start">
          <div
            className="bg-white rounded-lg px-6 py-4 shadow-lg text-center md:text-left"
            style={{ maxWidth: '400px' }}
          >
            <h2 className="text-lg font-bold text-gray-900 mb-2">Contáctanos</h2>
            <div className="flex items-center gap-2 mb-2">
              <Phone size={24} />
              <span className="text-base font-medium text-gray-900">
                Línea fija de atención al cliente: 7018102
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={24} />
              <span className="text-base font-medium text-gray-900">
                informacion@alquilercasasverano.com
              </span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div
            className="overflow-hidden rounded-lg shadow-lg"
            style={{ width: '400px', maxWidth: '100%' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63673.80330172592!2d-81.065216!3d-4.098956!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x90369145e9f7ec2b%3A0xe2503474184ecaf!2zTcOhbmNvcmEsIFBlcsO6!5e0!3m2!1ses-419!2sus!4v1738790789475!5m2!1ses-419!2spe"
              width="400"
              height="250"
              style={{
                border: 0,
                borderRadius: '12px',
                boxShadow: 'rgba(0, 0, 0, 0.3) 0px 4px 8px'
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de la propiedad"
            ></iframe>
          </div>
        </div>
      </div>
      <style>{`
        .fade-in {
          animation: fadeIn 1s ease-in-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </footer>
  );
};

const Properties: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#f5ede0', minHeight: '100vh', padding: '20px' }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1
          className="text-4xl font-semibold text-center"
          style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
        >
          Nuestras Propiedades en Alquiler
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="rounded-lg shadow-md overflow-hidden"
              style={{ backgroundColor: '#f5ede0' }}
            >
              <div className="relative h-64">
                <img
                  src={property.mainImage}
                  alt={property.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-brown-900 mb-2">
                  {property.name}
                </h2>
                <p className="text-brown-700 mb-4 flex items-center">
                  <Home className="w-4 h-4 mr-2" />
                  {property.location}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-brown-700">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{property.capacity} personas</span>
                  </div>
                  <p className="text-brown-800 font-semibold">
                    S/ {property.price} / noche
                  </p>
                </div>
                <Link
                  to={`/alquiler/${property.id}`}
                  className="bg-[#876b45] text-white w-full inline-flex items-center justify-center py-2 rounded mt-2 font-semibold"
                >
                  Ver detalles
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Properties;
