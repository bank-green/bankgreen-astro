import { Button } from '@mantine/core'

export function ChoiceButton({
  children,
  icon,
  onClick,
}: {
  children: React.ReactNode
  icon: React.ReactNode
  onClick: () => void
}) {
  return (
    <Button onClick={onClick} className="w-full" justify="left" leftSection={icon}>
      {children}
    </Button>
  )
}
