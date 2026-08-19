import type { Bank } from '@lib/banks'
import { findBanks } from '@lib/banks'
import { Autocomplete, Loader } from '@mantine/core'
import { BankIcon } from '@phosphor-icons/react'
import { useMemo, useState } from 'react'

interface BankAutocompleteProps {
  banks: Bank[]
  value?: Bank | null
  onChange?: (bank: Bank | null) => void

  onBlur?: () => void
  label?: string
  placeholder?: string
  loading?: boolean
  disabled?: boolean
  required?: boolean
  error?: React.ReactNode
  className?: string
  formatLabel?: (bank: Bank) => string
}

const defaultFormatLabel = (bank: Bank) => bank.name

function BankAutocomplete({
  banks,
  value,
  onChange,
  onBlur,
  label = 'Bank',
  placeholder,
  loading = false,
  disabled = false,
  required = false,
  error,
  className = '',
  formatLabel = defaultFormatLabel,
}: BankAutocompleteProps) {
  const [search, setSearch] = useState(value?.name ?? '')

  const resolvedPlaceholder = useMemo(() => {
    if (placeholder) return placeholder
    if (loading) return 'Loading banks...'
    if (!banks.length) return 'No bank data found'
    return `Search ${banks.length} banks...`
  }, [placeholder, loading, banks.length])

  const autocompleteData = useMemo(() => {
    const filtered = findBanks(banks, search)
    const seen = new Set<string>()
    return filtered
      .map((bank) => ({ value: bank.tag, label: formatLabel(bank), bank }))
      .filter((item) => {
        if (seen.has(item.label)) return false
        seen.add(item.label)
        return true
      })
  }, [banks, search, formatLabel])

  const handleChange = (val: string) => {
    setSearch(val)
    const match = autocompleteData.find((item) => item.label.toLowerCase() === val.toLowerCase())
    if (!match) onChange?.(null)
  }

  const handleOptionSubmit = (val: string) => {
    const selected = autocompleteData.find((item) => item.value === val)
    if (selected) {
      setSearch(selected.label)
      onChange?.(selected.bank)
    }
  }

  return (
    <Autocomplete
      label={label}
      classNames={{ root: `max-w-xl grow ${className}`, label: 'text-sm' }}
      placeholder={resolvedPlaceholder}
      value={search}
      onChange={handleChange}
      onOptionSubmit={handleOptionSubmit}
      data={autocompleteData}
      disabled={disabled || loading || !banks.length}
      withAsterisk={required}
      maxDropdownHeight={300}
      limit={50}
      comboboxProps={{ withinPortal: false }}
      leftSection={loading && !disabled ? <Loader size="xs" /> : <BankIcon />}
      rightSection={search ? undefined : null}
      error={error}
      onFocus={(e) => e.target.select()}
      onBlur={onBlur}
      size="md"
    />
  )
}

export default BankAutocomplete
