import { MantineProvider } from '@mantine/core'
import * as typeformEmbed from '@typeform/embed'
import { useEffect, useRef } from 'react'
import { theme } from '@/styles/theme'

export function TypeformEmbed() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      typeformEmbed.createWidget('rwxTfN15', {
        container: containerRef.current,
        width: '100%',
        height: 800,
      })
    }
  }, [])

  return (
    <MantineProvider theme={theme}>
      <div className="min-h-[800px] w-full">
        <div
          ref={containerRef}
          className="h-full w-full [&_iframe]:h-[800px]! [&_iframe]:w-full!"
        />
      </div>
    </MantineProvider>
  )
}
