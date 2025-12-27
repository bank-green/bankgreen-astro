import { Image, Stack } from '@mantine/core'
import type { ReactNode } from 'react'

const CornerLogo = () => (
  <Image
    className="-top-4 md:-top-8 md:-right-8 absolute right-4 h-12 w-auto drop-shadow-lg md:h-20"
    src="/img/logos/bankgreen-logo.png"
    alt="Bank Green"
  />
)

export default CornerLogo

export const CornerLogoContainer = ({
  children,
  className,
}: {
  children: ReactNode | ReactNode[]
  className?: string
}) => (
  <Stack
    className={`relative bg-leaf-700 text-textInverse md:rounded-2xl [&_h1]:text-textInverse [&_h2]:text-textInverse ${className}`}
  >
    {children}
    <CornerLogo />
  </Stack>
)
