"use client";
import { BlogCardVertical } from "../../ui/blog/blog-card";

export const RelatedArticles = ({
  heading,
  sub_heading,
  articles,
  locale,
}: {
  heading: string;
  sub_heading: string;
  articles: any[];
  locale: string;
}) => {
  return (
    <div className="mt-12 pb-20">
      <h2 className="mb-10 font-bold text-neutral-200 text-2xl">{heading}</h2>
      <div className="gap-10 grid grid-cols-1 md:grid-cols-3">
        {articles.map((article) => (
          <BlogCardVertical
            key={article.title}
            article={article}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
};
