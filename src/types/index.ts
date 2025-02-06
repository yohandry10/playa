export interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  capacity: number;
  bedrooms: number;
  description: string;
  mainImage: string;
  images: string[];
  features: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface BookingForm extends ContactForm {
  phone: string;
  guests: number;
  checkIn: Date;
  checkOut: Date;
  propertyId: string;
}