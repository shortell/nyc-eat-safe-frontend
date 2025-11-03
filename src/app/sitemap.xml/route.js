// export const revalidate = 3600;

// export async function GET() {
//   const baseUrl = 'https://www.nyceatsafe.com';
//   const today = new Date().toISOString().split('T')[0];

//   let restaurants = [];
//   try {
//     const resp = await fetch('https://nyc-eat-safe-production.up.railway.app/sitemap-ids', {
//       headers: { 'User-Agent': 'SitemapGenerator/1.0 (+https://www.nyceatsafe.com)' },
//       cache: 'no-store',
//     });
//     if (resp.ok) restaurants = await resp.json();
//   } catch {}

//   const staticRoutes = ['/', '/about', '/near-me', '/feedback'];
//   const staticUrls = staticRoutes.map(
//     (p) => `<url><loc>${baseUrl}${p}</loc><lastmod>${today}</lastmod></url>`
//   );
//   const dynamicUrls = restaurants.map(
//     ({ camis }) =>
//       `<url><loc>${baseUrl}/restaurant/${camis}</loc><lastmod>${today}</lastmod></url>`
//   );

//   // Make sure this string starts at the VERY beginning
//   const xml = `<?xml version="1.0" encoding="UTF-8"?>` +
//     `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
//     staticUrls.join('') +
//     dynamicUrls.join('') +
//     `</urlset>`;

//   return new Response(xml, {
//     headers: {
//       'Content-Type': 'application/xml; charset=utf-8',
//     },
//   });
// }
export const revalidate = 86400; // Cache for 24 hours instead of 1 hour

export async function GET() {
  const baseUrl = 'https://www.nyceatsafe.com';
  
  let restaurants = [];
  try {
    const resp = await fetch('https://nyc-eat-safe-production.up.railway.app/sitemap-ids', {
      headers: { 'User-Agent': 'SitemapGenerator/1.0 (+https://www.nyceatsafe.com)' },
      next: { revalidate: 86400 }, // Cache API response
    });
    if (resp.ok) restaurants = await resp.json();
  } catch {}

  // Static pages - use fixed dates or omit lastmod
  const staticUrls = [
    { path: '/', priority: 1.0 },
    { path: '/about', priority: 0.5 },
    { path: '/near-me', priority: 0.8 },
    { path: '/feedback', priority: 0.5 },
  ].map(
    ({ path, priority }) => 
      `<url><loc>${baseUrl}${path}</loc><priority>${priority}</priority></url>`
  );

  // Dynamic pages - omit lastmod unless you track actual update times
  const dynamicUrls = restaurants.map(
    ({ camis }) =>
      `<url><loc>${baseUrl}/restaurant/${camis}</loc><priority>0.7</priority></url>`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    staticUrls.join('') +
    dynamicUrls.join('') +
    `</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}