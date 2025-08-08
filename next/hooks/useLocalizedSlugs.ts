/**
 * Custom hook to create localized slugs with fallback
 * @param localizations - Array of localizations from Strapi
 * @param currentLocale - Current locale
 * @param currentSlug - Current slug
 * @returns Object with locale keys and their corresponding slugs
 */
export function useLocalizedSlugs(
  localizations: any[] | undefined,
  currentLocale: string,
  currentSlug: string
): Record<string, string> {
  if (!localizations || localizations.length === 0) {
    return { [currentLocale]: currentSlug };
  }

  return localizations.reduce(
    (acc: Record<string, string>, localization: any) => {
      acc[localization.locale] = localization.slug;
      return acc;
    },
    { [currentLocale]: currentSlug }
  );
}
