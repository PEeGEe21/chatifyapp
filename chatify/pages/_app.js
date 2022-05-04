import Layout from '../components/Layout/layout'
import '../styles/globals.css'
import { useEffect } from 'react'
import Login from './login'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {

  // useEffect(() => {
  //   window.navigator.geolocation.getCurrentPosition(
  //       (newPos) => setPosition(newPos),
  //       console.error
  //     );
  // }, []);

  return (
    <>
    <Head>
        <link
          href="/font/stylesheet.css"
          rel="stylesheet"
        />
        {/* <link
          href="../asset/OpenSans/OpenSans-ExtraBoldItalic.ttf"
          rel="stylesheet"
          /> */}
    </Head>
    {/* <Login/> */}
    {/* <Layout> */}
      <Component {...pageProps} />
    {/* </Layout> */}

    
    </>
  )
}

export default MyApp