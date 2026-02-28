import { NextPage } from 'next';
import type { AppProps } from "next/app";
import type { ReactNode } from 'react';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';
import GlobalLayout from './components/layout/GlobalLayout'
import "@/styles/globals.css";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
}

export default function App({
  Component,
  pageProps
}: AppProps & {
  Component: NextPageWithLayout;
}) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page)

  return (
    <>
      <GlobalLayout>
        {getLayout(<Component {...pageProps} />)}
      </GlobalLayout>

      <SpeedInsights />
      <Analytics />
    </>
  );
}
