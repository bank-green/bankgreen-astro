import type { Bank } from '@lib/banks'
import { CURRENCY_TO_COUNTRIES } from '@lib/constants/switch-survey'
import { graphqlFetch } from '@lib/graphql'
import {
  BRANDS_BY_COUNTRY_QUERY,
  fetchAllBrandsWithCache,
  getCachedAllBrands,
} from '@lib/queries/brands'

interface BrandsResponse {
  brands: {
    edges: Array<{ node: Bank }>
  }
}

const countryRequests = new Map<string, Promise<Bank[]>>()

function filterByCountries(brands: Bank[], countries: string[]): Bank[] {
  const wanted = new Set(countries)
  return brands.filter((brand) => brand.countries?.some((c) => wanted.has(c.code)))
}

export function fetchBanksForCountry(country: string): Promise<Bank[]> {
  const allBrands = getCachedAllBrands()
  if (allBrands) return Promise.resolve(filterByCountries(allBrands, [country]))

  const inFlight = countryRequests.get(country)
  if (inFlight) return inFlight

  const request = graphqlFetch<BrandsResponse>(BRANDS_BY_COUNTRY_QUERY, { country })
    .then((data) =>
      (data?.brands?.edges ?? [])
        .map((edge) => edge.node)
        .filter((brand) => brand.commentary?.displayOnWebsite !== false)
    )
    .catch((error) => {
      countryRequests.delete(country)
      console.error(`Error fetching banks for country (${country}):`, error)
      return [] as Bank[]
    })

  countryRequests.set(country, request)
  return request
}

export async function fetchBanksForCurrency(currency: string): Promise<Bank[]> {
  const countries = CURRENCY_TO_COUNTRIES[currency]
  if (!countries?.length) return []

  const allBrands = getCachedAllBrands()
  if (allBrands) return filterByCountries(allBrands, countries)

  if (countries.length === 1) return fetchBanksForCountry(countries[0])

  const brands = await fetchAllBrandsWithCache()
  return filterByCountries(brands, countries)
}
