import React, { useState } from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Confetti from 'react-confetti';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null as string | null
  });

  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });

    try {
      // Enviar el formulario con EmailJS usando el template de contacto
      await emailjs.send(
        'service_mzuhcqp',          // Service ID
        'template_n7jr5dr',         // Template ID
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message
        },
        'YyR4uWLljS6IZIKie'         // Public Key
      );

      setStatus({ submitting: false, submitted: true, error: null });
      setShowConfetti(true);
      setFormData({ name: '', email: '', message: '' });
      // Quitar el efecto de confetti y el mensaje después de 3 segundos
      setTimeout(() => {
        setShowConfetti(false);
        setStatus({ submitting: false, submitted: false, error: null });
      }, 3000);
    } catch (error) {
      setStatus({
        submitting: false,
        submitted: false,
        error: 'Hubo un error al enviar el mensaje. Por favor, intente nuevamente.'
      });
    }
  };

  return (
    <div className="relative bg-[#f5ede0] min-h-screen">
      {showConfetti && <Confetti />}
      {/* Hero Section */}
      <div className="relative h-96">
        <img
          src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2"
          alt="Contact us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Contáctanos</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-8">
              ¿Tienes alguna pregunta?
            </h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-[#876b45] mr-4" />
                <div>
                  <p className="font-semibold text-gray-900">Teléfono</p>
                  <p className="text-gray-600">+51 936 298 069</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-[#876b45] mr-4" />
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">viajesdelnorte7@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#876b45] focus:ring-[#876b45]"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#876b45] focus:ring-[#876b45]"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#876b45] focus:ring-[#876b45]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status.submitting}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#876b45] hover:bg-[#6b5436] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#876b45]"
            >
              {status.submitting ? 'Enviando...' : (
                <>
                  Enviar mensaje
                  <Send className="ml-2 w-4 h-4" />
                </>
              )}
            </button>

            {status.submitted && (
              <p className="text-[#5c4632] font-semibold">
                ¡Gracias por tu mensaje! Nos pondremos en contacto pronto.
              </p>
            )}

            {status.error && (
              <p className="text-red-600">{status.error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
