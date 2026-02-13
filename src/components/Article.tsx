import { Box, Stack, Title } from '@mantine/core'
import type { ReactNode } from 'react'

export default function Article({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <Stack className="mb-16 bg-white px-6 py-12 md:px-12 md:py-24 lg:rounded-2xl">
      <Box className="mx-auto max-w-3xl">
        {title && (
          <Title order={2} className="mb-12 text-balance text-center">
            {title}
          </Title>
        )}
        {children}
      </Box>
    </Stack>
  )
}
