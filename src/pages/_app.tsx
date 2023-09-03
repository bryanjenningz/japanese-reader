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
          content="A mobile-focused Japanese reader web app built with React, TypeScript, Next.js, TailwindCSS, and Zustand. Initialized with create-t3-app."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
