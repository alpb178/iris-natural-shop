import { BlurImage } from "@/components/blur-image";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { truncate } from "@/lib/utils";
import { Article } from "@/types/types";
import { format } from "date-fns";
import { Link } from "next-view-transitions";
import Balancer from "react-wrap-balancer";

export const BlogCard = ({
  article,
  locale,
}: {
  article: Article;
  locale: string;
}) => {
  return (
    <Link
      className="group grid grid-cols-1 md:grid-cols-2 hover:bg-neutral-900 shadow-derek border hover:border-neutral-800 border-transparent rounded-3xl w-full overflow-hidden hover:scale-[1.02] transition duration-200"
      href={`/${locale}/blog/${article.slug}`}
    >
      <div className="">
        {article.image ? (
          <BlurImage
            src={strapiImage(article.image.url)}
            alt={article.title}
            height="1200"
            width="1200"
            className="rounded-3xl w-full h-full object-cover object-top"
          />
        ) : (
          <div className="flex justify-center items-center group-hover:bg-neutral-900 h-full">
            {/* <Logo /> */}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between group-hover:bg-neutral-900 p-4 md:p-8">
        <div>
          <div className="flex flex-wrap gap-4 mb-4">
            {article.categories?.map((category, idx) => (
              <p
                key={`category-${idx}`}
                className="bg-neutral-800 px-4 py-2 rounded-full font-bold text-muted text-xs capitalize"
              >
                {category.name}
              </p>
            ))}
          </div>
          <p className="mb-4 font-bold text-lg md:text-4xl">
            <Balancer>{article.title}</Balancer>
          </p>
          <p className="mt-2 text-muted text-base md:text-xl text-left">
            {truncate(article.description, 500)}
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-6">
          {/* <Image
            src={article.authorAvatar}
            alt={article.author}
            width={20}
            height={20}
            className="rounded-full w-5 h-5"
          /> */}
          {/* <p className="font-normal text-muted text-sm">{article.author}</p> */}
          <div className="bg-neutral-300 rounded-full w-1 h-1"></div>
          <p className="max-w-xl text-neutral-300 group-hover:text-white text-sm transition duration-200">
            {format(new Date(article.publishedAt), "MMMM dd, yyyy")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export const BlogCardVertical = ({
  article,
  locale,
}: {
  article: Article;
  locale: string;
}) => {
  return (
    <Link
      className="group hover:bg-neutral-900 shadow-derek border hover:border-neutral-800 border-transparent rounded-3xl w-full overflow-hidden hover:scale-[1.02] transition duration-200"
      href={`/${locale}/blog/${article.slug}`}
    >
      <div className="">
        {article.image ? (
          <BlurImage
            src={strapiImage(article.image.url || "")}
            alt={article.title}
            height="800"
            width="800"
            className="rounded-3xl w-full h-64 md:h-96 object-cover object-top"
          />
        ) : (
          <div className="flex justify-center items-center group-hover:bg-neutral-900 h-64 md:h-96">
            {/* <Logo /> */}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between group-hover:bg-neutral-900 p-4 md:p-8">
        <div>
          <div className="flex flex-wrap gap-4 mb-4">
            {article.categories?.map((category, idx) => (
              <p
                key={`category-${idx}`}
                className="bg-neutral-800 px-4 py-2 rounded-full font-bold text-muted text-xs capitalize"
              >
                {category.name}
              </p>
            ))}
          </div>
          <p className="mb-4 font-bold text-lg md:text-xl">
            <Balancer>{article.title}</Balancer>
          </p>
          <p className="mt-2 text-muted text-sm md:text-base text-left">
            {truncate(article.description, 500)}
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-6">
          {/* <Image
            src={article.authorAvatar}
            alt={article.author}
            width={20}
            height={20}
            className="rounded-full w-5 h-5"
          />
          <p className="font-normal text-muted text-sm">{article.author}</p> */}
          <div className="bg-neutral-300 rounded-full w-1 h-1"></div>
          <p className="max-w-xl text-neutral-300 group-hover:text-white text-sm transition duration-200">
            {format(new Date(article.publishedAt), "MMMM dd, yyyy")}
          </p>
        </div>
      </div>
    </Link>
  );
};
