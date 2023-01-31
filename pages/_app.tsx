import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

export default function App({ Component, pageProps }: AppProps) {
  const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
  }

  const theme = extendTheme({ config })

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
