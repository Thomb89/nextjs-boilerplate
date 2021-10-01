/**
 * locale can be obtained from next/router
 */
export const formatCurrency = (currency: number, locale: string): string =>
  new Intl.NumberFormat(locale, { notation: 'compact', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(currency);
