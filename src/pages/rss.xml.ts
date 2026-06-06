import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '@config/site';
import { CATEGORY_LABELS, type CategoryId } from '@lib/blog-categories';

export async function GET(context: { site: URL | undefined }) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, 20);

  return rss({
    title: `${SITE.name} - Blog`,
    description: 'Consejos de barbería, tendencias y guías honestas para hombres en Buenos Aires.',
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id.replace(/\.(md|mdx)$/, '')}`,
      categories: [CATEGORY_LABELS[post.data.category as CategoryId] ?? post.data.category],
      author: post.data.author,
    })),
    customData: `<language>es-AR</language>`,
    stylesheet: false,
  });
}
