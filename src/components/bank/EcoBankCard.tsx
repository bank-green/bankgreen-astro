import type { EcoBankCard as EcoBankCardType } from '@lib/types/eco-banks'
import { Badge, Card, Divider, Group, List, Text, Title } from '@mantine/core'
import { CaretRightIcon } from '@phosphor-icons/react'
import BankLogo from './BankLogo'

interface EcoBankCardProps {
  bank: EcoBankCardType
}

function EcoBankCard({ bank }: EcoBankCardProps) {
  return (
    <Card
      component="a"
      href={`/sustainable-eco-banks/${bank.tag}`}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="transition hover:shadow-md"
    >
      {/* Header: Logo + Name + Badges */}
      <Card.Section className="p-6">
        <Group className="justify-between">
          <Group>
            <BankLogo brandDomain={bank.website} size={32} imgClass="" />
            <Title order={3} size="h4">
              {bank.name}
            </Title>
          </Group>
          <Group className="gap-2">
            {bank.topPick && (
              <Badge color="orange" variant="light">
                Top Pick
              </Badge>
            )}
            {bank.fossilFreeAlliance && (
              <Badge color="green" variant="light">
                Fossil Free
              </Badge>
            )}
          </Group>
        </Group>
      </Card.Section>

      <Divider />

      {/* Interest Rate + Deposit Protection */}
      <Card.Section className="p-6">
        <Group className="justify-between">
          <div>
            <Text size="xs" c="dimmed">
              Interest Rate
            </Text>
            <Text fw={600}>{bank.interestRate}</Text>
          </div>
          <div>
            <Text size="xs" c="dimmed">
              Deposit Protection
            </Text>
            <Text fw={600}>{bank.depositProtection}</Text>
          </div>
        </Group>
      </Card.Section>

      {/* Features - only show if there are features */}
      {Object.keys(bank.features).length > 0 && (
        <>
          <Divider />
          <Card.Section className="p-6">
            <Group className="w-full items-start justify-between gap-4">
              {Object.entries(bank.features).map(([category, items]) => (
                <div key={category}>
                  <Text fw={600} size="sm" className="mb-2">
                    {category}
                  </Text>
                  <List size="sm" spacing="xs">
                    {items.map((item) => (
                      <List.Item key={item} className="ml-0 pl-0">
                        {item}
                      </List.Item>
                    ))}
                  </List>
                </div>
              ))}
            </Group>
          </Card.Section>
        </>
      )}

      <Divider />

      {/* Learn more link */}
      <Card.Section className="p-6">
        <Group className="justify-end">
          <Text size="sm" fw={500} c="dimmed">
            Learn more
          </Text>
          <CaretRightIcon size={16} />
        </Group>
      </Card.Section>
    </Card>
  )
}

export default EcoBankCard
