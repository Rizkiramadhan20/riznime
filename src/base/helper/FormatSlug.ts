export const formatSlug = (text: string): string => {
  // Remove any /otakudesu/ or /genres/ prefixes globally
  let slug = text.replace(/\/otakudesu\//g, "/").replace(/\/genres\//g, "/");

  // If the slug still starts with /anime/, remove it for consistent slug formatting
  // The /anime/ prefix will be added back when constructing the full URL in components
  if (slug.startsWith("/anime/")) {
    slug = slug.substring("/anime/".length);
  } else if (slug.startsWith("/")) {
    // If it starts with just '/', remove it
    slug = slug.substring(1);
  }

  // Extract the last part of the path (the actual slug)
  const parts = slug.split("/");
  const lastPart = parts[parts.length - 1];

  // Finally format the slug
  return lastPart
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, "") // Remove any characters that aren't letters, numbers, or hyphens
    .replace(/-+/g, "-") // Replace multiple consecutive hyphens with a single hyphen
    .replace(/^-|-$/g, ""); // Remove hyphens from start and end
};
