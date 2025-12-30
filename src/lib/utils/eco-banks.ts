// Utility functions for transforming and processing eco bank data
import type { EcoBankFilters } from '@lib/types/eco-banks'

// Type for harvest data (simplified from GraphQL response)
type HarvestData = Record<string, unknown> | null | undefined

// Type for interest rate data
export interface HarvestDataInterestRate {
  customer_type: string
  deposit_product: string
  additional_details: string
  high_rate: number | string
  low_rate: number | string
}

// Type for deposit protection data
export interface HarvestDataDepositProtection {
  offered: boolean
  additional_details: string
  urls: string[]
}

// Constants for display
const NO_DATA = '-'

// Exceptions for snake_case to display text conversion
const HARVEST_TO_FEATURE_TEXT_EXCEPTIONS: Record<string, string> = {
  checkings_or_current: 'Checking',
  sme: 'SMEs',
  retail_and_individual: 'Personal',
  nonprofit: 'Non-profit',
  ATM_network: 'ATM Network',
  ISAs: 'ISAs',
  CDs: 'CDs',
}

/**
 * Convert snake_case to human-readable display text
 */
export function snakeCaseToFeatureText(word: string): string {
  if (HARVEST_TO_FEATURE_TEXT_EXCEPTIONS[word]) {
    return HARVEST_TO_FEATURE_TEXT_EXCEPTIONS[word]
  }

  return word
    .split('_')
    .map((w) => {
      if (w === 'and' || w === 'or') return w
      return w.charAt(0).toUpperCase() + w.slice(1)
    })
    .join(' ')
}

/**
 * Convert camelCase to human-readable display text
 */
function camelCaseToFeatureText(word: string): string {
  if (HARVEST_TO_FEATURE_TEXT_EXCEPTIONS[word]) {
    return HARVEST_TO_FEATURE_TEXT_EXCEPTIONS[word]
  }

  return word.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())
}

/**
 * Extract maximum interest rate from rates array
 */
export function extractInterestRate(rates: HarvestDataInterestRate[] | undefined | null): string {
  if (!rates || rates.length === 0) return NO_DATA

  const max = rates.reduce((acc, curr) => {
    const rate = Number(curr.high_rate)
    if (Number.isNaN(rate)) return acc
    return acc ? Math.max(acc, rate) : rate
  }, 0)

  if (max === 0) return NO_DATA
  return `Up to ${max}%`
}

/**
 * Extract deposit protection status
 */
export function extractDepositProtection(
  depositProtection?: HarvestDataDepositProtection | null
): string {
  return depositProtection?.offered ? 'YES' : NO_DATA
}

/**
 * Extract features from harvest data
 * Converts harvest data structure to categorized feature lists
 */
export function extractFeatures(
  harvestData: HarvestData,
  isNoCredit: boolean
): Record<string, string[]> {
  if (!harvestData) return {}

  const featureTypes = ['services', 'customersServed', 'loanProducts', 'depositProducts'] as const

  return featureTypes.reduce(
    (acc, featureType) => {
      const featureData = harvestData[featureType] as Record<string, { offered: boolean }> | null

      if (!featureData) return acc

      const displayCategory = camelCaseToFeatureText(featureType)

      acc[displayCategory] = Object.entries(featureData)
        .filter(([key, value]) => {
          // Exclude credit cards for France and Germany
          if (isNoCredit && key === 'credit_cards') return false
          return value?.offered === true
        })
        .map(([key]) => snakeCaseToFeatureText(key))

      // Only include category if it has items
      if (acc[displayCategory].length === 0) {
        delete acc[displayCategory]
      }

      return acc
    },
    {} as Record<string, string[]>
  )
}

/**
 * Sort eco banks by priority: topPick > fossilFreeAllianceRating > name
 */
export function sortEcoBanks<
  T extends {
    commentary?: {
      topPick?: boolean | null
      fossilFreeAllianceRating?: number | null
    } | null
    name: string
  },
>(a: T | null, b: T | null): number {
  if (!a && !b) return 0
  if (!a) return 1
  if (!b) return -1

  // Sort by top pick (descending)
  const aTopPick = a.commentary?.topPick ? 1 : 0
  const bTopPick = b.commentary?.topPick ? 1 : 0
  if (aTopPick !== bTopPick) return bTopPick - aTopPick

  // Then by fossil free alliance rating (descending)
  const aRating = a.commentary?.fossilFreeAllianceRating ?? 0
  const bRating = b.commentary?.fossilFreeAllianceRating ?? 0
  if (aRating !== bRating) return bRating - aRating

  // Finally by name (alphabetical)
  return a.name.localeCompare(b.name)
}

/**
 * Build HarvestDataFilterInput from filter state
 * Only includes categories that have at least one selected option
 */
export function buildHarvestDataFilter(
  filterState: EcoBankFilters
): Record<string, string[]> | null {
  const result: Record<string, string[]> = {}

  for (const [category, options] of Object.entries(filterState)) {
    const selected = Object.entries(options)
      .filter(([_, isChecked]) => isChecked)
      .map(([key]) => key)

    if (selected.length > 0) {
      result[category] = selected
    }
  }

  return Object.keys(result).length > 0 ? result : null
}

/**
 * Check if filter state is dirty (differs from default)
 * Uses direct property comparison instead of JSON serialization for efficiency.
 */
export function isDirty(current: EcoBankFilters, defaults: EcoBankFilters): boolean {
  const currentKeys = Object.keys(current) as (keyof EcoBankFilters)[]
  const defaultKeys = Object.keys(defaults) as (keyof EcoBankFilters)[]

  // Check if key count differs
  if (currentKeys.length !== defaultKeys.length) return true

  // Check each category
  for (const category of currentKeys) {
    const currentOptions = current[category]
    const defaultOptions = defaults[category]

    if (!defaultOptions) return true

    const currentOptionKeys = Object.keys(currentOptions)
    const defaultOptionKeys = Object.keys(defaultOptions)

    if (currentOptionKeys.length !== defaultOptionKeys.length) return true

    // Check each option value
    for (const option of currentOptionKeys) {
      if (currentOptions[option] !== defaultOptions[option]) return true
    }
  }

  return false
}
