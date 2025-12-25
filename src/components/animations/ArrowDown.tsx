import { Box } from '@mantine/core'

const ArrowDown = ({ className }: { className?: string }) => {
  return (
    <Box className={`h-10 w-10 animate-bounce text-sushi-500 ${className || ''}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 25 25"
        fill="none"
      >
        <title>Arrow Down</title>
        <path
          d="M6.5 16.0443L12.5 22.0443L18.5 16.0443"
          stroke="#87B448"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.5"
          d="M6.5 9.04431L12.5 15.0443L18.5 9.04431"
          stroke="#87B448"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.2"
          d="M6.5 2.04431L12.5 8.04431L18.5 2.04431"
          stroke="#87B448"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  )
}
export default ArrowDown
