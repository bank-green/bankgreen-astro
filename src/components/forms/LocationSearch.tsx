import { Autocomplete, Group, Stack, TextInput } from '@mantine/core'
import { useState } from 'react'

function BankSearch() {
  const [location, setLocation] = useState('')
  const [bank, setBank] = useState('')
  const onLocationChange = (value: string) => {
    setLocation(value)
  }
  const onBankChange = (value: string) => {
    setBank(value)
  }
  return (
    <Stack>
      <Group>
        <TextInput
          label="Location"
          placeholder="Enter bank name or code"
          size="md"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
        />
        <Autocomplete
          label="Bank"
          placeholder="Select a bank"
          data={['Bank of America', 'Chase', 'Wells Fargo', 'Citibank']}
          value={bank}
          onChange={onBankChange}
        />
      </Group>
      {/* Add your bank search functionality here */}
    </Stack>
  )
}

export default BankSearch
