'use client';

import { GeolocationData } from "@/services/geolocation";
import React,{ useState } from "react";

interface LocationMapProps {
  geolocation: GeolocationData;
}

export function LocationMap({ geolocation }: LocationMapProps) {
  const [showMap, setShowMap] = useState(false);

  // No mostrar el mapa si la ubicación es desconocida
  if (geolocation.country === 'unknown') {
    return null;
  }

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${geolocation.longitude - 0.01},${geolocation.latitude - 0.01},${geolocation.longitude + 0.01},${geolocation.latitude + 0.01}&layer=mapnik&marker=${geolocation.latitude},${geolocation.longitude}`;
  
  return (
    <div className="mt-4">
      <button 
        onClick={() => setShowMap(!showMap)}
        className="text-purple-300 hover:text-purple-200 text-sm font-medium flex items-center"
      >
        {showMap ? 'Ocultar mapa' : 'Ver en el mapa'} 
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 ml-1 transition-transform ${showMap ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {showMap && (
        <div className="mt-3 rounded-lg overflow-hidden border border-purple-700 h-60 shadow-lg">
          <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no" 
            marginHeight={0} 
            marginWidth={0} 
            src={mapUrl} 
            title="Mapa de tu ubicación" 
          />
        </div>
      )}
    </div>
  );
} 