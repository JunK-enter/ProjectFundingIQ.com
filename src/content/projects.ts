export type ProjectCategory = {
  title: string;
  image: string;
  alt: string;
  /** Reserved slug if a trade landing page is added later. */
  futureSlug?: string;
};

export const projectCategories: ProjectCategory[] = [
  {
    title: "Solar & Battery",
    image: "/images/solar.jpg",
    alt: "An installer carrying a solar panel onto a residential tile roof",
    futureSlug: "solar-contractors",
  },
  {
    title: "Roofing",
    image: "/images/roofing.jpg",
    alt: "Two roofers measuring a residential shingle roof",
    futureSlug: "roofing-contractors",
  },
  {
    title: "ADUs & Additions",
    image: "/images/adu.jpg",
    alt: "A room under construction, with a tradesperson preparing an unfinished wall",
    futureSlug: "adu-builders",
  },
  {
    title: "Kitchen & Bath",
    image: "/images/kitchen.jpg",
    alt: "A bright residential kitchen with white cabinets and a wood island",
    futureSlug: "remodeling-contractors",
  },
  {
    title: "HVAC",
    image: "/images/hvac.jpg",
    alt: "Outdoor air-conditioning condensers installed beside a home",
  },
  {
    title: "Electrical",
    image: "/images/electrical.jpg",
    alt: "An electrician working at a residential electrical panel",
  },
  {
    title: "Windows & Doors",
    image: "/images/windows.jpg",
    alt: "A tradesperson fitting a residential window in natural light",
  },
  {
    title: "Outdoor Improvements",
    image: "/images/outdoor.jpg",
    alt: "A residential backyard with a pool, garden, and a newer wing of the home",
  },
];

/**
 * Architecture for future SEO landing pages.
 * These routes are intentionally not built yet.
 */
export const futureAudiencePages = [
  {
    slug: "solar-contractors",
    audience: "Solar and battery installers",
    summary:
      "For crews whose customers want the system, and whose funding conversation stalls on another monthly payment.",
  },
  {
    slug: "roofing-contractors",
    audience: "Roofing contractors",
    summary:
      "For roof replacements and related exterior work that the homeowner already agreed the house needs.",
  },
  {
    slug: "adu-builders",
    audience: "ADU builders",
    summary:
      "For larger residential projects where the scope is wanted and the payment structure is what pauses the start date.",
  },
  {
    slug: "remodeling-contractors",
    audience: "Remodelers and home improvement companies",
    summary:
      "For kitchens, baths, and whole-home work where the estimate is done and the funding path is not.",
  },
] as const;
