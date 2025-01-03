export interface FearGreedIndex {
  value: string;
  value_classification: string;
  timestamp: string;
  time_until_update: string;
}

export interface NewsSentiment {
  status: string;
  totalResults: number;
  articles: Array<{
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string;
    url: string;
    publishedAt: string;
    content: string;
  }>;
}
