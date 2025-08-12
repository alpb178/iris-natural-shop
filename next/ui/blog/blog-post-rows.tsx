"use client";
import { Article } from "@/definitions/Article";
import { truncate } from "@/lib/utils";
import { format } from "date-fns";
import FuzzySearch from "fuzzy-search";
import { Link } from "next-view-transitions";
import { useEffect, useState } from "react";

export const BlogPostRows = ({ articles }: { articles: Article[] }) => {
  const [search, setSearch] = useState("");

  const searcher = new FuzzySearch(articles, ["title"], {
    caseSensitive: false
  });

  const [results, setResults] = useState(articles);
  useEffect(() => {
    const results = searcher.search(search);
    setResults(results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="py-20 w-full">
      <div className="flex sm:flex-row flex-col justify-between items-center gap-4 mb-10">
        <p className="font-bold text-foreground text-2xl">More Posts</p>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles"
          className="bg-neutral-800 p-2 border-none rounded-md outline-none focus:outline-none focus:ring-0 min-w-full sm:min-w-96 text-neutral-200 text-sm placeholder-neutral-400"
        />
      </div>

      <div className="divide-y divide-neutral-800">
        {results.length === 0 ? (
          <p className="p-4 text-neutral-400 text-center">No results found</p>
        ) : (
          results.map((article, index) => (
            <BlogPostRow article={article} key={article.slug + index} />
          ))
        )}
      </div>
    </div>
  );
};

export const BlogPostRow = ({ article }: { article: Article }) => {
  return (
    <Link
      href={`blog/${article.slug}`}
      key={`${article.slug}`}
      className="group flex md:flex-row flex-col justify-between items-start md:items-center py-4"
    >
      <div>
        <p className="font-medium text-neutral-300 group-hover:text-foreground text-lg transition duration-200">
          {article.title}
        </p>
        <p className="mt-2 max-w-xl text-neutral-300 group-hover:text-foreground text-sm transition duration-200">
          {truncate(article.description, 80)}
        </p>

        <div className="flex items-center gap-2 my-4">
          <p className="max-w-xl text-neutral-300 group-hover:text-foreground text-sm transition duration-200">
            {format(new Date(article.publishedAt), "MMMM dd, yyyy")}
          </p>
          <div className="bg-neutral-800 rounded-full w-1 h-1"></div>
          <div className="flex flex-wrap gap-4">
            {article.categories?.map((category, idx) => (
              <p
                key={`category-${idx}`}
                className="bg-neutral-800 px-2 py-1 rounded-full font-bold text-muted text-xs capitalize"
              >
                {category.name}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* <Image
        src={blog.authorAvatar}
        alt={blog.author}
        width={40}
        height={40}
        className="mt-4 md:mt-0 rounded-full w-6 md:w-10 h-6 md:h-10 object-cover"
      /> */}
    </Link>
  );
};
