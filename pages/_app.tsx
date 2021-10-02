import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/system'
import baseTheme from '../src/types/themes'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={baseTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default MyApp
