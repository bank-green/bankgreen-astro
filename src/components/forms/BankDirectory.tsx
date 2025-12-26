import { Grid } from '@mantine/core'

/* This will include:
    - LocationSearch for country selection
    - EcoBankFilters for filtering
    - EcoBankCards to display results
    - slices2 shown when no results/error
    */

const BankDirectory = () => {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, sm: 3 }}>Filters</Grid.Col>
      <Grid.Col span={{ base: 12, sm: 9 }}>Results</Grid.Col>
    </Grid>
  )
}

export default BankDirectory
