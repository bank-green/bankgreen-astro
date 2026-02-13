import { List, ThemeIcon } from '@mantine/core'
import { CheckCircleIcon } from '@phosphor-icons/react'

export function CTAChecklist({ items }: { items: string[] }) {
  return (
    <List
      classNames={{
        root: 'space-y-1 rounded-2xl bg-white p-8 text-left',
        item: 'md:text-lg',
        itemWrapper: 'items-start',
      }}
      icon={
        <ThemeIcon color="transparent" size={24} radius="xl" className="ml-0 shrink-0 pl-0">
          <CheckCircleIcon size={24} className="-mb-2 text-green-500" weight="fill" />
        </ThemeIcon>
      }
    >
      {items.map((item) => (
        <List.Item key={item}>{item}</List.Item>
      ))}
    </List>
  )
}
