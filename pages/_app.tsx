import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

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
