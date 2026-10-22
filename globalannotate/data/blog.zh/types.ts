// Translated fields of a blog post. Slug, date, author, read time, hero image
// ID, and the English `tags` (used for service routing) come from the
// English record in data/blog.ts; `tags` here are the Chinese display tags.
export type BlogPostZh = {
  title: string;
  // Optional shorter <title> (keyword first, under 30 characters).
  metaTitle?: string;
  description: string;
  tags: string[];
  body: string;
  faq?: { q: string; a: string }[];
  readMinutes?: number;
};
