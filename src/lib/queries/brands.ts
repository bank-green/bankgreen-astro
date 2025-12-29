/**
 * GraphQL queries for brands and eco banks
 */

import type { EcoBankCard } from '@lib/types/eco-banks'
import {
  extractDepositProtection,
  extractFeatures,
  extractInterestRate,
  sortEcoBanks,
} from '@lib/utils/eco-banks'
import type { Bank } from '../banks'
import { graphqlFetch } from '../graphql'
import { getStateTag } from '../states'

export const ALL_BRANDS_QUERY = `
  query AllBanksList {
    brands {
      edges {
        node {
          name
          tag
          countries {
            code
          }
          stateLicensed {
            tag
            name
          }
          commentary {
            showOnSustainableBanksPage
          }
        }
      }
    }
  }
`

export const BRANDS_BY_COUNTRY_QUERY = `
  query BrandsByCountryQuery($country: String, $state: String) {
    brands(country: $country, stateLicensed: $state) {
      edges {
        node {
          name
          tag
          countries {
            code
          }
          stateLicensed {
            tag
            name
          }
          website
          aliases
        }
      }
    }
  }
`

export const BRAND_BY_TAG_QUERY = `
  query BrandByTagQuery($tag: String!) {
    brand(tag: $tag) {
      tag
      name
      website
      commentary {
        lastReviewed
        rating
        ratingInherited
        inheritBrandRating {
          tag
          name
        }
        fossilFreeAlliance
        topPick
        headline
        description1
        description2
        description3
        subtitle
        institutionType {
          name
        }
        institutionCredentials {
          name
          prismicApiId
        }
      }
      countries {
        code
      }
    }
  }
`

export const HARVEST_DATA_QUERY = `
  query HarvestDataQuery($tag: String!) {
    harvestData(tag: $tag) {
      customersServed
      depositProducts
      financialFeatures
      services
      institutionalInformation
      policies
      loanProducts
      interestRates
    }
  }
`

interface BrandNode {
  name: string
  tag: string
  website?: string | null
  aliases?: string | null
  countries?: Array<{ code: string }> | null
  stateLicensed?: Array<{ tag: string; name: string }> | null
}

interface BrandsResponse {
  brands: {
    edges: Array<{
      node: BrandNode
    }>
  }
}

// Interfaces for BrandByTag query
interface InstitutionType {
  name: string
}

interface InstitutionCredential {
  name: string
  prismicApiId: string
}

interface InheritBrandRating {
  tag: string
  name: string
}

interface Commentary {
  lastReviewed?: string | null
  rating?: string | null
  ratingInherited?: boolean | null
  inheritBrandRating?: InheritBrandRating | null
  fossilFreeAlliance?: boolean | null
  headline?: string | null
  description1?: string | null
  description2?: string | null
  description3?: string | null
  subtitle?: string | null
  institutionType?: InstitutionType | null
  institutionCredentials?: InstitutionCredential[] | null
}

interface BrandByTagNode {
  tag: string
  name: string
  website?: string | null
  commentary?: Commentary | null
  countries?: Array<{ code: string }> | null
}

interface BrandByTagResponse {
  brand: BrandByTagNode | null
}

export async function fetchAllBrands(): Promise<Bank[]> {
  try {
    const data = await graphqlFetch<BrandsResponse>(ALL_BRANDS_QUERY, {})

    if (!data?.brands?.edges) {
      console.warn('No brands data in response')
      return []
    }

    const brands = data.brands.edges.map((edge) => edge.node)

    return brands
  } catch (error) {
    console.error('Error fetching brands:', error)
    return []
  }
}

export async function fetchBrandsByCountry(country: string, state?: string): Promise<Bank[]> {
  try {
    const variables: { country: string; state?: string } = { country }

    // Add state filter if provided (for US state filtering)
    // Convert state code (e.g., "CA") to state tag (e.g., "US-CA")
    if (state) {
      variables.state = getStateTag(state)
    }

    const data = await graphqlFetch<BrandsResponse>(BRANDS_BY_COUNTRY_QUERY, variables)

    if (!data?.brands?.edges) {
      console.warn('No brands data in response')
      return []
    }

    const brands = data.brands.edges.map((edge) => edge.node)

    return brands
  } catch (error) {
    console.error('Error fetching brands:', error)
    return []
  }
}

