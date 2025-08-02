import seoData from "@/lib/next-metadata";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { Image } from "@/types/types";
import { Link } from "next-view-transitions";
import { BlurImage } from "./blur-image";

export const Logo = ({ image, locale }: { image?: Image; locale?: string }) => {
  if (image) {
    return (
      <Link
        href={`/${locale || "en"}`}
        className="z-20 relative flex items-center space-x-2 mr-4 font-normal text-foreground text-sm"
      >
        <BlurImage
          src={strapiImage(image?.url)}
          alt={image.alternativeText}
          width={200}
          height={200}
          className="mr-2 rounded-xl w-10 h-10"
        />

        <span className="font-bold text-foreground text-lg">
          {seoData.openGraph.site_name}
        </span>
      </Link>
    );
  }

  return;
};
