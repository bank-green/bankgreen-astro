import { fetchFilteredBrands } from '@lib/queries/brands'
import {
  DEFAULT_FILTER_STATE,
  type EcoBankCard,
  type EcoBankFilters as EcoBankFiltersType,
} from '@lib/types/eco-banks'
import { buildHarvestDataFilter } from '@lib/utils/eco-banks'
import { Box, Button, Drawer, Grid, Group, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { FunnelSimpleIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import EcoBankFilters from '../bank/EcoBankFilters'
import EcoBankResults from '../bank/EcoBankResults'
import LocationSearch from './LocationSearch'

function EcoBankDirectory() {
  const [country, setCountry] = useState<string>('')
  const [stateCode, setStateCode] = useState<string>('')
  const [filterState, setFilterState] = useState<EcoBankFiltersType>(DEFAULT_FILTER_STATE)
  const [banks, setBanks] = useState<EcoBankCard[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filtersOpen, { open: openFilters, close: closeFilters }] = useDisclosure(false)

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
        <Drawer opened={filtersOpen} onClose={closeFilters}>
          <EcoBankFilters country={country} onFilterChange={setFilterState} />
        </Drawer>
        <Box visibleFrom="sm" className="sticky top-0 z-10 md:top-8 md:p-0">
          <EcoBankFilters country={country} onFilterChange={setFilterState} />
        </Box>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 9 }}>
        <Stack className="gap-2">
          <Group className="-mx-4 -mt-4 sticky top-0 z-10 w-[calc(100%+2rem)] items-end justify-end gap-0 bg-sushi-100 px-4 py-4">
            <Button
              hiddenFrom="sm"
              variant="default"
              onClick={openFilters}
              leftSection={<FunnelSimpleIcon size={16} />}
            >
              Filters
            </Button>
            <LocationSearch
              value={country}
              onChange={(newCountry) => {
                setCountry(newCountry)
                setStateCode('') // Reset state when country changes
              }}
              onStateChange={setStateCode}
              className="w-full max-w-lg"
            />
          </Group>

          <EcoBankResults banks={banks} loading={loading} error={error} country={country} />
        </Stack>
      </Grid.Col>
    </Grid>
  )
}

export default EcoBankDirectory
