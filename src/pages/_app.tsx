import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Japanese Reader</title>
        <meta
          name="description"
          content="A mobile-focused Japanese reader web app."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000" />
        <link rel="manifest" href="/app.webmanifest" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
