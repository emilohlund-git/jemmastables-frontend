import Head from "next/head";
import React from "react";
import "tailwindcss/tailwind.css";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
