import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import ThemeProvider from '@/theme'
import HackerNotificationsProvider from '@/core/snackbar/HackerNotifications'
import { Stack, Typography } from '@mui/material'
import { tailwindColors } from '@/theme/tailwindColors'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Scrapper UI',
  description: 'Scrapper UI System',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <HackerNotificationsProvider>
            <Stack
              spacing={4}
              height={'100%'}
              width={'100%'}
              alignItems={'center'}
              sx={{
                backgroundImage:
                  'radial-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px)',
                backgroundSize: '8px 8px',
                backgroundColor: tailwindColors.gray[950],
                color: tailwindColors['green'][500],
                fontFamily: 'monospace',
                marginX: 'auto',
                overflow: 'hidden',
                p: { xs: 2, sm: 4, md: 6 },
                pb: { xs: 4, sm: 6, md: 8 },
                width: '100vw',
                height: '100vh',
                overflowX: 'hidden',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                msOverflowStyle: 'none', // IE and Edge
                scrollbarWidth: 'none', // Firefox
              }}
            >
              {children}
              <Stack
                justifyContent={'center'}
                alignItems={'center'}
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  backgroundColor: `${tailwindColors.white}01s`,
                  backdropFilter: 'blur(2px)',
                  width: '100%',
                  paddingY: 2,
                }}
              >
                <Typography>
                  &copy; 2024 MATCOM Anonymous | The University is Ours
                </Typography>
              </Stack>
            </Stack>
          </HackerNotificationsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
