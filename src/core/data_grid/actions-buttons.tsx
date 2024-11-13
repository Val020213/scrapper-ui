import { Box } from '@mui/material'
import React from 'react'
import { HackerButton } from '../button/HackerButton'
import { FileDown } from 'lucide-react'

interface Props {
  onDownload?: () => void
}

const ActionsButtons = ({ onDownload }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {onDownload && (
          <HackerButton variant="Button">
            <FileDown />
          </HackerButton>
        )}
      </Box>
    </Box>
  )
}

export default ActionsButtons
