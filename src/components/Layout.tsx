import Footer from "./Footer";
import NavBar from "./NavBar";

const Layout = (props: any) => {
  return (
    <>
      <NavBar />
      <div className="pt-10 z-10">{props.children}</div>
      <Footer />
    </>
  );
};

export default Layout;
