import {ThemeProvider} from 'styled-components'

import {DefaultTheme} from './styles/themes/default'

import {Title} from './styeled'



export function App() {
  

  return (
    <ThemeProvider theme={DefaultTheme}>
      <Title>Hello word</Title>
    </ThemeProvider>
  )
}


