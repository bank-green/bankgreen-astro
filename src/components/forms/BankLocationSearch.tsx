import { Stack, Title } from '@mantine/core'
import LocationSearch from './LocationSearch'

function BankLocationSearch() {
  return (
    <Stack>
      <Title order={4} className="text-sky-800">
        Check if your bank is funding fossil fuels
      </Title>
      <LocationSearch />
    </Stack>
  )
}

export default BankLocationSearch
