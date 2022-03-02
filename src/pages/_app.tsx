import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { theme } from '../styles/theme'
import { SiderbarDrawerProvider } from '../contexts/SidebarContext'
import { makeServer } from '../services/mirage'

if (process.env.NODE_ENV === "development") {
  makeServer()
}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SiderbarDrawerProvider>
          <Component {...pageProps} />
        </SiderbarDrawerProvider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
