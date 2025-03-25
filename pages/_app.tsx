import "@/styles/globals.css";
// import { Hanken_Grotesk } from "next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

// const ft_HKGrotesk = Hanken_Grotesk({
//   variable: "--font-HKGrotesk"
// });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* 所有网页的 title */}
        <title>{`Logo | ${pageProps.pageName}`}</title>
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
