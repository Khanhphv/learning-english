import "./globals.css";
import Head from "next/head";
import { SWRConfig } from "swr";
import httpClient from "api-client/httpClient";
import { Toaster } from "sonner";
export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    
      <SWRConfig value={{fetcher:  async (url: string) => await httpClient.get(url), shouldRetryOnError:false}}>
        <Toaster expand={true} position="top-center" richColors />
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <meta name="apple-mobile-web-app-capable" content="yes"></meta>
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          ></meta>
        </Head>
        {getLayout(<Component {...pageProps} />)}
      </SWRConfig>
    
  );
}
