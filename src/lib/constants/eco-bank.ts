/**
 * Constants for eco bank product display
 */

export type CustomerCategory =
  | 'retail_and_individual'
  | 'nonprofit'
  | 'government'
  | 'sme'
  | 'corporate'

export const CUSTOMER_CATEGORIES: Record<CustomerCategory, string> = {
  retail_and_individual: 'Personal',
  nonprofit: 'Nonprofit',
  government: 'Government',
  sme: 'SMEs',
  corporate: 'Corporate',
}

export const DEPOSIT_PRODUCTS = [
  { key: 'checkings_or_current' as const, displayName: 'Checking' },
  { key: 'savings' as const, displayName: 'Savings' },
  { key: 'ISAs' as const, displayName: 'ISAs' },
  { key: 'CDs' as const, displayName: 'CDs' },
  { key: 'wealth_management' as const, displayName: 'Wealth management' },
]

export const LOAN_PRODUCTS = [
  { key: 'corporate_lending' as const, displayName: 'Corporate lending' },
  { key: 'small_business_lending' as const, displayName: 'Small business lending' },
  { key: 'equipment_lending' as const, displayName: 'Equipment lending' },
  { key: 'credit_cards' as const, displayName: 'Credit cards' },
  { key: 'mortgages_or_loans' as const, displayName: 'Mortgages or loans' },
]
