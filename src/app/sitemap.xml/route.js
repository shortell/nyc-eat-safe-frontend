export const revalidate = 3600;

export async function GET() {
  const baseUrl = 'https://nyceatsafe.com';
  const today = new Date().toISOString().split('T')[0];

  let restaurants = [];
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sitemap-ids`, {
      headers: { 'User-Agent': 'SitemapGenerator/1.0 (+https://nyceatsafe.com)' },
    });

    if (!resp.ok) {
      console.error(`Sitemap fetch failed: ${resp.status} ${resp.statusText}`);
    } else {
      restaurants = await resp.json();
    }
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  const staticRoutes = ['/', '/about', '/near-me', '/feedback'];
  const staticUrls = staticRoutes.map(
    (p) => `<url><loc>${baseUrl}${p}</loc><lastmod>${today}</lastmod></url>`
  );
  const dynamicUrls = restaurants.map(
    ({ camis, last_inspection_date }) => {
      // Handle both full ISO strings and simple YYYY-MM-DD dates
      const lastMod = last_inspection_date ? last_inspection_date.split('T')[0] : today;
      return `<url><loc>${baseUrl}/restaurant/${camis}</loc><lastmod>${lastMod}</lastmod></url>`;
    }
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
