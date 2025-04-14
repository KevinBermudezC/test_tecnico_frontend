import { GeolocationData } from "@/services/geolocation";
import { getVisitorStats } from "@/services/visitorStats";
import React from "react";

interface VisitorStatsProps {
  geolocation: GeolocationData;
}

export function VisitorStats({ geolocation }: VisitorStatsProps) {
  const stats = getVisitorStats(geolocation);
  
  // Obtener el país del usuario si existe en las estadísticas
  const userCountry = stats.find(stat => stat.isCurrentUser);
  
  return (
    <div className="bg-[#2D1543] p-6 rounded-lg shadow-lg mb-8 border border-purple-700">
      <h2 className="text-2xl text-white font-bold mb-4">Visitas por país</h2>
      
      {geolocation.country !== 'unknown' && userCountry && (
        <div className="mb-4 p-3 bg-[#3A1C57] rounded border border-purple-500">
          <p className="text-white">
            Tu país <span className="font-bold text-purple-300">{geolocation.country}</span> está en posición 
            <span className="font-bold text-purple-300"> #{stats.findIndex(stat => stat.isCurrentUser) + 1}</span> con
            <span className="font-bold text-purple-300"> {userCountry.count.toLocaleString()}</span> visitas 
            (<span className="font-bold text-purple-300">{userCountry.percentage}%</span> del total)
          </p>
        </div>
      )}
      
      <div className="space-y-3">
        {stats.slice(0, 10).map((stat, index) => (
          <div key={stat.country} className="flex items-center">
            <div className="w-8 text-gray-400 text-right pr-2">#{index + 1}</div>
            <div className={`w-16 font-medium ${stat.isCurrentUser ? 'text-purple-300' : 'text-white'}`}>
              {stat.country}
            </div>
            <div className="flex-1 ml-3">
              <div className="h-6 w-full bg-[#1A0B26] rounded-full overflow-hidden">
                <div 
                  className={`h-full ${stat.isCurrentUser ? 'bg-purple-500' : 'bg-purple-800'} rounded-full`} 
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
            </div>
            <div className="ml-3 w-16 text-right text-gray-300">
              {stat.percentage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 