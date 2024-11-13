import { blue, green, orange, red, yellow } from '@mui/material/colors'
import { black, white } from './tailwindColors'

export const common = {
  black: black,
  white: white,
}

export const primary = {
  main: green[500],
  light: green[400],
  contrastText: common.black,
}

export const secondary = {
  main: orange[500],
  light: orange[400],
  contrastText: common.black,
}

export const error = {
  main: red[500],
  light: red[400],
  contrastText: common.black,
}

export const info = {
  main: blue[500],
  light: blue[400],
  contrastText: common.black,
}

export const success = {
  main: green[500],
  light: green[400],
  contrastText: common.black,
}

export const warning = {
  main: yellow[500],
  light: yellow[400],
  contrastText: common.black,
}

export const background = {
  grey: '#EEEEEE',
  light: '#4ade80',
  black: '#252525',
}
