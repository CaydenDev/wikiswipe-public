import { WikiArticle } from './types';

const API_BASE = 'https://en.wikipedia.org/w/api.php';

export async function fetchRandomArticles(category: string, limit: number = 10): Promise<WikiArticle[]> {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    generator: 'search',
    gsrsearch: category,
    gsrlimit: limit.toString(),
    prop: 'extracts|pageimages|description',
    exintro: '1',
    explaintext: '1',
    exlimit: limit.toString(),
    piprop: 'thumbnail',
    pithumbsize: '800',
    pilimit: limit.toString(),
    origin: '*',
    gsroffset: Math.floor(Math.random() * 500).toString(), // Add random offset to get different articles
  });

  const response = await fetch(`${API_BASE}?${params.toString()}`);
  const data = await response.json();

  if (!data.query?.pages) {
    return [];
  }

  return Object.values(data.query.pages).map((page: any) => ({
    title: page.title,
    extract: page.extract,
    thumbnail: page.thumbnail,
    description: page.description,
    pageid: page.pageid,
    uniqueId: `${page.pageid}-${Date.now()}`,
  }));
}
