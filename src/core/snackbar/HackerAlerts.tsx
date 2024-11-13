import { IconButton, Snackbar, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  HackerNotificationsTimeout,
  HackerNotificationsType,
} from './HackerNotifications'

type Props = {
  message: string
  type: HackerNotificationsType
  autoHideDuration?: number
  onClose?: () => void
}

const getTypeColor = (type: HackerNotificationsType) => {
  switch (type) {
    case 'info':
      return '#00ffff'
    case 'warn':
      return '#ffff00'
    case 'error':
      return '#ff0000'
    case 'success':
      return '00ff00'
    default:
      return '#00ffff'
  }
}

const HackerAlert = ({
  message,
  type,
  onClose,
  autoHideDuration = HackerNotificationsTimeout,
}: Props) => {
  const [displayedMessage, setDisplayedMessage] = useState<string>('')

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < message.length) {
        setDisplayedMessage((prev) => prev + message[prev.length])
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [message])

  return (
    <Snackbar
      open={true}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Stack
        display={'flex'}
        alignItems={'flex-start'}
        justifyContent={'space-between'}
        sx={{
          animation: `slideIn 0.3s ease-out`,
          fontFamily: '"Courier New", Courier, monospace',
          backgroundColor: '#000',
          color: getTypeColor(type),
          padding: '16px',
          borderRadius: '4px',
          maxWidth: '90%',
          width: '400px',
          fontSize: '0.875rem',
          lineHeight: '1.5',
          boxShadow: `0 0 10px ${getTypeColor(type)}`,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography>
          {type === 'success' && '> SUCCESS: '}
          {type === 'error' && '> ERROR: '}
          {type === 'warn' && '> WARNING: '}
          {type === 'info' && '> INFO: '}
          {displayedMessage}
          <Typography
            component={'span'}
            style={{
              display: 'inline-block',
              width: '8px',
              height: '14px',
              backgroundColor: 'currentColor',
              marginLeft: '4px',
              animation: `blink 0.7s infinite`,
            }}
          />
        </Typography>
        <IconButton
          onClick={onClose}
          disableRipple
          sx={{
            color: 'currentcolor',
            fontSize: '0.875rem',
            p: 0,
            m: 0,
          }}
        >
          x
        </IconButton>
      </Stack>
    </Snackbar>
  )
}

export default HackerAlert
