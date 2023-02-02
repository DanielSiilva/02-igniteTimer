import {ThemeProvider} from 'styled-components'

import {defaultTheme} from './styles/themes/default'

import {Title} from './styeled'
import { GlobalStyle } from './styles/themes/global'



export function App() {
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Title>Hello word</Title>

      <GlobalStyle/>
    </ThemeProvider>
  )
}


