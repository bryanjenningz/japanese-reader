import Head from "next/head";

export default function Home() {
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
      <main className="flex min-h-screen flex-col items-center bg-black text-white">
        <header className="flex h-12 w-full items-center justify-center">
          <div className="w-full max-w-2xl">
            <h1 className="px-4 text-lg font-bold">Japanese Reader</h1>
          </div>
        </header>
      </main>
    </>
  );
}
