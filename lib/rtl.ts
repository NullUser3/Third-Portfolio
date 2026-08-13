export const RTL_LOCALES = ["ar"] as const;

export function isRtlLocale(locale: string) {
  return (RTL_LOCALES as readonly string[]).includes(locale);
}