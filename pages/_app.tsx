import "@/styles/globals.css";
import { Hanken_Grotesk } from "next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head";

const ft_HKGrotesk = Hanken_Grotesk({
  variable: "--font-HKGrotesk"
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* 所有网页的 title */}
        <title>A: {pageProps.pageName}</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
