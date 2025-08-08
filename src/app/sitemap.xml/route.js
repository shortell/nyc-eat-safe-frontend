export async function GET() {
  const baseUrl = 'https://www.nyceatsafe.com';
  const today = new Date().toISOString();

  // 1. Fetch all restaurant IDs from your backend
  const response = await fetch('https://nyc-eat-safe-production.up.railway.app/sitemap-ids');
  const restaurants = await response.json(); // [{ camis: "123" }, { camis: "456" }, ...]

  // 2. Static pages
  const staticRoutes = ['', '/about', '/near-me', '/feedback'];
  const staticUrls = staticRoutes.map(
    (path) => `
      <url>
        <loc>${baseUrl}${path}</loc>
        <lastmod>${today}</lastmod>
      </url>`
  );

  // 3. Dynamic restaurant pages
  const dynamicUrls = restaurants.map(
    ({ camis }) => `
      <url>
        <loc>${baseUrl}/restaurant/${camis}</loc>
        <lastmod>${today}</lastmod>
      </url>`
  );

  // 4. Construct sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
                      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${[...staticUrls, ...dynamicUrls].join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
