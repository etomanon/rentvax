export const theme = {
  colors: {
    primary: '#f55b23',
    secondary: '#008aff',
    error: '#E21212',
    grey: '#d3d3d3',
    greyLight: '#E8E8E8',
    text: '#333',
  },
  breakpoints: ['40em', '56.25em', '76em'],
  fontSizes: ['1.2rem', '1.4rem', '1.6rem', '2rem', '2.4rem', '3.2rem'],
  space: [0, '0.4rem', '0.8rem', '1.6rem', '3.2rem'],
}

export type Theme = typeof theme
