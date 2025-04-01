"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { properties, Footer } from './Properties';
import { Users } from 'lucide-react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import emailjs from '@emailjs/browser';
import Confetti from 'react-confetti';

// Render personalizado para cada imagen de la galería
const renderGalleryItem = (item: { original: string; thumbnail: string }) => {
  return (
    <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
      <img
        src={item.original}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
};

// Arreglo fijo con las 9 características específicas que se deben mostrar en todas las propiedades
const defaultCharacteristics = [
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

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const property = properties.find((item) => item.id === id);
  const formRef = useRef<HTMLFormElement>(null);

  // Estado para el formulario de reserva
  const [loading, setLoading] = useState(false);
  const [reservationStatus, setReservationStatus] = useState({
    submitted: false,
    error: null as string | null,
    showConfetti: false
  });

  // Scroll al inicio cuando el componente se monta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!property) {
    return (
      <div
        style={{ backgroundColor: '#f5ede0', minHeight: '100vh' }}
        className="flex items-center justify-center text-[#5c4632]"
      >
        <h2 className="text-2xl font-semibold">Propiedad no encontrada</h2>
      </div>
    );
  }

  // Galería de imágenes
  const galleryImages =
    property.images && property.images.length > 0
      ? property.images.map((image) => ({
          original: image,
          thumbnail: image,
        }))
      : [];

  // Manejador del envío del formulario con EmailJS
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading(true);
    const form = formRef.current;

    const nombre = (form.elements.namedItem("nombre") as HTMLInputElement).value;
    const celular = (form.elements.namedItem("celular") as HTMLInputElement).value;
    const correo = (form.elements.namedItem("correo") as HTMLInputElement).value;
    const personas = (form.elements.namedItem("personas") as HTMLInputElement).value;
    const llegada = (form.elements.namedItem("llegada") as HTMLInputElement).value;
    const salida = (form.elements.namedItem("salida") as HTMLInputElement).value;

    const messageField = document.getElementById("messageField") as HTMLInputElement;
    const fromNameField = document.getElementById("fromNameField") as HTMLInputElement;
    if (messageField && fromNameField) {
      fromNameField.value = nombre;
      messageField.value = `Nombre: ${nombre}
Celular: ${celular}
Correo: ${correo}
Cantidad de personas: ${personas}
Llegada: ${llegada}
Salida: ${salida}`;
    }

    emailjs
      .sendForm(
        "service_mzuhcqp",    // Service ID
        "template_derowla",   // Template ID
        form,
        "YyR4uWLljS6IZIKie"   // Public Key
      )
      .then(
        (result) => {
          console.log(result.text);
          // En lugar de alert, actualizamos el estado para mostrar el mensaje y confetti
          setReservationStatus({
            submitted: true,
            error: null,
            showConfetti: true
          });
          form.reset();
          // Quitar el mensaje y el confetti después de 3 segundos
          setTimeout(() => {
            setReservationStatus({
              submitted: false,
              error: null,
              showConfetti: false
            });
          }, 3000);
        },
        (error) => {
          console.error(error.text);
          setReservationStatus({
            submitted: false,
            error: 'Ocurrió un error al enviar la reserva, por favor inténtalo de nuevo.',
            showConfetti: false
          });
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      style={{ backgroundColor: '#f5ede0', minHeight: '100vh' }}
      className="text-[#5c4632] relative"
    >
      {reservationStatus.showConfetti && <Confetti />}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Sección Superior: Detalles y Formulario */}
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Detalles de la Propiedad */}
          <div className="md:w-2/3 w-full mb-8 md:mb-0">
            {property.mainImage ? (
              <div className="overflow-hidden rounded-lg mb-6">
                <img
                  src={property.mainImage}
                  alt={property.name}
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            ) : (
              <div className="overflow-hidden rounded-lg mb-6 bg-gray-300 h-64 md:h-80 flex items-center justify-center">
                <span className="text-gray-600">Sin imagen principal</span>
              </div>
            )}

            <p className="text-sm mb-1">{property.location}</p>
            <h1 className="text-3xl font-bold mb-4">{property.name}</h1>

            <div className="flex items-center space-x-4 mb-2">
              {property.price && (
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 6h16v2H4zM4 12h16v2H4zM4 18h16v2H4z" />
                  </svg>
                  <span>S/ {property.price} por 24 horas</span>
                </div>
              )}
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-1" />
                <span>Capacidad</span>
              </div>
            </div>

            {property.capacity && (
              <p className="mb-4">Hasta para {property.capacity} personas</p>
            )}

            <div className="space-y-1 mb-6">
              {property.features?.map((feature, i) => (
                <p key={i}>{feature}</p>
              ))}
            </div>

            {property.additionalInfo && (
              <div className="mb-6">
                {property.additionalInfo.minStay && (
                  <p className="font-semibold mb-1">{property.additionalInfo.minStay}</p>
                )}
                {property.additionalInfo.priceNote && (
                  <p>{property.additionalInfo.priceNote}</p>
                )}
              </div>
            )}
          </div>

          {/* Formulario de Reserva */}
          <div className="md:w-1/3 w-full">
            <div className="bg-white rounded shadow p-6">
              <h3 className="text-xl font-semibold mb-4">
                S/ {property.price}.00 / 24 H
              </h3>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="nombre">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Nombre y Apellidos"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="celular">
                    Celular
                  </label>
                  <input
                    id="celular"
                    name="celular"
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="999 999 999"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="correo">
                    Correo
                  </label>
                  <input
                    id="correo"
                    name="correo"
                    type="email"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="personas">
                    Cantidad de personas
                  </label>
                  <input
                    id="personas"
                    name="personas"
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="2"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1" htmlFor="llegada">
                      Llegada
                    </label>
                    <input
                      id="llegada"
                      name="llegada"
                      type="date"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1" htmlFor="salida">
                      Salida
                    </label>
                    <input
                      id="salida"
                      name="salida"
                      type="date"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    />
                  </div>
                </div>
                {/* Campos ocultos para EmailJS */}
                <input type="hidden" name="message" id="messageField" />
                <input type="hidden" name="to_name" value="Administrador" />
                <input type="hidden" name="from_name" id="fromNameField" />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#876b45] text-white w-full py-2 rounded mt-2 font-semibold"
                >
                  {loading ? 'Enviando...' : 'RESERVAR'}
                </button>
              </form>
              {reservationStatus.submitted && (
                <p className="mt-4 text-center text-[#5c4632] font-semibold">
                  ¡La reserva se ha enviado correctamente!
                </p>
              )}
              {reservationStatus.error && (
                <p className="mt-4 text-center text-red-600 font-semibold">
                  {reservationStatus.error}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sección de Características Específicas (siempre se muestran los 9 íconos) */}
        <div className="mt-8 mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-b border-brown-200 pb-2">
            Características Específicas
          </h2>
          <div className="grid grid-cols-2 gap-8">
            {defaultCharacteristics.map((char, i) => (
              <div key={i} className="flex items-center space-x-4">
                <img
                  src={`/${char.icon}.png`}
                  alt={char.name}
                  className="w-8 h-8"
                />
                <span className="text-lg font-medium">{char.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ubicación y Galería */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Ubicación */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 border-b border-brown-200 pb-2">
              Ubicación
            </h2>
            <p className="text-sm font-medium mb-2">{property.location}</p>
            <div className="h-80 bg-gray-300 rounded-lg overflow-hidden">
              <iframe
                src={property.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Mapa de la propiedad"
              />
            </div>
          </div>
          {/* Galería */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 border-b border-brown-200 pb-2">
              Galería
            </h2>
            {galleryImages.length > 0 ? (
              <ImageGallery items={galleryImages} renderItem={renderGalleryItem} />
            ) : (
              <div className="h-32 flex items-center justify-center bg-gray-200 rounded-lg">
                <span className="text-gray-600">No hay imágenes disponibles.</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetails;
