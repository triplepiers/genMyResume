/*
 * Copyright (c) 2025 SeaBee All rights reserved.
 */

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
import { useRouter } from "next/router";
import { isMobile } from 'react-device-detect';

import Head from "next/head";
import type { AppProps } from "next/app";
import { CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton, message  } from 'antd';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function App({ Component, pageProps }: AppProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const shouldRotate = () => {
    if (router.pathname === '/path') {
      // 检查方向
      const isLandscape = window.innerWidth > window.innerHeight;
      if (isMobile && !isLandscape) {
        // 手机 + 如果不是横屏，提示用户
        messageApi.open({
          type: 'warning',
          content: 'Please rotate device to landscape mode',
          duration: 3,
        });
      }
    }
  }
  useEffect(() => {
    shouldRotate();
    // localStorage.setItem('account', '00')
    // localStorage.setItem('isVIP', 'true')
    // localStorage.setItem('tid', 'D10')
  }, [router.pathname]);

  return (
    <>
      {contextHolder}
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
      <a href="https://www.wjx.cn/vm/Q0yawOH.aspx#" target="_blank">
        <FloatButton
          style={{ insetInlineEnd: 40 }}
          icon={<CustomerServiceOutlined />}
          tooltip={{
            title: 'Feedback',
            color: 'var(--pink)',
            placement: 'left',
          }}
        />
      </a>
      {
        pageProps.noFooter ? <></> : <Footer />
      }
    </>
  );
}
