import { Image } from "@/definitions/Image";
import { DEFAULT_LOCALE } from "@/i18n/routing";
import seoData from "@/lib/next-metadata";
import { Link } from "next-view-transitions";

import { strapiImage } from "@/lib/strapi/strapiImage";
import { BlurImage } from "./blur-image";

export const Logo = ({ image, locale }: { image?: Image; locale?: string }) => {
  if (image) {
    return (
      <Link
        href={`/${locale || DEFAULT_LOCALE}`}
        className="z-20 relative flex items-center space-x-2 mr-4 min-w-max font-normal text-foreground text-sm"
      >
        <BlurImage
          src={strapiImage(image?.url)}
          alt={image.alternativeText}
          width={200}
          height={200}
          className="mr-2 rounded-xl w-10 h-10"
        />

        <span className="font-bold text-foreground text-xl">
          {seoData.openGraph.site_name}
        </span>
      </Link>
    );
  }

  return;
};

export const LogoNavbar = ({
  image,
  locale
}: {
  image?: Image;
  locale?: string;
}) => {
  if (image) {
    return (
      <Link
        href={`/${locale || DEFAULT_LOCALE}`}
        className="z-20 relative flex items-center space-x-2 mr-4 min-w-max font-normal text-foreground text-sm"
      >
        <BlurImage
          src={strapiImage(image?.url)}
          alt={image.alternativeText}
          width={200}
          height={200}
          className="mr-2 rounded-xl w-10 h-10"
        />
      </Link>
    );
  }

  return;
};
