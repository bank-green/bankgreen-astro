import { findCountries, getCountryName } from '@lib/countries'
import { detectUserLocation } from '@lib/geolocation'
import { findStates, getStateName } from '@lib/states'
import { Autocomplete, type AutocompleteProps, Group, Loader } from '@mantine/core'
import { MapPinSimpleIcon } from '@phosphor-icons/react'
import { useEffect, useMemo, useState } from 'react'

interface LocationSearchProps {
  value?: string
  onChange?: (value: string) => void
  onStateChange?: (value: string) => void
  onInitialized?: () => void
  disabled?: boolean
  label?: string
  placeholder?: string
  autoDetect?: boolean
  className?: string
}

function LocationSearch({
  value = '',
  onChange,
  onStateChange,
  onInitialized,
  disabled = false,
  label = 'Country',
  placeholder = 'Search country...',
  autoDetect = true,
  className = '',
}: LocationSearchProps) {
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(value)
  const [USStateSearch, setUSStateSearch] = useState('')
  const [_selectedUSState, setSelectedUSState] = useState('')
  const [showStateSearch, setShowStateSearch] = useState(false)
  const [isDetecting, setIsDetecting] = useState(false)
  const [useAutoDetect, setUseAutoDetect] = useState(autoDetect)

  useEffect(() => {
    switch (selectedCountry) {
      case 'US':
        setShowStateSearch(true)
        break
      default:
        setShowStateSearch(false)
        setSelectedUSState('')
        setUSStateSearch('')
        break
    }
  }, [selectedCountry])

  // Auto-detect user's location on mount
  useEffect(() => {
    if (useAutoDetect && !value) {
      setIsDetecting(true)
      detectUserLocation()
        .then((location) => {
          if (location.country) {
            setSelectedCountry(location.country)
            setSearch(getCountryName(location.country))
            onChange?.(location.country)

            // If US and we have a state, set it
            if (location.country === 'US' && location.regionCode) {
              setSelectedUSState(location.regionCode)
              setUSStateSearch(getStateName(location.regionCode))
              onStateChange?.(location.regionCode)
            } else {
              setSelectedUSState('')
              setUSStateSearch('')
              onStateChange?.('')
            }
          }
          onInitialized?.()
        })
        .catch((error) => {
          console.error('Failed to auto-detect location:', error)
          onInitialized?.()
        })
        .finally(() => {
          setIsDetecting(false)
        })
    } else {
      // If not using auto-detect, mark as initialized immediately
      onInitialized?.()
    }
  }, [useAutoDetect, value, onChange, onStateChange, onInitialized])

  // Initialize search value from selected country
  useEffect(() => {
    if (value) {
      setSelectedCountry(value)
      setSearch(getCountryName(value))
    }
  }, [value])

  const filteredCountryCodes = useMemo(() => findCountries(search), [search])

  // Convert country codes to autocomplete data format
  const autocompleteData = useMemo(() => {
    return filteredCountryCodes.map((code) => ({
      value: code,
      label: `${getCountryName(code)} (${code})`,
    }))
  }, [filteredCountryCodes])

  const handleChange = (val: string) => {
    setSearch(val)

    if (val === '') {
      setUseAutoDetect(false)
      setSelectedCountry('')
      setSelectedUSState('')
      setUSStateSearch('')
      onChange?.('')
      onInitialized?.()
      return
    }

    // Check if the value matches a country name exactly
    const matchedCountry = autocompleteData.find(
      (item) => item.label.toLowerCase() === val.toLowerCase()
    )

    if (matchedCountry) {
      setSelectedCountry(matchedCountry.value)
      setSelectedUSState('')
      setUSStateSearch('')
      onChange?.(matchedCountry.value)
    }
  }

  const handleOptionSubmit = (val: string) => {
    // val is the country code
    setSelectedCountry(val)
    setSearch(getCountryName(val))
    onChange?.(val)
  }

  const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({ option }) => {
    const flag = option.value
      .toUpperCase()
      .replace(/./g, (char: string) => String.fromCodePoint(127397 + char.charCodeAt(0)))

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '1.2em' }}>{flag}</span>
        <span>{`${getCountryName(option.value)} (${option.value})`}</span>
      </div>
    )
  }

  const filteredStateCodes = useMemo(() => findStates(USStateSearch), [USStateSearch])

  const stateAutocompleteData = useMemo(() => {
    return filteredStateCodes.map((code) => ({
      value: code,
      label: getStateName(code),
    }))
  }, [filteredStateCodes])

  const handleStateChange = (val: string) => {
    setUSStateSearch(val)

    const matchedState = stateAutocompleteData.find(
      (item) => item.label.toLowerCase() === val.toLowerCase()
    )

    if (matchedState) {
      setSelectedUSState(matchedState.value)
      onStateChange?.(matchedState.value)
    } else {
      onStateChange?.(val)
    }
  }

  const handleStateOptionSubmit = (val: string) => {
    setSelectedUSState(val)
    setUSStateSearch(getStateName(val))
    onStateChange?.(val)
  }

  return (
    <Group className={className}>
      <Autocomplete
        label={label}
        className="max-w-md grow"
        placeholder={isDetecting ? 'Detecting your location...' : placeholder}
        value={search}
        clearable
        onChange={handleChange}
        onOptionSubmit={handleOptionSubmit}
        data={autocompleteData}
        disabled={disabled || isDetecting}
        renderOption={renderAutocompleteOption}
        maxDropdownHeight={300}
        limit={50}
        leftSection={isDetecting && !disabled && <Loader size="xs" />}
        rightSection={search ? undefined : <MapPinSimpleIcon size={16} />}
        onFocus={(e) => e.target.select()}
      />
      {showStateSearch && (
        <Autocomplete
          label="State"
          clearable
          className="max-w-md grow"
          leftSection={isDetecting && !disabled && <Loader size="xs" />}
          placeholder={isDetecting ? 'Detecting your state...' : 'Search state...'}
          value={USStateSearch}
          onChange={handleStateChange}
          onOptionSubmit={handleStateOptionSubmit}
          data={stateAutocompleteData}
          disabled={disabled || isDetecting}
          maxDropdownHeight={300}
          limit={50}
          onFocus={(e) => e.target.select()}
        />
      )}
    </Group>
  )
}

export default LocationSearch
