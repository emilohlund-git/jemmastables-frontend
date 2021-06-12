import Head from "next/head";
import React from "react";
import "./_app.css";
import "antd/dist/antd.css";
import "tailwindcss/tailwind.css";
import Footer from "../components/Footer";
import SimpleReactLightbox from "simple-react-lightbox";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <SimpleReactLightbox>
        <Component {...pageProps} />
      </SimpleReactLightbox>
      <Footer />
    </>
  );
};

export default MyApp;
