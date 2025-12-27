import type { Bank } from '@lib/banks'
import { findBanks } from '@lib/banks'
import { Anchor, Autocomplete, Loader, Stack } from '@mantine/core'
import { BankIcon } from '@phosphor-icons/react'
import { useMemo, useState } from 'react'

interface BankSearchProps {
  banks: Bank[]
  value?: Bank | null
  onChange?: (bank: Bank | null) => void
  disabled?: boolean
  loading?: boolean
  label?: string
  placeholder?: string
  country?: string
  state?: string
  className?: string
}

function BankSearch({
  banks,
  value,
  onChange,
  disabled = false,
  loading = false,
  label = 'Bank',
  placeholder: customPlaceholder,
  country = '',
  state = '',
  className = '',
}: BankSearchProps) {
  const [search, setSearch] = useState(value?.name || '')

  const placeholder = useMemo(() => {
    if (loading) return 'Loading banks...'
    if (!banks.length) return country ? `No bank data found for this country` : 'No bank data found'
    return customPlaceholder || `Search ${banks.length} banks...`
  }, [loading, banks.length, customPlaceholder, country])

  const filteredBanks = useMemo(() => findBanks(banks, search), [banks, search])

  const autocompleteData = useMemo(() => {
    const formatStateLabel = (state: { tag: string; name: string } | undefined) =>
      state?.tag ? `${state?.tag?.slice(3)}` || '' : state?.name || ''

    return filteredBanks.map((bank) => {
      const bankCountry = bank?.countries
        ? bank.countries.length === 1
          ? bank.countries[0]?.code || '' // Only one country
          : bank.countries.length > 3
            ? `${bank.countries.length} countries` // Show number of countries if more than 3
            : bank.countries?.map((c) => c.code).join(', ') // Show all countries if less than 3
        : ''

      const bankState = bank?.countries
        ? bank.countries.length === 1
          ? bank?.stateLicensed
            ? bank.stateLicensed.length === 1
              ? formatStateLabel(bank.stateLicensed?.[0]) // Only one state
              : country === '' // Global search
                ? bank?.stateLicensed.length > 3
                  ? `${bank.stateLicensed.length} states` // Show number of states if more than 3
                  : bank.stateLicensed.map(formatStateLabel).join(', ') // Show all states if less than 3
                : '' // No state in country search
            : ''
          : ''
        : ''

      const label =
        country === '' // Global search, show country and state
          ? bankState
            ? `${bank.name} (${bankState}, ${bankCountry})`
            : `${bank.name} (${bankCountry})`
          : state === '' // Country search with no state, show state if it exists
            ? bankState
              ? `${bank.name} (${bankState})`
              : bank.name
            : bank.name // Country and state search, only show bank name

      return {
        value: bank.tag,
        label: label,
        bank,
      }
    })
  }, [filteredBanks, country, state])

  const handleChange = (val: string) => {
    setSearch(val)

    // Check if value matches exactly
    const matchedBank = autocompleteData.find(
      (item) => item.label.toLowerCase() === val.toLowerCase()
    )

    if (!matchedBank) {
      onChange?.(null)
    }
  }

  const handleOptionSubmit = (val: string) => {
    const selectedBank = autocompleteData.find((item) => item.value === val)
    if (selectedBank) {
      setSearch(selectedBank.label)
      onChange?.(selectedBank.bank)
    }
  }

  const _handleClear = () => {
    setSearch('')
    onChange?.(null)
  }

  return (
    <Stack className="items-center gap-2">
      <Autocomplete
        label={label}
        className={`mx-auto grow ${className}`}
        placeholder={placeholder}
        value={search}
        onChange={handleChange}
        onOptionSubmit={handleOptionSubmit}
        data={autocompleteData}
        disabled={disabled || loading || !banks.length}
        maxDropdownHeight={300}
        limit={50}
        leftSection={loading && !disabled ? <Loader size="xs" /> : <BankIcon />}
        rightSection={search ? undefined : null}
        onFocus={(e) => e.target.select()}
      />
      <Anchor href="/not-listed" variant="transparent" size="compact-sm" className="w-auto">
        My bank isn't listed
      </Anchor>
    </Stack>
  )
}

export default BankSearch
