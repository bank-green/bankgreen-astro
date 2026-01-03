import { fetchFilteredBrands } from '@lib/queries/brands'
import {
  DEFAULT_FILTER_STATE,
  type EcoBankCard,
  type EcoBankFilters as EcoBankFiltersType,
} from '@lib/types/eco-banks'
import { buildHarvestDataFilter } from '@lib/utils/eco-banks'
import { Box, Button, Drawer, Grid, Stack, Switch } from '@mantine/core'
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
  const [expandAll, setExpandAll] = useState(true)
  const [cardStates, setCardStates] = useState<Map<string, boolean>>(new Map())
  const [cardsKey, setCardsKey] = useState(0)

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

  const handleCardToggle = (bankTag: string, isOpened: boolean) => {
    setCardStates((prev) => {
      const newStates = new Map(prev)
      newStates.set(bankTag, isOpened)
      return newStates
    })
  }

  const handleExpandAll = (checked: boolean) => {
    setExpandAll(checked)
    // Clear individual card states when using the switch
    setCardStates(new Map())
    // Increment key to force cards to remount and reset their userOverride state
    setCardsKey((prev) => prev + 1)
  }

  // Compute if all cards are expanded (for Switch checked state)
  // If any card has been individually collapsed, the switch should be unchecked
  const allCardsExpanded =
    banks.length > 0 &&
    banks.every((bank) => {
      // If card has an individual state, use that; otherwise use expandAll
      const cardState = cardStates.get(bank.tag)
      return cardState !== undefined ? cardState : expandAll
    })

  return (
    <Grid gutter={32}>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <Drawer opened={filtersOpen} onClose={closeFilters}>
          <EcoBankFilters onFilterChange={setFilterState} headerBgClass="bg-white" />
        </Drawer>
        <Box visibleFrom="md" className="sticky top-0 z-10 md:top-8 md:p-0">
          <EcoBankFilters onFilterChange={setFilterState} headerBgClass="bg-sushi-100" />
        </Box>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 9 }}>
        <Stack className="gap-2">
          <Stack className="-mx-4 -mt-4 sticky top-0 z-10 w-[calc(100%+2rem)] items-start justify-between gap-2 bg-sushi-100 px-4 py-3 md:flex-row md:items-center">
            <Button
              hiddenFrom="md"
              variant="default"
              size="compact-sm"
              onClick={openFilters}
              leftSection={<FunnelSimpleIcon size={14} />}
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
            <Switch
              label="Expand cards"
              className="absolute top-0 right-4 mt-4 mb-2 md:relative"
              checked={allCardsExpanded}
              onChange={(event) => handleExpandAll(event.currentTarget.checked)}
            />
          </Stack>

          <EcoBankResults
            banks={banks}
            loading={loading}
            error={error}
            country={country}
            expandAll={expandAll}
            onCardToggle={handleCardToggle}
            resetTrigger={cardsKey}
          />
        </Stack>
      </Grid.Col>
    </Grid>
  )
}

export default EcoBankDirectory
