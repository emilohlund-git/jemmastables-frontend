import { Carousel } from "antd";
import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Layout from "../../../components/Layout";
import { withApollo } from "../../../utils/withApollo";

const images = ["/images/byggnader/ridbanan/ridbanan.png"];

const index = () => {
  return (
    <Layout>
      <div className="flex flex-col mt-32 relative text-white w-full">
        <div className="flex flex-col mx-auto justify-center">
          <h1 className="text-4xl uppercase text-white">Ridbanan</h1>
          <hr className="bg-white my-5 w-full" />
        </div>
        <div className="mx-10 sm:mx-20 md:mx-40 lg:mx-60 flex justify-center">
          <Breadcrumbs />
        </div>
        <div className="mx-10 sm:mx-20 md:mx-40 lg:mx-60 mb-20 flex flex-col flex-grow md:flex-row flex-wrap mt-3">
          <p className="mt-5">
            Precis utanför stallet finns det en ridbana med måtten 70x35m.
            Ridbanan är anlagd med fibersand av högsta kvalitet. Under årets
            mörkare månader samt kvällstid finns det utmärkt belysning i form av
            LED-strålkastare på stolpar som ger minimal skuggkastning.
          </p>
          <p className="mt-5">
            Med hänsyn till det geografiska läget som kan ge milda vintrar och
            periodvis stor nederbörd är banan väldränerad för att kunna nyttjas
            nästintill året runt. Bevattning tas från en vattentank på 8000
            liter som kan tömmas varannan dag (vilket behövs under torrperiod).
            I direkt anslutning till ridbanan finns en stor uppgrusad parkering
            anpassad för tyngre fordon så att ekipagen snabbt och enkelt kan ta
            sig till och från banan utan att trängas.
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
