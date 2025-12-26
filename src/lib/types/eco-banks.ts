// Type definitions and constants for Eco Banks filtering system

// Core filter state structure
export interface EcoBankFilters {
  customersServed: {
    retail_and_individual: boolean
    nonprofit: boolean
    sme: boolean
    government: boolean
  }
  depositProducts: {
    checkings_or_current: boolean
    savings: boolean
    ISAs: boolean
    CDs: boolean
    wealth_management: boolean
  }
  loanProducts: {
    small_business_lending: boolean
    corporate_lending: boolean
    mortgages_or_loans: boolean
    credit_cards: boolean
  }
  services: {
    local_branches: boolean
    deposition_protection: boolean
    mobile_banking: boolean
    ATM_network: boolean
  }
}

// Default empty filter state
export const DEFAULT_FILTER_STATE: EcoBankFilters = {
  customersServed: {
    retail_and_individual: false,
    nonprofit: false,
    sme: false,
    government: false,
  },
  depositProducts: {
    checkings_or_current: false,
    savings: false,
    ISAs: false,
    CDs: false,
    wealth_management: false,
  },
  loanProducts: {
    small_business_lending: false,
    corporate_lending: false,
    mortgages_or_loans: false,
    credit_cards: false,
  },
  services: {
    local_branches: false,
    deposition_protection: false,
    mobile_banking: false,
    ATM_network: false,
  },
}

// Filter display name mapping (snake_case to human-readable)
export const FILTER_DISPLAY_NAMES: Record<string, string> = {
  retail_and_individual: 'Personal',
  nonprofit: 'Non-profit',
  sme: 'SMEs',
  government: 'Government',
  checkings_or_current: 'Checking',
  savings: 'Savings',
  ISAs: 'ISAs',
  CDs: 'CDs',
  wealth_management: 'Wealth Management',
  small_business_lending: 'Small Business Lending',
  corporate_lending: 'Corporate Lending',
  mortgages_or_loans: 'Mortgages or Loans',
  credit_cards: 'Credit Cards',
  local_branches: 'Local Branches',
  deposition_protection: 'Deposit Protection',
  mobile_banking: 'Mobile Banking',
  ATM_network: 'ATM Network',
}

// Transformed bank card data for display
export interface EcoBankCard {
  name: string
  tag: string
  website: string
  topPick: boolean
  fossilFreeAlliance: boolean
  interestRate: string
  depositProtection: string
  features: Record<string, string[]>
}

// Filter category keys
export type FilterCategory = keyof EcoBankFilters

// Filter section configuration
export interface FilterSection {
  key: FilterCategory
  title: string
  options: string[]
}

export const FILTER_SECTIONS: FilterSection[] = [
  {
    key: 'customersServed',
    title: 'Customers Served',
    options: ['retail_and_individual', 'nonprofit', 'sme', 'government'],
  },
  {
    key: 'depositProducts',
    title: 'Deposit Products',
    options: ['checkings_or_current', 'savings', 'ISAs', 'CDs', 'wealth_management'],
  },
  {
    key: 'loanProducts',
    title: 'Loan Products',
    options: ['small_business_lending', 'corporate_lending', 'mortgages_or_loans', 'credit_cards'],
  },
  {
    key: 'services',
    title: 'Services',
    options: ['local_branches', 'deposition_protection', 'mobile_banking', 'ATM_network'],
  },
]
