import Link from "next/link";
import React from "react";
import HorseCategory from "../../components/HorseCategory";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import { useHorsesQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

const index = () => {
  const { loading, data } = useHorsesQuery();
  console.log(loading, data);

  let body;

  // Data is loading
  if (loading) {
    body = (
      <div className="flex justify-center align-middle">
        <Spinner />
      </div>
    );
    // No data fetched
  } else if (!data?.horses) {
    body = (
      <div>
        <p>No data</p>
      </div>
    );
    // Data is fetched
  } else {
    body = (
      <>
        <Link href={"/hästar/tävlingshästar"}>
          <a>
            <HorseCategory
              image="https://www.jemmastables.com/static/img/h%C3%A4star/dilarad/dilara.png"
              category="Tävlingshästar"
            />
          </a>
        </Link>
        <Link href={"/hästar/unghästar"}>
          <a>
            <HorseCategory
              image="https://www.jemmastables.com/static/img/h%C3%A4star/novajs/novajs.png"
              category="Unghästar"
            />
          </a>
        </Link>
        <Link href={"/hästar/avelsto"}>
          <a>
            <HorseCategory
              image="https://www.jemmastables.com/static/img/h%C3%A4star/amiable/amiable.png"
              category="Avelsto"
            />
          </a>
        </Link>
      </>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col mt-32 relative text-white w-full">
        <div className="flex flex-col mx-auto justify-center">
          <h1 className="text-4xl uppercase">Hästar</h1>
          <hr className="bg-white my-5 w-full" />
        </div>
        <div className="flex justify-center w-full align-middle">
          <div className="mb-20 flex flex-col md:flex-row flex-wrap">
            {body}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(index);
