import {
  DEFAULT_FILTER_STATE,
  type EcoBankFilters as EcoBankFiltersType,
  FILTER_DISPLAY_NAMES,
  FILTER_SECTIONS,
  type FilterCategory,
} from '@lib/types/eco-banks'
import { isDirty } from '@lib/utils/eco-banks'
import { Accordion, Button, Checkbox, Group, Stack, Switch, Text } from '@mantine/core'
import { useEffect, useMemo, useState } from 'react'

interface EcoBankFiltersProps {
  country: string
  onFilterChange: (filters: EcoBankFiltersType) => void
}

function EcoBankFilters({ onFilterChange }: EcoBankFiltersProps) {
  const [filterState, setFilterState] = useState<EcoBankFiltersType>(DEFAULT_FILTER_STATE)
  const [accordionValue, setAccordionValue] = useState<string[]>([
    'customersServed',
    'depositProducts',
    'loanProducts',
    'services',
  ])
  const isFilterDirty = useMemo(() => isDirty(filterState, DEFAULT_FILTER_STATE), [filterState])
  useEffect(() => {
    setFilterState(DEFAULT_FILTER_STATE)
  }, [])

  useEffect(() => {
    onFilterChange(filterState)
  }, [filterState, onFilterChange])

  const handleReset = () => {
    setFilterState(DEFAULT_FILTER_STATE)
  }

  const handleExpandAll = (checked: boolean) => {
    if (checked) {
      setAccordionValue(['customersServed', 'depositProducts', 'loanProducts', 'services'])
    } else {
      setAccordionValue([])
    }
  }

  const handleCheckboxChange = (category: FilterCategory, optionKey: string, checked: boolean) => {
    setFilterState((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [optionKey]: checked,
      },
    }))
  }

  return (
    <Stack>
      {/* Header with Filter title + Reset */}
      <Group className="justify-between">
        <Text>Filters</Text>
        <Group>
          {isFilterDirty && (
            <Button
              variant="subtle"
              size="compact-xs"
              onClick={handleReset}
              classNames={{ label: 'text-xs' }}
            >
              Reset
            </Button>
          )}
          <Switch
            label="Expand"
            checked={accordionValue.length === 4}
            onChange={(event) => handleExpandAll(event.currentTarget.checked)}
          />
        </Group>
      </Group>

      {/* Expand All checkbox */}

      {/* Mantine Accordion with default styling */}
      <Accordion multiple value={accordionValue} onChange={setAccordionValue}>
        <Stack>
          {FILTER_SECTIONS.map((section) => (
            <Accordion.Item key={section.key} value={section.key}>
              <Accordion.Control>{section.title}</Accordion.Control>
              <Accordion.Panel>
                <Stack className="gap-2">
                  {section.options.map((optionKey) => (
                    <Checkbox
                      key={optionKey}
                      label={FILTER_DISPLAY_NAMES[optionKey] || optionKey.replace(/_/g, ' ')}
                      checked={
                        filterState[section.key][
                          optionKey as keyof (typeof filterState)[typeof section.key]
                        ] || false
                      }
                      onChange={(event) =>
                        handleCheckboxChange(section.key, optionKey, event.currentTarget.checked)
                      }
                    />
                  ))}
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Stack>
      </Accordion>
    </Stack>
  )
}

export default EcoBankFilters
