import { headers } from 'next/headers';

/**
 * Interfaz para los datos de geolocalización
 */
export interface GeolocationData {
  ip: string;
  country: string;
  city: string;
  region: string;
  latitude: number;
  longitude: number;
}

/**
 * Función que obtiene la información de geolocalización del usuario basada en su IP
 * mediante los headers de Vercel
 */
export async function getGeolocation(): Promise<GeolocationData> {
  const headersList = await headers();
  
  // Obtener la IP real del cliente desde los headers de Vercel
  const ip = headersList.get('x-real-ip') || 'unknown';
  
  // Obtener información de geolocalización de los headers de Vercel
  const country = headersList.get('x-vercel-ip-country') || 'unknown';
  const city = headersList.get('x-vercel-ip-city') || 'unknown';
  const region = headersList.get('x-vercel-ip-country-region') || 'unknown';
  const latitude = parseFloat(headersList.get('x-vercel-ip-latitude') || '0');
  const longitude = parseFloat(headersList.get('x-vercel-ip-longitude') || '0');

  return {
    ip,
    country,
    city,
    region,
    latitude,
    longitude
  };
}

/**
 * Función que devuelve un mensaje de saludo basado en la ubicación
 */
export function getLocalizedGreeting(geolocation: GeolocationData): string {
  if (geolocation.country === 'unknown') {
    return '¡Bienvenido a nuestra plataforma!';
  }
  
  return `¡Bienvenido desde ${geolocation.city}, ${geolocation.region}, ${geolocation.country}!`;
} 