import Head from "next/head";
import Footer from "./Footer";
import NavBar from "./NavBar";

const Layout = (props: any) => {
  return (
    <>
      <NavBar />
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="pt-10">{props.children}</div>
      <Footer />
    </>
  );
};

export default Layout;
