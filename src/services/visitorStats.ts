import { GeolocationData } from "./geolocation";

interface CountryVisit {
  country: string;
  count: number;
  percentage: number;
  isCurrentUser?: boolean;
}

// Simulamos estadísticas de visitas por país
const countriesData: Record<string, number> = {
  "US": 2450,
  "MX": 1873,
  "ES": 1632,
  "CO": 982,
  "AR": 754,
  "PE": 671,
  "CL": 548,
  "EC": 412,
  "BR": 386,
  "FR": 245,
  "DE": 198,
  "GB": 186,
  "IT": 167,
};

/**
 * Devuelve estadísticas de visitas por país y marca el país del usuario actual
 */
export function getVisitorStats(userGeo: GeolocationData): CountryVisit[] {
  // Calculamos el total de visitas
  const totalVisits = Object.values(countriesData).reduce((sum, count) => sum + count, 0);
  
  // Si el país del usuario no está en nuestra lista, lo agregamos con un valor aleatorio pequeño
  if (userGeo.country !== 'unknown' && !countriesData[userGeo.country]) {
    const randomVisits = Math.floor(Math.random() * 100) + 50; // Entre 50 y 150 visitas
    countriesData[userGeo.country] = randomVisits;
  }
  
  // Convertir a array y calcular porcentajes
  return Object.entries(countriesData)
    .map(([country, count]) => ({
      country,
      count,
      percentage: parseFloat(((count / totalVisits) * 100).toFixed(1)),
      isCurrentUser: country === userGeo.country
    }))
    .sort((a, b) => b.count - a.count);
} 