import type { Bank } from '@lib/banks'
import { Stack, Title } from '@mantine/core'
import { useEffect, useState } from 'react'
import BankSearch from './BankSearch'
import LocationSearch from './LocationSearch'

interface BankLocationSearchProps {
  title?: string
  onBankSelect?: (bank: Bank | null) => void
}

function BankLocationSearch({
  title = 'Check whether your bank is funding fossil fuels.',
  onBankSelect,
}: BankLocationSearchProps) {
  const [country, setCountry] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null)
  const [banks, setBanks] = useState<Bank[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadBanks() {
      if (!country) {
        setBanks([])
        return
      }

      setLoading(true)

      try {
        const { fetchBrandsByCountry } = await import('@lib/queries/brands')
        const stateQuery = country === 'US' ? state : undefined
        const brands = await fetchBrandsByCountry(country, stateQuery)
        setBanks(brands)
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
    <Stack className="relative w-full gap-2 p-2">
      <Title order={3} className="text-center font-normal text-sky-800 md:text-left">
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
        disabled={!country}
        country={country}
        state={state}
      />
    </Stack>
  )
}

export default BankLocationSearch
