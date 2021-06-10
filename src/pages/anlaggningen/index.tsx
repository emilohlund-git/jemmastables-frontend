import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Byggnader from "../../components/Byggnader";
import Layout from "../../components/Layout";
import { withApollo } from "../../utils/withApollo";

const index = () => {
  return (
    <Layout>
      <div className="flex flex-col mt-32 relative text-white w-full">
        <div className="flex flex-col mx-auto justify-center">
          <h1 className="text-4xl uppercase">Anläggningen</h1>
          <hr className="bg-white my-5 w-full" />
        </div>
        <div className="mx-10 sm:mx-20 md:mx-40 lg:mx-60">
          <Breadcrumbs />
        </div>
        <div className="mx-10 sm:mx-20 md:mx-40 lg:mx-60 mb-20 flex flex-col flex-grow md:flex-row flex-wrap justify-center">
          <Byggnader />
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(index);
