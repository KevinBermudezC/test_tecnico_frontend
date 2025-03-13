import axios from "axios";
import { Course } from "../types/course";

const API_URL = "https://cl.trcsports.com/api/courses";

// Configurar un timeout para la petición
const axiosInstance = axios.create({
	timeout: 10000, // 10 segundos
	headers: {
		'Cache-Control': 'max-age=300' // Permitir caché por 5 minutos
	}
});

// Variable para controlar si hay una petición en curso
let isRequestInProgress = false;

export const getCourses = async (): Promise<Course[]> => {
	// Si ya hay una petición en curso, esperar a que termine
	if (isRequestInProgress) {
		return new Promise((resolve) => {
			const checkInterval = setInterval(() => {
				if (!isRequestInProgress) {
					clearInterval(checkInterval);
					resolve(getCourses());
				}
			}, 100);
		});
	}

	isRequestInProgress = true;

	try {
		const response = await axiosInstance.get(API_URL);
		
		// Validar la respuesta
		if (!response.data || !response.data.data || !Array.isArray(response.data.data)) {
			throw new Error("Formato de respuesta inválido");
		}
		
		return response.data.data;
	} catch (error) {
		// Manejo de errores más específico
		if (axios.isAxiosError(error)) {
			if (error.code === 'ECONNABORTED') {
				throw new Error("La solicitud ha excedido el tiempo de espera. Por favor, inténtalo de nuevo.");
			}
			if (error.response) {
				// El servidor respondió con un código de estado fuera del rango 2xx
				throw new Error(`Error del servidor: ${error.response.status}`);
			} else if (error.request) {
				// La solicitud se realizó pero no se recibió respuesta
				throw new Error("No se recibió respuesta del servidor. Verifica tu conexión a internet.");
			}
		}
		
		console.error("Error fetching courses:", error);
		throw error;
	} finally {
		isRequestInProgress = false;
	}
}