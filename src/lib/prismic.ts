/**
 * Prismic Client Setup
 *
 * Install the Prismic packages:
 *   pnpm add @prismicio/client @prismicio/richtext
 *
 * Then uncomment the code below and configure your repository.
 */

// import * as prismic from "@prismicio/client";

// const repositoryName = "your-repo-name";

// export const prismicClient = prismic.createClient(repositoryName, {
//   // If you have a private API, add your access token here
//   // accessToken: import.meta.env.PRISMIC_ACCESS_TOKEN,
// });

/**
 * Example usage in an Astro page:
 *
 * ---
 * import { prismicClient } from "../lib/prismic";
 *
 * const homepage = await prismicClient.getSingle("homepage");
 * const posts = await prismicClient.getAllByType("blog_post");
 * ---
 *
 * <h1>{homepage.data.title}</h1>
 * {posts.map((post) => <article>{post.data.title}</article>)}
 */

export {};
