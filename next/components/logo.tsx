import { Image } from "@/definitions/Image";
import seoData from "@/lib/next-metadata";
import { Link } from "next-view-transitions";

export const Logo = ({ image, locale }: { image?: Image; locale?: string }) => {
  if (image) {
    return (
      <Link
        href={`/${locale || "es"}`}
        className="z-20 relative flex items-center space-x-2 mr-4 min-w-max font-normal text-foreground text-sm"
      >
        {/* <BlurImage
          src={strapiImage(image?.url)}
          alt={image.alternativeText}
          width={200}
          height={200}
          className="mr-2 rounded-xl w-10 h-10"
        /> */}

        <span className="font-bold text-foreground text-2xl">
          {seoData.openGraph.site_name}
        </span>
      </Link>
    );
  }

  return;
};
