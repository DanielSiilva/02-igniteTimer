import {ThemeProvider} from 'styled-components'

import {DefaultTheme} from './styles/themes/default'

import {Title} from './styeled'
import { GlobalStyle } from './styles/themes/global'



export function App() {
  

  return (
    <ThemeProvider theme={DefaultTheme}>
      <Title>Hello word</Title>

      <GlobalStyle/>
    </ThemeProvider>
  )
}


