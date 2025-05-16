export const formatSlug = (text: string): string => {
  return text
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, "") // Remove any characters that aren't letters, numbers, or hyphens
    .replace(/-+/g, "-") // Replace multiple consecutive hyphens with a single hyphen
    .replace(/^-|-$/g, ""); // Remove hyphens from start and end
};
