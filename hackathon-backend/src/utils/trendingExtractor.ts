import * as cheerio from 'cheerio';

interface TrendingResult {
  titles: string[];
  summary: string | null;
}

/**
 * Parse HTML to find likely trending titles and create a tiny summary.
 * Strategy:
 *  - Look for common selectors used by major news sites for headlines
 *  - Collect unique headline texts (limit to 6)
 *  - Create a short joined summary sentence
 */
export default function parseHtmlForTrending(html: string, sourceName: string): TrendingResult {
  const $ = cheerio.load(html || '');
  const selectors = [
    'h3', 'h2', '.gs-c-promo-heading__title', '.headline', '.title', '.article__title', '.TopStories__headline'
  ];

  const found = new Set<string>();

  for (const sel of selectors) {
    $(sel).each((_: any, el: any) => {
      const text = $(el).text().trim();
      if (text && text.length > 20 && found.size < 12) {
        found.add(text.replace(/\s+/g, ' '));
      }
    });
    if (found.size >= 6) break;
  }

  const titles = Array.from(found).slice(0, 6);
  let summary: string | null = null;

  if (titles.length > 0) {
    // naive summary: join first 3 headlines into one descriptive sentence
    const sample = titles.slice(0, 3).map(t => t.replace(/\.$/, ''));
    summary = `${sourceName} trending: ${sample.join('; ')}.`;
  }

  return { titles, summary };
}
