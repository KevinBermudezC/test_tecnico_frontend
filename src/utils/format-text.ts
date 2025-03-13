export const extractText = (htmlString: string): string => {
  if (!htmlString) return "";

  const doc = new DOMParser().parseFromString(htmlString, "text/html");
  return doc.body.textContent || "";
};

export const truncateLines = (text: string, maxLines: number = 2): string => {
  const lines = text.split("\n").map((line) => line.trim()).filter((line) => line !== "");
  return lines.slice(0, maxLines).join(" ") + (lines.length > maxLines ? "..." : "");
};