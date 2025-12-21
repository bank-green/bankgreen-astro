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
    <p className="mt-4 text-gray-600 text-sm">
      Last reviewed: <time dateTime={lastReviewed}>{formattedDate}</time>
    </p>
  )
}
