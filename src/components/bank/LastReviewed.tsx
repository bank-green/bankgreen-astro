import { Text } from '@mantine/core'

interface LastReviewedProps {
  lastReviewed?: string | null
}

export function LastReviewed({ lastReviewed }: LastReviewedProps) {
  if (!lastReviewed) {
    return null
  }

  const formattedDate = new Date(lastReviewed).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Text className="text-gray-600 text-sm">
      Last reviewed: <time dateTime={lastReviewed}>{formattedDate}</time>
    </Text>
  )
}
