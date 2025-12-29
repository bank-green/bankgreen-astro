import { detectUserLocation } from '@lib/geolocation'
import type { SimpleBankCard } from '@lib/queries/brands'
import { fetchTopSustainableBanks } from '@lib/queries/brands'
import { Anchor, Card, LoadingOverlay, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { useEffect, useState } from 'react'
import BankLogo from './BankLogo'

export function ThanksTopEcoBanksWidget() {
  const [loading, setLoading] = useState(true)
  const [country, setCountry] = useState<string | null>(null)
  const [banks, setBanks] = useState<SimpleBankCard[]>([])

  // Detect user location on mount
  useEffect(() => {
    const getLocation = async () => {
      try {
        const location = await detectUserLocation()
        setCountry(location.country)
      } catch (error) {
        console.error('Failed to detect location:', error)
        setCountry(null)
      }
    }

    getLocation()
  }, [])

  // Fetch banks when country is detected
  useEffect(() => {
    const loadBanks = async () => {
      if (!country) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const results = await fetchTopSustainableBanks(country, 3)
        setBanks(results)
      } catch (error) {
        console.error('Failed to load banks:', error)
        setBanks([])
      } finally {
        setLoading(false)
      }
    }

    loadBanks()
  }, [country])

  return (
    <Stack className="w-full gap-6">
      <SimpleGrid cols={{ base: 1, md: 3 }} className="gap-6">
        {loading ? (
          // Loading state: 3 placeholder cards
          [1, 2, 3].map((i) => (
            <Card key={i} className="relative h-48 bg-white">
              <LoadingOverlay visible={true} />
            </Card>
          ))
        ) : banks.length > 0 ? (
          // Loaded state: Bank cards
          banks.map((bank) => (
            <Card
              key={bank.tag}
              className="group h-48 bg-white/95 duration-100 hover:bg-white hover:shadow-lg active:scale-98 active:duration-10"
              component="a"
              href={`/sustainable-eco-banks/${bank.tag}`}
            >
              <Stack className="items-center gap-4 text-center">
                <BankLogo brandDomain={bank.website} size={64} imgClass="rounded-lg" />
                <Title
                  order={3}
                  className="text-lg text-textDefault duration-100 group-hover:text-linkHover"
                >
                  {bank.name}
                </Title>
                <Text className="text-sm text-textDefault duration-100 group-hover:text-linkHover">
                  Learn more →
                </Text>
              </Stack>
            </Card>
          ))
        ) : (
          // Empty state: No banks found
          <Stack className="col-span-full gap-4 text-center">
            <Text className="text-gray-600">
              We're still building our database of sustainable banks in your area.
            </Text>
            <Text className="text-gray-600">
              <Anchor href="/sustainable-eco-banks" className="text-sushi-600">
                Explore all sustainable banks
              </Anchor>{' '}
              to find one that works for you.
            </Text>
          </Stack>
        )}
      </SimpleGrid>
    </Stack>
  )
}
