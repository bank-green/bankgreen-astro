import { fetchFilteredBrands } from '@lib/queries/brands'
import {
  DEFAULT_FILTER_STATE,
  type EcoBankCard,
  type EcoBankFilters as EcoBankFiltersType,
} from '@lib/types/eco-banks'
import { buildHarvestDataFilter } from '@lib/utils/eco-banks'
import { Grid, Stack } from '@mantine/core'
import { useEffect, useState } from 'react'
import BankResults from '../bank/BankResults'
import EcoBankFilters from '../bank/EcoBankFilters'
import LocationSearch from './LocationSearch'

function BankDirectory() {
  const [country, setCountry] = useState<string>('')
  const [stateCode, setStateCode] = useState<string>('')
  const [filterState, setFilterState] = useState<EcoBankFiltersType>(DEFAULT_FILTER_STATE)
  const [banks, setBanks] = useState<EcoBankCard[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch banks when country, state, or filters change
  useEffect(() => {
    if (!country) {
      setBanks([])
      return
    }

    const fetchBanks = async () => {
      setLoading(true)
      setError(null)

      try {
        const harvestDataFilter = buildHarvestDataFilter(filterState)
        const results = await fetchFilteredBrands({
          country,
          stateLicensed: stateCode || null,
          harvestData: harvestDataFilter,
          first: 300,
          recommendedOnly: true,
        })
        setBanks(results)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setBanks([])
      } finally {
        setLoading(false)
      }
    }

    fetchBanks()
  }, [country, stateCode, filterState])

  return (
    <Grid gutter="xl">
      <Grid.Col span={{ base: 12, md: 3 }}>
        <EcoBankFilters country={country} onFilterChange={setFilterState} />
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 9 }}>
        <Stack className="gap-8">
          <LocationSearch
            value={country}
            onChange={(newCountry) => {
              setCountry(newCountry)
              setStateCode('') // Reset state when country changes
            }}
            onStateChange={setStateCode}
          />

          <BankResults banks={banks} loading={loading} error={error} country={country} />
        </Stack>
      </Grid.Col>
    </Grid>
  )
}

export default BankDirectory
