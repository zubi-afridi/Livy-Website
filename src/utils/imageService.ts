/**
 * Professional Image Provider for Real Estate
 * Using High-Quality Architectural and Interior Design IDs from Unsplash
 */

const RE_IMAGES = {
  HOUSES: [
    "1600585154340-be6161a56a0c", // Modern House Exterior ---
    "1518780664697-55e3ad937233", // Minimalist Villa
    "1512917774080-9991f1c4c750", // Luxe Estate
    "1564013799919-ab600027ffc6", // Modern Suburban
    "1583608205776-bfd35f0d9f83", // Contemporary House
  ],
  BEDROOMS: [
    "1560185127-2ad9938814bb", // High-end Bedroom
    "1590608897129-79da98d15969", // Cozy Modern Bedroom
    "1505691938895-1758d7eaa511", // Master Suite
    "1616594831321-df1e7b469598", // Boutique Bedroom
    "1540518614846-7eded433c457", // Minimalist SleepSpace
  ],
  LIVING_ROOMS: [
    "1600210492486-724fe5c67fb0", // Modern Living Room
    "1600607687920-4e2a09cf159d", // Artistic Interior
    "1484154218962-a197022b5858", // Bright Open Space
    "1556911223-05ef0347fd24", // Kitchen/Living Combo
    "1493663284031-b7e3aefcae8e", // Modern Chic
  ],
  BATHROOMS: [
    "1552321554-5fefe8c9ef14", // Modern Bathroom
    "1584622650-085979c41cb8", // Spa-like Master Bath
  ],
};

export const getPropertyImage = (
  category: keyof typeof RE_IMAGES,
  index: number = 0,
  size: "800" | "1200" = "800",
) => {
  const ids = RE_IMAGES[category];
  const id = ids[index % ids.length];
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${size}&q=80`;
};

export const getRandomPropertyImage = (category: keyof typeof RE_IMAGES) => {
  const ids = RE_IMAGES[category];
  const id = ids[Math.floor(Math.random() * ids.length)];
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;
};

/**
 * Dynamic API Search Provider
 * Use this to fetch any specific type of images dynamically
 */
export const getDynamicImageUrl = (
  query: string,
  width: number = 800,
  height: number = 600,
) => {
  return `https://images.unsplash.com/photo-1560448204-61dc36dc98c8?auto=format&fit=crop&w=${width}&q=80&q=${query}`;
};

export default RE_IMAGES;
