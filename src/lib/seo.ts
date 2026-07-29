import type { Metadata } from "next";
import { absoluteUrl } from "./site";

type PageSeo = {
  title: string;
  description: string;
  keywords?: string;
  path: string;
};

export function buildPageMetadata({
  title,
  description,
  keywords,
  path,
}: PageSeo): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "S.A.I. s.r.l.",
      locale: "it_IT",
      type: "website",
    },
  };
}

export const NOINDEX_METADATA: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};
