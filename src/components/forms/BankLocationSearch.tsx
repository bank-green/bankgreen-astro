import { Stack, Title } from '@mantine/core'
import { useState, useEffect } from 'react'
import LocationSearch from './LocationSearch'
import BankSearch from './BankSearch'
import type { Bank } from '@lib/banks'

interface BankLocationSearchProps {
  title?: string
  onBankSelect?: (bank: Bank | null) => void
}

function BankLocationSearch({
  title = 'Check if your bank is funding fossil fuels',
  onBankSelect
}: BankLocationSearchProps) {
  const [country, setCountry] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null)
  const [banks, setBanks] = useState<Bank[]>([])
  const [loading, setLoading] = useState(false)

  // Load banks when country or state changes
  useEffect(() => {
    async function loadBanks() {
      if (!country) {
        setBanks([])
        return
      }

      // For US, require state
      if (country === 'US' && !state) {
        setBanks([])
        return
      }

      setLoading(true)

      try {
        // TODO: Replace with actual GraphQL query
        // For now, using placeholder
        const response = await fetch(`/api/banks?country=${country}${state ? `&state=${state}` : ''}`)
        const data = await response.json()
        setBanks(data.banks || [])
      } catch (error) {
        console.error('Error loading banks:', error)
        setBanks([])
      } finally {
        setLoading(false)
      }
    }

    loadBanks()
  }, [country, state])

  const handleBankChange = (bank: Bank | null) => {
    setSelectedBank(bank)
    onBankSelect?.(bank)
  }

  return (
    <Stack gap="md" className="w-full">
      <Title order={4} className="text-sky-800">
        {title}
      </Title>
      <LocationSearch
        value={country}
        onChange={setCountry}
        onStateChange={setState}
        autoDetect={true}
      />
      <BankSearch
        banks={banks}
        value={selectedBank}
        onChange={handleBankChange}
        loading={loading}
        disabled={!country || (country === 'US' && !state)}
        country={country}
        state={state}
      />
    </Stack>
  )
}

export default BankLocationSearch
