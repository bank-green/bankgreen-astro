import type { EcoBankCard as EcoBankCardType } from '@lib/types/eco-banks'
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Collapse,
  Divider,
  Group,
  List,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { CaretDownIcon, CaretRightIcon } from '@phosphor-icons/react'
import cx from 'clsx'
import { useState } from 'react'
import BankLogo from './BankLogo'

interface EcoBankCardProps {
  bank: EcoBankCardType
}

function EcoBankCard({ bank }: EcoBankCardProps) {
  const [opened, { toggle }] = useDisclosure(false)
  const [childHovered, setChildHovered] = useState(false)

  return (
    <Card
      withBorder
      className={cx('rounded-lg bg-white/80 p-6 transition-all hover:shadow-md', {
        'group hover:bg-white': !childHovered,
      })}
      onClick={(_e) => {
        toggle()
      }}
    >
      {/* Header: Logo + Name + Badges */}
      <Card.Section className="p-6 transition-all group-has-aria-hidden:pb-1">
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
            <ActionIcon
              variant="subtle"
              className="rounded-full transition-all duration-150 group-hover:bg-green-100 group-active:bg-green-200 group-has-aria-hidden:rotate-180"
            >
              <CaretDownIcon className="" />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>

      <Collapse in={opened}>
        <Stack className="gap-0">
          <Divider />
          {/* Interest Rate + Deposit Protection */}
          <Card.Section className="p-6">
            <Group className="justify-between">
              <div>
                <Text className="text-textLight text-xs">Interest Rate</Text>
                <Text className="font-semibold">{bank.interestRate}</Text>
              </div>
              <div>
                <Text className="text-textLight text-xs">Deposit Protection</Text>
                <Text className="text-right font-semibold">{bank.depositProtection}</Text>
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
                      <Text className="mb-2 font-bold text-sm">{category}</Text>
                      <List className="m-0 p-0">
                        {items.map((item) => (
                          <List.Item key={item} className="my-1 ml-0 list-none pl-0 text-xs">
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
          <Card.Section className="p-4 pr-2 pb-3">
            <Group className="justify-end">
              <Button
                variant="subtle"
                component="a"
                size="compact-sm"
                href={`/sustainable-eco-banks/${bank.tag}`}
                onMouseEnter={() => setChildHovered(true)}
                onMouseLeave={() => setChildHovered(false)}
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                Learn more
                <CaretRightIcon size={16} />
              </Button>
            </Group>
          </Card.Section>
        </Stack>
      </Collapse>
    </Card>
  )
}

export default EcoBankCard
