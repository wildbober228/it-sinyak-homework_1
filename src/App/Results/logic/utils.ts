const pluralRules = new Intl.PluralRules("ru");

export function pluralize(
  count: number,
  one: string,
  few: string,
  many: string,
) {
  const rule = pluralRules.select(count);

  if (rule === "one") return one;
  if (rule === "few") return few;

  return many;
}
