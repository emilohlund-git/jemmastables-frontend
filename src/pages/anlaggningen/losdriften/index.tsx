import { Carousel } from "antd";
import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Layout from "../../../components/Layout";
import { withApollo } from "../../../utils/withApollo";

const images = ["/images/byggnader/losdriften/lösdriften.png"];

const index = () => {
  return (
    <Layout>
      <div className="flex flex-col mt-32 relative text-white w-full">
        <div className="flex flex-col mx-auto justify-center">
          <h1 className="text-4xl uppercase text-white">Lösdriften</h1>
          <hr className="bg-white my-5 w-full" />
        </div>
        <div className="mx-10 sm:mx-20 md:mx-40 lg:mx-60 flex justify-center">
          <Breadcrumbs />
        </div>
        <div className="mx-10 sm:mx-20 md:mx-40 lg:mx-60 mb-20 flex flex-col flex-grow md:flex-row flex-wrap mt-3">
          <p className="mt-5">
            Under sensommaren 2019 blev lösdriften färdig. I ett äldre svinstall
            har inredning rivits, golvet sänkts med ca 1m, ny platta gjutits och
            innertakets konstruktion ändrats för att skapa en luftig atmosfär på
            ca 140kvm. Tillfredställande belysning finns både i ligghallen och
            utanför (inomhus är det släckt på natten). Det finns en stor hage
            precis utanför samt en stor och en mindre avdelningsbar hage för att
            hästarna ska kunna röra sig och beta från sen vår till sen höst.
          </p>
          <p className="mt-5">
            Här bor framtidens stjärnhästar tillsammans med en veteran som
            uppfostrar ungdomarna.
          </p>
        </div>
        <div className="w-full mx-auto">
          <Carousel autoplay>
            {images.map((each, index) => (
              <div>
                <div
                  className="py-56 bg-no-repeat bg-cover bg-center"
                  key={index}
                  style={{ backgroundImage: `url(${each})` }}
                ></div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(index);
