import type { Metadata } from "next";

export const siteUrl = "https://projectfundingiq.com";

export const defaultDescription =
  "Learn how Home Equity Agreements may give eligible homeowners another funding option to explore when traditional financing doesn't fit their home improvement project.";

export const defaultTitle =
  "ProjectFundingIQ | Funding Education for Home Improvement Contractors";

export const ogImage = {
  url: "/images/residence.jpg",
  width: 1600,
  height: 1067,
  alt: "A residential home with a wide front porch in natural daylight",
};

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ProjectFundingIQ`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}
