export interface WikiArticle {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  description?: string;
  pageid: number;
  uniqueId: string;
}

export interface Category {
  id: string;
  name: string;
  query: string;
}