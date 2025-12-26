import type { EcoBankCard as EcoBankCardType } from '@lib/types/eco-banks'
import { Alert, Loader, Stack, Text } from '@mantine/core'
import EcoBankCard from './EcoBankCard'

interface BankResultsProps {
  banks: EcoBankCardType[]
  loading: boolean
  error: string | null
  country: string
}

function BankResults({ banks, loading, error, country }: BankResultsProps) {
  // Loading state
  if (loading) {
    return (
      <Stack className="items-center justify-center py-12">
        <Loader size="lg" />
        <Text c="dimmed">Loading banks...</Text>
      </Stack>
    )
  }

  // Error state
  if (error) {
    return (
      <Alert title="Error" color="red">
        {error}
      </Alert>
    )
  }

  // No country selected
  if (!country) {
    return (
      <Alert title="No country selected" color="blue">
        Please select a country to view sustainable banks.
      </Alert>
    )
  }

  // No results found
  if (banks.length === 0) {
    return (
      <Alert title="No results found" color="yellow">
        No banks match your current filters. Try adjusting your criteria.
      </Alert>
    )
  }

  // Results
  return (
    <Stack className="gap-6">
      {banks.map((bank) => (
        <EcoBankCard key={bank.tag} bank={bank} />
      ))}
    </Stack>
  )
}

export default BankResults
