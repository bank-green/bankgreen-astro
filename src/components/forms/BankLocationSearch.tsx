import type { Bank } from '@lib/banks'
import { Stack, Title } from '@mantine/core'
import { useEffect, useMemo, useState } from 'react'
import BankSearch from './BankSearch'
import LocationSearch from './LocationSearch'

interface BankLocationSearchProps {
  title?: string
  onBankSelect?: (bank: Bank | null) => void
}

/**
 * Some credit unions in the data are not correctly tagged by institution type,
 * so also filter out anything with the words "credit union" or any word ending
 * in "FCU", e.g. "RBFCU Online Banking"
 *  */
function isCreditUnion(bank: Bank): boolean {
  if (bank.commentary?.institutionType?.some((t) => t.name.toLowerCase() === 'credit union')) {
    return true
  }
  const name = bank.name.toLowerCase()
  return name.includes('credit union') || /fcu(\s|$)/.test(name)
}

function BankLocationSearch({
  title = 'Check whether your bank is funding fossil fuels.',
  onBankSelect,
}: BankLocationSearchProps) {
  const [country, setCountry] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null)
  const [allBanks, setAllBanks] = useState<Bank[]>([])
  const [loading, setLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  const [includeCreditUnions, setIncludeCreditUnions] = useState(false)

  // Fetch all banks (unfiltered) when country/state changes
  useEffect(() => {
    // Don't fetch on initial mount - wait for geo-detection or user interaction
    if (!isInitialized) {
      return
    }

    if (!country) {
      setAllBanks([])
      setLoading(false)
      return
    }

    async function loadBanks() {
      setLoading(true)

      try {
        const { fetchBrandsByCountry } = await import('@lib/queries/brands')
        const stateQuery = country === 'US' ? state : undefined
        const brands = await fetchBrandsByCountry(country, stateQuery)
        setAllBanks(brands)
      } catch (error) {
        console.error('Error loading banks:', error)
        setAllBanks([])
      } finally {
        setLoading(false)
      }
    }

    loadBanks()
  }, [country, state, isInitialized])

  // Apply credit union filter in-memory — no re-fetch needed
  const banks = useMemo(
    () => (includeCreditUnions ? allBanks : allBanks.filter((b) => !isCreditUnion(b))),
    [allBanks, includeCreditUnions]
  )

  const handleLocationInitialized = () => {
    setIsInitialized(true)
  }

  const handleBankChange = (bank: Bank | null) => {
    setSelectedBank(bank)
    onBankSelect?.(bank)
  }

  return (
    <Stack className="relative mx-auto w-full max-w-xl gap-2 p-2">
      <Title order={5} className="text-center font-normal md:text-left">
        {title}
      </Title>
      <LocationSearch
        value={country}
        onChange={setCountry}
        onStateChange={setState}
        onInitialized={handleLocationInitialized}
        className="w-full gap-2"
      />
      <BankSearch
        banks={banks}
        value={selectedBank}
        onChange={handleBankChange}
        loading={loading}
        country={country}
        state={state}
        className="w-full justify-start"
        includeCreditUnions={includeCreditUnions}
        onIncludeCreditUnionsChange={setIncludeCreditUnions}
      />
    </Stack>
  )
}

export default BankLocationSearch
