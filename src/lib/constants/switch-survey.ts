export const CURRENCIES = [
  { value: 'GBP', label: '£ GBP' },
  { value: 'USD', label: '$ USD' },
  { value: 'EUR', label: '€ EUR' },
  { value: 'CAD', label: 'CA$ CAD' },
  { value: 'AUD', label: 'A$ AUD' },
]

export const COUNTRY_TO_CURRENCY: Record<string, string> = {
  GB: 'GBP',
  US: 'USD',
  CA: 'CAD',
  AU: 'AUD',
  DE: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  ES: 'EUR',
  NL: 'EUR',
  BE: 'EUR',
  AT: 'EUR',
  PT: 'EUR',
  FI: 'EUR',
  IE: 'EUR',
  GR: 'EUR',
}

export const CURRENCY_TO_COUNTRIES: Record<string, string[]> = Object.entries(
  COUNTRY_TO_CURRENCY
).reduce<Record<string, string[]>>((acc, [country, currency]) => {
  const countries = acc[currency] ?? []
  countries.push(country)
  acc[currency] = countries
  return acc
}, {})
