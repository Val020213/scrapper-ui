import { Roboto_Mono } from 'next/font/google'

// ----------------------------------------------------------------------

export function remToPx(value: string) {
  return Math.round(parseFloat(value) * 16)
}

export function pxToRem(value: number) {
  return `${value / 16}rem`
}

export function responsiveFontSizes({
  sm,
  md,
  lg,
}: {
  sm: number
  md: number
  lg: number
}) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  }
}

export const primaryFont = Roboto_Mono({
  weight: ['100', '300', '400', '500', '700'],
  subsets: ['latin'],
  style: 'normal',
  display: 'swap',
})

// ----------------------------------------------------------------------

// LEARN MORE
// https://nextjs.org/docs/basic-features/font-optimization#google-fonts

export const typography = {
  fontFamily: primaryFont.style.fontFamily,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,

  h1: {
    fontWeight: 800,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 800,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 28 / 16,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontWeight: 700,
    lineHeight: 28 / 16,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 700,
    lineHeight: 28 / 16,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 16,
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 24 / 16,
    fontSize: pxToRem(14),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 24 / 16,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 24 / 16,
    fontSize: pxToRem(14),
  },
  body2: {
    lineHeight: 24 / 16,
    fontSize: pxToRem(12),
  },
  caption: {
    lineHeight: 24 / 16,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 24 / 16,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
  },
  p: {
    lineHeight: 24 / 16,
    fontSize: pxToRem(14),
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 16,
    fontSize: pxToRem(14),
    textTransform: 'unset',
  },
} as const
