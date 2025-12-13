import type { Bank } from '@lib/banks'
import { findBanks } from '@lib/banks'
import { Autocomplete, Loader } from '@mantine/core'
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
}

function BankSearch({
  banks,
  value,
  onChange,
  disabled = false,
  loading = false,
  label = 'Bank',
  placeholder: customPlaceholder,
  country,
}: BankSearchProps) {
  const [search, setSearch] = useState(value?.name || '')

  const placeholder = useMemo(() => {
    if (loading) return 'Loading banks...'
    if (!country) return 'Set a country first'
    if (!banks.length) return `No bank data found for this country`
    return customPlaceholder || 'Search bank...'
  }, [loading, country, banks.length, customPlaceholder])

  const filteredBanks = useMemo(() => findBanks(banks, search), [banks, search])

  const autocompleteData = useMemo(() => {
    return filteredBanks.map((bank) => ({
      value: bank.tag,
      label: bank.name,
      bank,
    }))
  }, [filteredBanks])

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
    <Autocomplete
      label={label}
      placeholder={placeholder}
      value={search}
      onChange={handleChange}
      onOptionSubmit={handleOptionSubmit}
      data={autocompleteData}
      disabled={disabled || loading || !banks.length}
      maxDropdownHeight={300}
      limit={50}
      leftSection={loading && !disabled ? <Loader size="xs" /> : <span>🏦</span>}
      rightSection={search ? undefined : null}
      onFocus={(e) => e.target.select()}
    />
  )
}

export default BankSearch
