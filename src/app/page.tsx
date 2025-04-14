import React from "react";
import { CourseGrid } from '@/components/Courses/CourseGrid';
import { UserLocation } from '@/components/Geolocation/UserLocation';
import { VisitorStats } from '@/components/Geolocation/VisitorStats';
import { getGeolocation, getLocalizedGreeting } from '@/services/geolocation';

export default async function Home() {
  // Obtener la información de geolocalización mediante SSR
  const geolocationData = await getGeolocation();
  const greeting = getLocalizedGreeting(geolocationData);

  return (
    <>
      <main className="flex-1 bg-[#1A0B26]">
        <div className="p-8 h-full overflow-y-auto">
          <h1 className="text-3xl font-bold text-white mb-4">{greeting}</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <UserLocation geolocation={geolocationData} />
            <VisitorStats geolocation={geolocationData} />
          </div>
          
          <CourseGrid />
        </div>
      </main>
    </>
  );
}
