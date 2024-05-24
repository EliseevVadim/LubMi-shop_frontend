import '../styles/main.scss'

import React, { useEffect } from 'react';
import { AppProps } from "next/app";
import { NextFonts } from "../components/client/common/NextFonts";
import Head from "next/head";
import { ConfigProvider } from "antd";
import locale from "antd/locale/ru_RU";
import { AlertProvider } from "../controllers/AlertNotification/index";

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
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/96824580"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no"
        />
        <link
          rel="icon"
          href="/favicon.png"
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
