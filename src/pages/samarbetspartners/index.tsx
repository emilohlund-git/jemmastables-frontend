import Layout from "../../components/Layout";
import React from "react";
import { withApollo } from "../../utils/withApollo";
import Image from 'next/image';

const index = () => {
  return (
    <Layout>
      <div className="flex flex-col mt-32 relative text-white w-full">
        <div className="flex flex-col mx-auto justify-center">
          <h1 className="text-4xl uppercase text-white">Stallet</h1>
          <hr className="bg-white my-5 w-full" />
        </div>
        <div className="mx-10 sm:mx-20 md:mx-40 lg:mx-60 mb-20 flex flex-col flex-grow md:flex-row flex-wrap mt-3">
          <div className="flex justify-center h-52 items-center">
            <Image
              loading="eager"
              src="/images/partners/horse_partner.png"
              className="filter grayscale invert"
              width={110}
              height={100}
              alt=""
            />
          </div>
          <div className="flex justify-center h-52 items-center">
            <Image
              loading="eager"
              src="/images/partners/maskin_companiet.png"
              className="filter grayscale invert"
              width={220}
              height={80}
              alt=""
            />
          </div>
          <div className="flex justify-center h-52 items-center">
            <Image
              src="/images/partners/sellamigo.png"
              className="filter grayscale invert"
              width={220}
              height={50}
              alt=""
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(index);
