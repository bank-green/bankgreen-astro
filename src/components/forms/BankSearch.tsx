import type { Bank } from '@lib/banks'
import { Anchor, Group, Stack, Switch } from '@mantine/core'
import { CaretRightIcon } from '@phosphor-icons/react'
import { useCallback, useMemo } from 'react'
import BankAutocomplete from './BankAutocomplete'

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
  includeCreditUnions?: boolean
  onIncludeCreditUnionsChange?: (value: boolean) => void
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
  includeCreditUnions = false,
  onIncludeCreditUnionsChange,
}: BankSearchProps) {
  const placeholder = useMemo(() => {
    if (loading) return `Loading ${includeCreditUnions ? 'banks and credit unions' : 'banks'}...`
    if (!banks.length) return country ? 'No bank data found for this country' : 'No bank data found'
    return (
      customPlaceholder ||
      `Search ${banks.length} ${includeCreditUnions ? 'banks and credit unions' : 'banks'}...`
    )
  }, [loading, banks.length, customPlaceholder, country, includeCreditUnions])

  const formatLabel = useCallback(
    (bank: Bank) => {
      const formatStateLabel = (s: { tag: string; name: string } | undefined) =>
        s?.tag ? `${s.tag.slice(3)}` || '' : s?.name || ''

      const bankCountry = bank?.countries
        ? bank.countries.length === 1
          ? bank.countries[0]?.code || ''
          : bank.countries.length > 3
            ? `${bank.countries.length} countries`
            : bank.countries.map((c) => c.code).join(', ')
        : ''

      const bankState = bank?.countries
        ? bank.countries.length === 1
          ? bank?.stateLicensed
            ? bank.stateLicensed.length === 1
              ? formatStateLabel(bank.stateLicensed?.[0])
              : country === ''
                ? bank.stateLicensed.length > 3
                  ? `${bank.stateLicensed.length} states`
                  : bank.stateLicensed.map(formatStateLabel).join(', ')
                : ''
            : ''
          : ''
        : ''

      return country === ''
        ? bankState
          ? `${bank.name} (${bankState}, ${bankCountry})`
          : `${bank.name} (${bankCountry})`
        : state === ''
          ? bankState
            ? `${bank.name} (${bankState})`
            : bank.name
          : bank.name
    },
    [country, state]
  )

  return (
    <Stack className="items-end gap-2">
      <BankAutocomplete
        banks={banks}
        value={value}
        onChange={onChange}
        label={label}
        placeholder={placeholder}
        loading={loading}
        disabled={disabled}
        className={className}
        formatLabel={formatLabel}
      />
      <Group className="w-full justify-between">
        <Switch
          checked={includeCreditUnions}
          onChange={(e) => onIncludeCreditUnionsChange?.(e.currentTarget.checked)}
          label="Include credit unions"
        />
        <Anchor href="/not-listed" variant="transparent" size="compact-sm" className="w-auto">
          <Group className="items-center gap-1">
            My bank isn't listed <CaretRightIcon />
          </Group>
        </Anchor>
      </Group>
    </Stack>
  )
}

export default BankSearch
