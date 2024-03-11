import { Box } from '@chakra-ui/react'
import React from 'react'

interface ProgressBarProps {
  progress: number // Progress should be a value between 0 and 100
  backgroundColor?: string // Optional prop to customize the background color of the progress bar
  fillColor?: string // Optional prop to customize the fill color of the progress
  height?: string // Optional prop to customize the height of the progress bar
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  backgroundColor = '#e0e0de',
  fillColor = '#4caf50',
  height = '15px',
}) => {
  // Ensure progress doesn't go below 0 or above 100
  const validProgress = Math.min(Math.max(progress, 0), 100)

  return (
    <Box
      width="100%"
      background={backgroundColor}
      borderRadius="30px"
      overflow="hidden"
      height={height}
    >
      <Box
        height={'100%'}
        width={`${validProgress}%`}
        bgGradient={fillColor}
        transition="width 0.3s ease-in-out"
      ></Box>
    </Box>
  )
}

export default ProgressBar
