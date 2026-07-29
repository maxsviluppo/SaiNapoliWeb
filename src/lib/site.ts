export const SITE_URL = "https://www.sainapoli.com";

export function absoluteUrl(path: string = "/"): string {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
