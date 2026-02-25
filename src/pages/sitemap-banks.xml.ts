import { graphqlFetch } from "@lib/graphql";
import type { APIRoute } from "astro";

export const prerender = false;

const ALL_BRAND_TAGS_QUERY = `
  query AllBrandTagsForSitemap {
    brands(first: 5000) {
      edges {
        node {
          tag
        }
      }
    }
  }
`;

interface BrandTagsResponse {
  brands: {
    edges: Array<{ node: { tag: string } }>;
  };
}

export const GET: APIRoute = async () => {
  let tags: string[] = [];

  try {
    const data = await graphqlFetch<BrandTagsResponse>(ALL_BRAND_TAGS_QUERY, {});
    tags = data?.brands?.edges?.map((e) => e.node.tag) ?? [];
  } catch (err) {
    console.error("sitemap-banks: failed to fetch brand tags", err);
  }

  const lastmod = new Date().toISOString().split("T")[0];

  const urls = tags
    .map(
      (tag) => `  <url>
    <loc>https://bank.green/banks/${tag}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
