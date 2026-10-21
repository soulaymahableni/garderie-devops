import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ma Garderie</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Ma Garderie - crèche et jardin d'enfants" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
