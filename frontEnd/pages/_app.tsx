import "@/styles/globals.css";
import '@/styles/customTailWind.css';
import "@/styles/fontpicker.min.css";

import { Hanken_Grotesk, Satisfy, Lobster } from "next/font/google";
const ft_HKGrotesk = Hanken_Grotesk({
  variable: "--font-HKGrotesk",
  subsets: ['latin']
});
const ft_Satisfy = Satisfy({
  weight: ['400'],
  subsets: ['latin']
});
const ft_Lobster = Lobster({
  weight: ['400'],
  subsets: ['latin']
})

import { useEffect } from "react";

import Head from "next/head";
import type { AppProps } from "next/app";
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // localStorage.setItem('account', '00')
    // localStorage.setItem('isVIP', 'true')
    // localStorage.setItem('tid', 'D10')
  }, [])

  return (
    <>
      <Head>
        {/* Pre link to GoogleFonts */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <title>{`ResumeEdge | ${pageProps.pageName}`}</title>
      </Head>
      {
        pageProps.noHeader ? <></> : <Header />
      }
      <Component {...pageProps} />
      {
        pageProps.noFooter ? <></> : <Footer />
      }
    </>
  );
}
