import { Box } from '@mantine/core'

interface SwooshProps {
  direction?: 'up' | 'down'
  color?: string
  className?: string
}

/**
 * Decorative swoosh/wave SVG that creates visual transitions between sections.
 * Used to add curved edges at the top or bottom of full-width background sections.
 *
 * The swoosh creates a curved transition effect - when direction is 'up' (default),
 * the wave curves upward from the bottom; when 'down', it's flipped to curve from the top.
 */
export function Swoosh({
  direction = 'up',
  color = 'var(--color-gray-50)',
  className = '',
}: SwooshProps) {
  const isDown = direction === 'down'

  return (
    <Box className={`relative z-0 py-8 sm:py-10 md:py-12 ${className}`}>
      <svg
        className="absolute inset-x-0 min-h-full w-full"
        style={{
          top: isDown ? 0 : undefined,
          bottom: isDown ? undefined : 0,
          transform: isDown ? 'scaleY(-1)' : undefined,
        }}
        viewBox="0 0 1000 174"
        preserveAspectRatio="none"
        fill={color}
      >
        <title>Wave decoration</title>
        <path
          d="m0 175c250.16-15.25 489.57-30.193 641.34-62.394 169.21-36.691 264.25-63.393 358.66-111.81l0.1449 175z"
          stroke="none"
        />
      </svg>
    </Box>
  )
}