export async function fetchBrandByTag(tag: string): Promise<BrandByTagNode | null> {
  try {
    const data = await graphqlFetch<BrandByTagResponse>(BRAND_BY_TAG_QUERY, { tag })

    if (!data?.brand) {
      console.warn(`No brand found for tag: ${tag}`)
      return null
    }

    return data.brand
  } catch (error) {
    console.error(`Error fetching brand by tag (${tag}):`, error)
    return null
  }
}

// Filtered Brands Query for Eco Banks
export const FILTERED_BRANDS_QUERY = `
  query FilteredBrandsQuery(
    $country: String
    $first: Int
    $recommendedOnly: Boolean
    $stateLicensed: String
    $harvestData: HarvestDataFilterInput
  ) {
    brands(
      country: $country
      first: $first
      recommendedOnly: $recommendedOnly
      stateLicensed: $stateLicensed
      harvestData: $harvestData
    ) {
      edges {
        node {
          name
          tag
          website
          commentary {
            topPick
            fossilFreeAlliance
            fossilFreeAllianceRating
            showOnSustainableBanksPage
          }
          harvestData {
            customersServed
            depositProducts
            services
            loanProducts
            financialFeatures
            policies
          }
        }
      }
    }
  }
`

// Interfaces for FilteredBrands query
interface FilteredBrandCommentary {
  topPick?: boolean | null
  fossilFreeAlliance?: boolean | null
  fossilFreeAllianceRating?: number | null
  showOnSustainableBanksPage?: boolean | null
}

interface FilteredBrandNode {
  name: string
  tag: string
  website?: string | null
  commentary?: FilteredBrandCommentary | null
  harvestData?: Record<string, unknown> | null
}

interface FilteredBrandsResponse {
  brands: {
    edges: Array<{
      node: FilteredBrandNode
    }>
  }
}

export async function fetchFilteredBrands(variables: {
  country: string
  stateLicensed?: string | null
  harvestData?: Record<string, string[]> | null
  first?: number
  recommendedOnly?: boolean
}): Promise<EcoBankCard[]> {
  try {
    // Convert state code to state tag if provided
    const stateTag = variables.stateLicensed ? getStateTag(variables.stateLicensed) : null

    const queryVariables = {
      country: variables.country,
      stateLicensed: stateTag,
      harvestData: variables.harvestData,
      first: variables.first ?? 300,
      recommendedOnly: variables.recommendedOnly ?? true,
    }

    const data = await graphqlFetch<FilteredBrandsResponse>(FILTERED_BRANDS_QUERY, queryVariables)

    if (!data?.brands?.edges) {
      console.warn('No brands data in response')
      return []
    }

    // Filter by showOnSustainableBanksPage
    const filteredBrands = data.brands.edges
      .map((edge) => edge.node)
      .filter((brand) => brand.commentary?.showOnSustainableBanksPage)

    // Sort by topPick, fossilFreeAllianceRating, name
    const sortedBrands = [...filteredBrands].sort(sortEcoBanks)

    // Determine if country excludes credit cards (France and Germany)
    const isNoCredit = variables.country === 'FR' || variables.country === 'DE'

    // Transform to EcoBankCard format
    const ecoBankCards: EcoBankCard[] = sortedBrands.map((brand) => {
      const harvestData = brand.harvestData

      // Extract nested data structures with proper typing
      const financialFeatures = harvestData?.financialFeatures as
        | Record<string, unknown>
        | undefined
      const interestRatesData = financialFeatures?.interest_rates as
        | Record<string, unknown>
        | undefined
      const rates = interestRatesData?.rates as unknown

      const policies = harvestData?.policies as Record<string, unknown> | undefined
      const depositProtection = policies?.deposit_protection as unknown

      return {
        name: brand.name,
        tag: brand.tag,
        website: brand.website || '',
        topPick: brand.commentary?.topPick || false,
        fossilFreeAlliance: brand.commentary?.fossilFreeAlliance || false,
        interestRate: extractInterestRate(rates as never),
        depositProtection: extractDepositProtection(depositProtection as never),
        features: extractFeatures(harvestData, isNoCredit),
      }
    })

    return ecoBankCards
  } catch (error) {
    console.error('Error fetching filtered brands:', error)
    return []
  }
}

