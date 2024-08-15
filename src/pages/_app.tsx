import '../styles/main.scss'

import React, { useEffect } from 'react';
import { AppProps } from "next/app";
import { NextFonts } from "../components/client/common/NextFonts";
import Head from "next/head";
import { ConfigProvider } from "antd";
import locale from "antd/locale/ru_RU";
import { AlertProvider } from "../controllers/AlertNotification/index";

export const metadata = {
  icons: {
    icon: '/favicon.ico',
  },
};

export default function App({ Component, pageProps }: AppProps){

  const antdTheme: any = {
    token: {
      colorPrimary: 'rgba(34, 34, 34, 1)',
      controlInteractiveSize: 16,
      fontSize: 16,
      borderRadius: 13,
    },
    Select: {
      optionFontSize: 200,
      optionPadding: 100
    },
  };

  return (
    <div>
      <NextFonts />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no"
        />
        <link
          rel="icon"
          href="/favicon.ico"
          sizes="32x32"
          type="image/x-icon"
        />
        <meta name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
      </Head>
      <ConfigProvider theme={antdTheme} locale={locale}>
        <AlertProvider>
          <Component {...pageProps} />
        </AlertProvider>
      </ConfigProvider>
    </div>
  )

}
