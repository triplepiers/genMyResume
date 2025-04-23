import "@/styles/globals.css";
import '@/styles/customTailWind.css';

import { Hanken_Grotesk, Satisfy, Lobster } from "next/font/google";
const ft_HKGrotesk = Hanken_Grotesk({
  variable: "--font-HKGrotesk"
});
const ft_Satisfy = Satisfy({
  weight: ['400']
});
const ft_Lobster = Lobster({
  weight: ['400']
})

import { useEffect } from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import type { AppProps } from "next/app";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function App({ Component, pageProps }: AppProps) {
  // 监听路由变化
  const router = useRouter()

  useEffect(() => {
    // localStorage.setItem('account', '00')
    // localStorage.setItem('isVIP', 'true')
    // localStorage.setItem('tid', 'S01')
    const handleRouteChange = (url:string) => {
      // 不能阻止直接通过 URL 访问的
      // console.log(`Route is changing to ${url}`)
      if (!localStorage.getItem('account') &&
        url!=='/' && url!=='/login'
      ) {
        router.push('/login'); // 这个要放出来
      }
    }
    router.events.on('routeChangeStart', handleRouteChange)
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  })
  
  return (
    <>
      <Head>
        {/* 所有网页的 title */}
        <title>{`ResumeEdge | ${pageProps.pageName}`}</title>
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
      {/* {() => {
          if(!(pageProps.privateFooter)) { return ( <Footer /> )}
      }} */}
    </>
  );
}
