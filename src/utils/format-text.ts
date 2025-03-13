/**
 * Extrae el contenido de texto plano de una cadena HTML.
 * 
 * @param htmlString - El contenido HTML del cual extraer el texto
 * @returns El contenido de texto sin etiquetas HTML
 */
export const extractText = (htmlString: string): string => {
  // Devuelve cadena vacía si la entrada es falsy
  if (!htmlString) return "";

  // Analiza la cadena HTML en un documento DOM
  const doc = new DOMParser().parseFromString(htmlString, "text/html");
  // Extrae y devuelve solo el contenido de texto
  return doc.body.textContent || "";
};

/**
 * Trunca un texto multilínea a un número máximo específico de líneas.
 * 
 * @param text - El texto a truncar
 * @param maxLines - Número máximo de líneas a mantener (por defecto 2)
 * @returns Texto truncado con puntos suspensivos si se eliminaron líneas
 */
export const truncateLines = (text: string, maxLines: number = 2): string => {
  // Divide la entrada por saltos de línea, elimina espacios en blanco y líneas vacías
  const lines = text.split("\n").map((line) => line.trim()).filter((line) => line !== "");
  // Toma solo hasta maxLines líneas y las une con espacios
  // Agrega puntos suspensivos si había más líneas que maxLines
  return lines.slice(0, maxLines).join(" ") + (lines.length > maxLines ? "..." : "");
};