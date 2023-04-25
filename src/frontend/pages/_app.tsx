import '../styles/globals.css'
import { ThemeProvider } from '@mui/material'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { theme } from '../styles/theme'


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
        <title>Prepple</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <style jsx>{`
          body {
            background-color: ${theme.palette.common.black}
            color: ${theme.palette.common.white}
          }
        `}</style>
        </ThemeProvider>
      </>)
}

export default MyApp
