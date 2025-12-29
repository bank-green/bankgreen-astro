import type { EcoBankCard as EcoBankCardType } from '@lib/types/eco-banks'
import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
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
import { useEffect, useState } from 'react'
import BankLogo from './BankLogo'

interface EcoBankCardProps {
  bank: EcoBankCardType
  externalOpened?: boolean
  onToggle?: (bankTag: string, isOpened: boolean) => void
  resetTrigger?: number
}

function EcoBankCard({ bank, externalOpened, onToggle, resetTrigger }: EcoBankCardProps) {
  const [opened, { toggle }] = useDisclosure(true)
  const [childHovered, _setChildHovered] = useState(false)
  const [userOverride, setUserOverride] = useState<boolean | null>(null)

  // If user has manually toggled, use their override; otherwise use external control or internal state
  const effectiveOpened =
    userOverride !== null ? userOverride : externalOpened !== undefined ? externalOpened : opened

  // Reset user override when external control changes (when user toggles the "Expand all" switch)
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally only reset on externalOpened change
  useEffect(() => {
    setUserOverride(null)
  }, [externalOpened])

  useEffect(() => {
    if (resetTrigger !== undefined) {
      setUserOverride(null)
    }
  }, [resetTrigger])

  const handleToggle = () => {
    const newState = !effectiveOpened
    setUserOverride(newState)
    toggle()
    if (onToggle) {
      onToggle(bank.tag, newState)
    }
  }

  return (
    <Anchor href={`/sustainable-eco-banks/${bank.tag}`} className="decoration-transparent!">
      <Card
        className={cx(
          'group/card bg-white/90 p-0 transition-all duration-100 hover:shadow-md active:shadow-xs active:duration-10',
          {
            'hover:bg-white': !childHovered,
          }
        )}
      >
        <Box className="group-active/card:bg-blue-100/50">
          {/* Header: Logo + Name + Badges */}
          <Card.Section
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              handleToggle()
            }}
            className="group/header p-6 transition-all hover:bg-white active:bg-blue-100/50"
          >
            <Stack className="p-8 pb-0">
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
                    className="rounded-full transition-all duration-150 group-hover/header:bg-green-100 group-active/header:bg-green-200 group-has-aria-hidden/card:rotate-180"
                  >
                    <CaretDownIcon className="" />
                  </ActionIcon>
                </Group>
              </Group>
              <Divider />
            </Stack>
          </Card.Section>

          <Collapse in={effectiveOpened}>
            <Stack className="gap-0 p-8 pt-0">
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
              <Card.Section className="p-4 pr-4 pb-4">
                <Group className="justify-end">
                  <Button
                    variant="transparent"
                    size="sm"
                    classNames={{
                      root: 'rounded-full px-4 group-hover/card:bg-green-100',
                      label: 'text-sm',
                    }}
                    rightSection={<CaretRightIcon size={16} weight="bold" />}
                  >
                    Learn more
                  </Button>
                </Group>
              </Card.Section>
            </Stack>
          </Collapse>
        </Box>
      </Card>
    </Anchor>
  )
}

export default EcoBankCard
