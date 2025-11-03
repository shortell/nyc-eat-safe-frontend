export const revalidate = 3600;

export async function GET() {
  const baseUrl = 'https://www.nyceatsafe.com';
  const today = new Date().toISOString().split('T')[0];

  let restaurants = [];
  try {
    const resp = await fetch('https://nyc-eat-safe-production.up.railway.app/sitemap-ids', {
      headers: { 'User-Agent': 'SitemapGenerator/1.0 (+https://www.nyceatsafe.com)' },
      cache: 'no-store',
    });
    if (resp.ok) restaurants = await resp.json();
  } catch {}

  const staticRoutes = ['/', '/about', '/near-me', '/feedback'];
  const staticUrls = staticRoutes.map(
    (p) => `<url><loc>${baseUrl}${p}</loc><lastmod>${today}</lastmod></url>`
  );
  const dynamicUrls = restaurants.map(
    ({ camis }) =>
      `<url><loc>${baseUrl}/restaurant/${camis}</loc><lastmod>${today}</lastmod></url>`
  );

  // Make sure this string starts at the VERY beginning
  const xml = `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    staticUrls.join('') +
    dynamicUrls.join('') +
    `</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
