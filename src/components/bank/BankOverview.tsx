import type { HarvestData } from '@lib/queries/brands'
import { Box, Group, List, Stack, Text } from '@mantine/core'
import { CheckCircleIcon } from '@phosphor-icons/react'

interface Props {
  harvestData: HarvestData | null
}

// Customer types mapping
const CUSTOMER_TYPES: Record<string, string> = {
  corporate: 'Corporate',
  retail_and_individual: 'Retail and Individual',
  nonprofit: 'Nonprofit',
  government: 'Government',
  sme: 'Small and Medium Enterprises (SMEs)',
}

// Services mapping
const SERVICES: Record<string, string> = {
  mobile_banking: 'Mobile Banking',
  local_branches: 'Local Branches',
  ATM_network: 'ATM Network',
}

// Policies mapping
const POLICIES: Record<string, string> = {
  environmental_policy: 'Environmental Policy',
  deposit_protection: 'Deposit Protection',
}

export function BankOverview({ harvestData }: Props) {
  if (!harvestData) {
    return (
      <Text className="text-gray-500">
        Detailed bank information is not currently available for this institution.
      </Text>
    )
  }

  // Extract data
  const institutionalInfo = harvestData.institutionalInformation as
    | Record<string, unknown>
    | undefined
  const yearFounded = institutionalInfo?.year_founded as { founded?: string } | undefined
  const customersServed = harvestData.customersServed as Record<string, unknown> | undefined
  const services = harvestData.services as Record<string, unknown> | undefined
  const policies = harvestData.policies as Record<string, unknown> | undefined
  const financialFeatures = harvestData.financialFeatures as Record<string, unknown> | undefined
  const fees = financialFeatures?.fees as Record<string, unknown> | undefined

  // Get offered customer types
  const offeredCustomerTypes = customersServed
    ? Object.entries(customersServed)
        .filter(([_, value]) => (value as { offered?: boolean })?.offered)
        .map(([key]) => CUSTOMER_TYPES[key] || key)
    : []

  // Get offered services
  const offeredServices = services
    ? Object.entries(services)
        .filter(([_, value]) => (value as { offered?: boolean })?.offered)
        .map(([key]) => SERVICES[key] || key)
    : []

  // Get active policies
  const activePolicies = policies
    ? Object.entries(policies)
        .filter(([_, value]) => (value as { offered?: boolean })?.offered)
        .map(([key]) => POLICIES[key] || key)
    : []

  // Check fee availability
  const hasNoMaintenanceFee = (
    fees?.available_without_account_maintenance_fee as {
      explanation?: string
    }
  )?.explanation
  const hasNoOverdraftFee = (fees?.available_without_overdraft_fees as { explanation?: string })
    ?.explanation

  const hasAnyData =
    yearFounded?.founded ||
    activePolicies.length > 0 ||
    offeredCustomerTypes.length > 0 ||
    offeredServices.length > 0 ||
    hasNoMaintenanceFee ||
    hasNoOverdraftFee

  const listClasses = 'm-0 p-0 gap-0'
  const listItemClasses = 'mx-0 my-1 list-none p-0 text-sm flex flex-row gap-1 items-center'

  if (!hasAnyData) {
    return (
      <Text className="text-gray-500">
        Detailed bank information is not currently available for this institution.
      </Text>
    )
  }

  return (
    <Stack className="gap-8">
      {/* Founded */}
      {yearFounded?.founded && (
        <Text className="font-semibold">Founded: {yearFounded.founded}</Text>
      )}

      <Stack className="items-start gap-6">
        {/* Policies */}
        {activePolicies.length > 0 && (
          <Box>
            <Text className="font-semibold">Policies</Text>
            <Stack className={listClasses}>
              {activePolicies.map((policy) => (
                <Group className={listItemClasses} key={policy}>
                  <CheckCircleIcon size={16} className="text-textSuccess" />
                  {policy}
                </Group>
              ))}
            </Stack>
          </Box>
        )}
        {/* Customers Served */}
        {offeredCustomerTypes.length > 0 && (
          <Box>
            <Text className="mb-2 font-semibold">Customers Served</Text>
            <List className={listClasses}>
              {offeredCustomerTypes.map((type) => (
                <List.Item key={type} className={listItemClasses}>
                  {type}
                </List.Item>
              ))}
            </List>
          </Box>
        )}

        {/* Services */}
        {offeredServices.length > 0 && (
          <Box>
            <Text className="mb-2 font-semibold">Services</Text>
            <List className={listClasses}>
              {offeredServices.map((service) => (
                <List.Item className={listItemClasses} key={service}>
                  {service}
                </List.Item>
              ))}
            </List>
          </Box>
        )}

        {/* Fees */}
        {(hasNoMaintenanceFee || hasNoOverdraftFee) && (
          <Box>
            <Text className="mb-2 font-semibold">Fees</Text>
            <List className={listClasses}>
              {hasNoMaintenanceFee && (
                <List.Item className={listItemClasses}>No account maintenance fee</List.Item>
              )}
              {hasNoOverdraftFee && (
                <List.Item className={listItemClasses}>No overdraft fee</List.Item>
              )}
            </List>
          </Box>
        )}
      </Stack>
    </Stack>
  )
}