// HarvestData interfaces
export interface HarvestData {
  customersServed?: Record<string, unknown> | null
  depositProducts?: Record<string, unknown> | null
  financialFeatures?: Record<string, unknown> | null
  services?: Record<string, unknown> | null
  institutionalInformation?: Record<string, unknown> | null
  policies?: Record<string, unknown> | null
  loanProducts?: Record<string, unknown> | null
  interestRates?: Record<string, unknown> | null
}

interface HarvestDataResponse {
  harvestData: HarvestData | null
}

export async function fetchHarvestData(tag: string): Promise<HarvestData | null> {
  try {
    const data = await graphqlFetch<HarvestDataResponse>(HARVEST_DATA_QUERY, { tag })

    if (!data?.harvestData) {
      console.warn(`No harvest data found for tag: ${tag}`)
      return null
    }

    return data.harvestData
  } catch (error) {
    console.error(`Error fetching harvest data for tag (${tag}):`, error)
    return null
  }
}

// Lightweight query for ThanksTopEcoBanksWidget
export const TOP_SUSTAINABLE_BANKS_QUERY = `
  query TopSustainableBanksQuery($country: String, $first: Int) {
    brands(
      country: $country
      first: $first
      recommendedOnly: true
    ) {
      edges {
        node {
          name
          tag
          website
          commentary {
            topPick
            fossilFreeAlliance
            fossilFreeAllianceRating
            showOnSustainableBanksPage
          }
        }
      }
    }
  }
`

export interface SimpleBankCard {
  name: string
  tag: string
  website: string
  topPick: boolean
  fossilFreeAlliance: boolean
}

interface TopSustainableBankCommentary {
  topPick?: boolean | null
  fossilFreeAlliance?: boolean | null
  fossilFreeAllianceRating?: number | null
  showOnSustainableBanksPage?: boolean | null
}

interface TopSustainableBankNode {
  name: string
  tag: string
  website?: string | null
  commentary?: TopSustainableBankCommentary | null
}

interface TopSustainableBanksResponse {
  brands: {
    edges: Array<{
      node: TopSustainableBankNode
    }>
  }
}

export async function fetchTopSustainableBanks(
  country: string,
  limit: number = 3
): Promise<SimpleBankCard[]> {
  try {
    const data = await graphqlFetch<TopSustainableBanksResponse>(TOP_SUSTAINABLE_BANKS_QUERY, {
      country,
      first: limit,
    })

    if (!data?.brands?.edges) {
      console.warn('No brands data in response')
      return []
    }

    // Filter by showOnSustainableBanksPage
    const filteredBanks = data.brands.edges
      .map((edge) => edge.node)
      .filter((bank) => bank.commentary?.showOnSustainableBanksPage)

    // Sort by topPick → fossilFreeAllianceRating → name
    const sortedBanks = [...filteredBanks].sort((a, b) => {
      // Top picks first
      if (a.commentary?.topPick && !b.commentary?.topPick) return -1
      if (!a.commentary?.topPick && b.commentary?.topPick) return 1

      // Then by fossilFreeAllianceRating (higher is better)
      const ratingA = a.commentary?.fossilFreeAllianceRating ?? 0
      const ratingB = b.commentary?.fossilFreeAllianceRating ?? 0
      if (ratingA !== ratingB) return ratingB - ratingA

      // Finally by name alphabetically
      return a.name.localeCompare(b.name)
    })

    // Transform to SimpleBankCard format
    const simpleBankCards: SimpleBankCard[] = sortedBanks.map((bank) => ({
      name: bank.name,
      tag: bank.tag,
      website: bank.website || '',
      topPick: bank.commentary?.topPick || false,
      fossilFreeAlliance: bank.commentary?.fossilFreeAlliance || false,
    }))

    return simpleBankCards
  } catch (error) {
    console.error('Error fetching top sustainable banks:', error)
    return []
  }
}
