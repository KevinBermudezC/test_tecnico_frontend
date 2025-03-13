import axios from "axios";
import { Course } from "../types/course";

const API_URL = "https://cl.trcsports.com/api/courses";

// Configurar un timeout para la petición
const axiosInstance = axios.create({
	timeout: 8000, // Reducimos a 5 segundos
	headers: {
		'Cache-Control': 'max-age=300' // Permitir caché por 5 minutos
	}
});

// Variable para controlar si hay una petición en curso
let isRequestInProgress = false;
let currentRequest: Promise<Course[]> | null = null;

export const getCourses = async (): Promise<Course[]> => {
	// Si ya hay una petición en curso, retornar la promesa existente
	if (isRequestInProgress && currentRequest) {
		return currentRequest;
	}

	isRequestInProgress = true;
	currentRequest = axiosInstance.get(API_URL)
		.then(response => {
			console.log('Respuesta del servidor:', response);
			// Validar la respuesta
			if (!response.data || !response.data.data || !Array.isArray(response.data.data)) {
				console.error('Formato de respuesta inválido:', response.data);
				throw new Error("Formato de respuesta inválido");
			}
			return response.data.data;
		})
		.catch(error => {
			console.error('Error completo:', error);
			// Manejo de errores más específico
			if (axios.isAxiosError(error)) {
				console.error('Detalles del error Axios:', {
					code: error.code,
					message: error.message,
					response: error.response,
					request: error.request
				});
				
				if (error.code === 'ECONNABORTED') {
					throw new Error("La solicitud ha excedido el tiempo de espera. Por favor, inténtalo de nuevo.");
				}
				if (error.response) {
					throw new Error(`Error del servidor: ${error.response.status} - ${error.response.statusText}`);
				} else if (error.request) {
					throw new Error("No se pudo conectar con el servidor. Verifica tu conexión a internet.");
				}
			}
			throw error;
		})
		.finally(() => {
			isRequestInProgress = false;
			currentRequest = null;
		});

	return currentRequest;
};