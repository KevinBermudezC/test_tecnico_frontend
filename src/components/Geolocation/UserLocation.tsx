import React from "react";
import { GeolocationData } from "@/services/geolocation";
import { LocationMap } from "./LocationMap";

interface UserLocationProps {
  geolocation: GeolocationData;
}

export function UserLocation({ geolocation }: UserLocationProps) {
  return (
    <div className="bg-[#2D1543] p-6 rounded-lg shadow-lg mb-8 border border-purple-700">
      <h2 className="text-2xl text-white font-bold mb-3">Tu ubicación</h2>
      
      {geolocation.country === 'unknown' ? (
        <p className="text-gray-300">No pudimos detectar tu ubicación actual.</p>
      ) : (
        <div className="text-gray-300 space-y-2">
          <p>
            <span className="font-semibold text-purple-300">Ciudad:</span> {geolocation.city}
          </p>
          <p>
            <span className="font-semibold text-purple-300">Región:</span> {geolocation.region}
          </p>
          <p>
            <span className="font-semibold text-purple-300">País:</span> {geolocation.country}
          </p>
          <p className="text-sm opacity-70">
            <span className="font-semibold">Coordenadas:</span> {geolocation.latitude.toFixed(4)}, {geolocation.longitude.toFixed(4)}
          </p>
          
          {/* Componente del mapa */}
          <LocationMap geolocation={geolocation} />
        </div>
      )}
    </div>
  );
} 