export const formatPrice = ({
  price = 0,
  locale = "de-DE",
  currency = "EUR",
  decimals = 2,
  split = false
}) => {
  const pr = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: decimals
  }).format(price);

  if (split) {
    const prSplited = pr.split(/ |,/g);
    const [integral, ...rest] = prSplited;
    return { integral, decimals: rest };
  }

  return pr;
};
