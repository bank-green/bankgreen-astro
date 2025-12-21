/**
 * From Nuxt:
 * 
 * query BrandsByCountryQuery($country: String, $state: String) {
  brands(country: $country, stateLicensed: $state) {
    edges {
      node {
        name
        tag
        website
        aliases
      }
    }
  }
}

query BrandsQuery(
  $country: String
  $recommendedOnly: Boolean
  $rating: [String]
  $first: Int
) {
  brands(
    country: $country
    recommendedOnly: $recommendedOnly
    rating: $rating
    first: $first
    displayOnWebsite: true
  ) {
    edges {
      node {
        name
        tag
        website
      }
    }
  }
}

query FilteredBrandsQuery(
  $country: String
  $first: Int
  $topPick: Boolean
  $recommendedOnly: Boolean
  $fossilFreeAlliance: Boolean
  $withCommentary: Boolean = false
  $stateLicensed: String
  $harvestData: HarvestDataFilterInput
) {
  brands(
    country: $country
    first: $first
    topPick: $topPick
    recommendedOnly: $recommendedOnly
    fossilFreeAlliance: $fossilFreeAlliance
    stateLicensed: $stateLicensed
    harvestData: $harvestData
  ) {
    edges {
      node {
        name
        tag
        website
        aliases
        commentary @include(if: $withCommentary) {
          ...commentaryFields
        }
        harvestData {
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
    }
  }
}

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

query EmbraceBrandQuery {
  brandsFilteredByEmbraceCampaign(id: 1) {
    name
    website
    tag
  }
}

query AllBanksList {
  brands {
    edges {
      node {
        name
        tag
        commentary {
          showOnSustainableBanksPage
        }
      }
    }
  }
}

fragment commentaryFields on Commentary {
  rating
  ratingInherited
  inheritBrandRating {
    tag
    name
  }
  description3
  lastReviewed
  amountFinancedSince2016
  topPick
  fossilFreeAlliance
  fossilFreeAllianceRating
  showOnSustainableBanksPage
  institutionType {
    name
  }
  institutionCredentials {
    name
    prismicApiId
  }
}

fragment bankFeaturesFields on BrandFeature {
  offered
  feature {
    name
  }
  details
}

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

 * 
 * 
 * 
 */

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
