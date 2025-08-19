import { Container } from "@/components/container";
import { Article } from "@/definitions/Article";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { IconArrowLeft } from "@tabler/icons-react";
import dayjs from "dayjs";
import { Link } from "next-view-transitions";
import Image from "next/image";
import DynamicZoneManager from "../../components/dynamic-zone/manager";

export async function BlogLayout({
  article,
  locale,
  children
}: {
  article: Article;
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <Container className="mt-16 lg:mt-32">
      <div className="flex justify-between items-center px-2 py-8">
        <Link href="/blog" className="flex items-center space-x-2">
          <IconArrowLeft className="w-4 h-4 text-muted" />
          <span className="text-muted text-sm">Back</span>
        </Link>
      </div>
      <div className="mx-auto w-full">
        {article.image ? (
          <Image
            src={strapiImage(article.image.url)}
            height="800"
            width="800"
            className="rounded-3xl w-full h-40 md:h-96 object-cover aspect-square [mask-image:radial-gradient(circle,white,transparent)]"
            alt={article.title}
          />
        ) : (
          <div className="flex justify-center items-center bg-neutral-900 shadow-derek rounded-3xl w-full h-40 md:h-96 aspect-squace">
            {/* <Logo /> */}
          </div>
        )}
      </div>
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <article className="pt-8 pb-8">
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
            <header className="flex flex-col">
              <h1 className="mt-8 font-bold text-neutral-200 text-4xl sm:text-5xl tracking-tight">
                {article.title}
              </h1>
            </header>
            <div className="prose-invert mt-8 prose prose-sm">{children}</div>
            <div className="flex items-center space-x-2 mt-12 pt-12 border-neutral-800 border-t">
              <div className="flex items-center space-x-2">
                {/* <Image
                  src={article.authorAvatar}
                  alt={article.author}
                  width={20}
                  height={20}
                  className="rounded-full w-5 h-5"
                />
                <p className="font-normal text-muted text-sm">
                  {article.author}
                </p> */}
              </div>
              <div className="bg-neutral-700 rounded-lg w-0.5 h-5" />
              <time
                dateTime={article.publishedAt}
                className="flex items-center text-base"
              >
                <span className="text-muted text-sm">
                  {dayjs(article.publishedAt).format("MMMM DD, YYYY")}
                </span>
              </time>
            </div>
          </article>
        </div>
      </div>
      {article?.dynamic_zone && (
        <DynamicZoneManager
          dynamicZone={article?.dynamic_zone}
          locale={locale}
        />
      )}
    </Container>
  );
}
