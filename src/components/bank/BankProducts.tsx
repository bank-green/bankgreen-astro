import {
  CUSTOMER_CATEGORIES,
  type CustomerCategory,
  DEPOSIT_PRODUCTS,
  LOAN_PRODUCTS,
} from '@lib/constants/eco-bank'
import type { HarvestData } from '@lib/queries/brands'
import { Stack, Table, Tabs, Text } from '@mantine/core'
import { useState } from 'react'

interface Props {
  harvestData: HarvestData | null
}

type DepositProduct = {
  key: string
  displayName: string
  interestRates?: {
    low_rate?: number
    high_rate?: number
  }
  fees: {
    available_without_overdraft_fees?: { available?: boolean }
    available_without_account_maintenance_fee?: { available?: boolean }
  }
}

export function BankProducts({ harvestData }: Props) {
  const [activeTab, setActiveTab] = useState<string>('retail_and_individual')

  if (!harvestData) {
    return null
  }

  const depositProducts = harvestData.depositProducts as Record<string, unknown> | undefined
  const loanProducts = harvestData.loanProducts as Record<string, unknown> | undefined
  const financialFeatures = harvestData.financialFeatures as Record<string, unknown> | undefined

  const getProductsForCategory = (category: CustomerCategory) => {
    // Get deposit products for this category
    const availableDepositProducts = DEPOSIT_PRODUCTS.filter((product) => {
      const productData = depositProducts?.[product.key] as
        | { offered_to?: { customer_type?: string[] } }
        | undefined
      return productData?.offered_to?.customer_type?.includes(category)
    }).map((product) => {
      // Find interest rates for this product + category
      const interestRatesData = (financialFeatures?.interest_rates as { rates?: unknown[] })
        ?.rates as
        | Array<{
            deposit_product?: string
            customer_type?: string
            low_rate?: number
            high_rate?: number
          }>
        | undefined

      const interestRates = interestRatesData?.find(
        (rate) => rate?.deposit_product === product.key && rate?.customer_type === category
      )

      // Find fees for this product + category
      const feesData = financialFeatures?.fees as Record<string, unknown> | undefined
      const overdraftFeesData = feesData?.available_without_overdraft_fees as
        | { offered_to?: unknown[] }
        | undefined
      const maintenanceFeesData = feesData?.available_without_account_maintenance_fee as
        | { offered_to?: unknown[] }
        | undefined

      const overdraftFee = (
        overdraftFeesData?.offered_to as
          | Array<{ deposit_product?: string; customer_type?: string; available?: boolean }>
          | undefined
      )?.find((fee) => fee?.deposit_product === product.key && fee?.customer_type === category)

      const maintenanceFee = (
        maintenanceFeesData?.offered_to as
          | Array<{ deposit_product?: string; customer_type?: string; available?: boolean }>
          | undefined
      )?.find((fee) => fee?.deposit_product === product.key && fee?.customer_type === category)

      return {
        ...product,
        interestRates,
        fees: {
          available_without_overdraft_fees: overdraftFee,
          available_without_account_maintenance_fee: maintenanceFee,
        },
      }
    })

    // Get loan products for this category
    const availableLoanProducts = LOAN_PRODUCTS.filter((product) => {
      const productData = loanProducts?.[product.key] as { offered_to?: string[] } | undefined
      return productData?.offered_to?.includes(category)
    })

    return { availableDepositProducts, availableLoanProducts }
  }

  const getFeeLabel = (product: DepositProduct): string => {
    const overdraft = product.fees.available_without_overdraft_fees?.available
    const maintenance = product.fees.available_without_account_maintenance_fee?.available

    if (overdraft && maintenance) return 'No maintenance or overdraft fees'
    if (overdraft) return 'No overdraft fees'
    if (maintenance) return 'No maintenance fees'
    return '-'
  }

  const renderTabContent = (category: CustomerCategory) => {
    const { availableDepositProducts, availableLoanProducts } = getProductsForCategory(category)
    const categoryName = CUSTOMER_CATEGORIES[category]

    if (availableDepositProducts.length === 0 && availableLoanProducts.length === 0) {
      return (
        <Text className="font-semibold">
          This bank does not offer any {categoryName} accounts or loans.
        </Text>
      )
    }

    return (
      <Stack className="gap-12">
        {/* Deposit Products (Accounts) */}
        {availableDepositProducts.length === 0 ? (
          <Text className="font-semibold">
            This bank does not offer any {categoryName} accounts.
          </Text>
        ) : (
          <Table
            classNames={{
              th: 'w-1/3',
              td: 'text-sm',
            }}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Accounts</Table.Th>
                <Table.Th className="hidden md:table-cell">Interest rates</Table.Th>
                <Table.Th className="hidden md:table-cell">Fees</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {availableDepositProducts.map((product) => (
                <Table.Tr key={product.key}>
                  <Table.Td>{product.displayName}</Table.Td>
                  <Table.Td className="hidden md:table-cell">
                    {product.interestRates?.high_rate
                      ? `${product.interestRates.low_rate}% - ${product.interestRates.high_rate}%`
                      : '-'}
                  </Table.Td>
                  <Table.Td className="hidden md:table-cell">{getFeeLabel(product)}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}

        {/* Loan Products */}
        {availableLoanProducts.length === 0 ? (
          <Text className="font-semibold">This bank does not offer any {categoryName} loans.</Text>
        ) : (
          <Table
            classNames={{
              th: 'w-1/3',
              td: 'text-sm',
            }}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Loans</Table.Th>
                <Table.Th>Interest rates</Table.Th>
                <Table.Th>Fees</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {availableLoanProducts.map((product) => (
                <Table.Tr key={product.key}>
                  <Table.Td>{product.displayName}</Table.Td>
                  <Table.Td className="hidden md:table-cell">Rates may vary</Table.Td>
                  <Table.Td className="hidden md:table-cell">Fees may vary</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Stack>
    )
  }

  return (
    <Tabs
      value={activeTab}
      onChange={(value) => setActiveTab(value || 'retail_and_individual')}
      classNames={{
        root: 'h-full overflow-hidden rounded-xl',
        panel: 'h-full items-start p-6 px-8',
      }}
    >
      <Tabs.List>
        <Tabs.Tab value="retail_and_individual">Personal</Tabs.Tab>
        <Tabs.Tab value="nonprofit">Nonprofit</Tabs.Tab>
        <Tabs.Tab value="government">Government</Tabs.Tab>
        <Tabs.Tab value="sme">SMEs</Tabs.Tab>
        <Tabs.Tab value="corporate">Corporate</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="retail_and_individual">
        {renderTabContent('retail_and_individual')}
      </Tabs.Panel>
      <Tabs.Panel value="nonprofit">{renderTabContent('nonprofit')}</Tabs.Panel>
      <Tabs.Panel value="government">{renderTabContent('government')}</Tabs.Panel>
      <Tabs.Panel value="sme">{renderTabContent('sme')}</Tabs.Panel>
      <Tabs.Panel value="corporate">{renderTabContent('corporate')}</Tabs.Panel>
    </Tabs>
  )
}
