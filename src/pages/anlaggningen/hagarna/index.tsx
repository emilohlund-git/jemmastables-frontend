import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Layout from "../../../components/Layout";
import { withApollo } from "../../../utils/withApollo";

const images = ["/images/byggnader/hagarna/hagarna.png"];

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  prevArrow: <></>,
  nextArrow: <></>,
};

const index = () => {
  return (
    <Layout>
      <div className="flex flex-col mt-32 relative text-white w-full">
        <div className="flex flex-col mx-auto justify-center">
          <h1 className="text-4xl uppercase text-white">Hagarna</h1>
          <hr className="bg-white my-5 w-full" />
        </div>
        <div className="mx-10 sm:mx-20 md:mx-40 lg:mx-60">
          <Breadcrumbs />
        </div>
        <div className="mx-10 sm:mx-20 md:mx-40 lg:mx-60 mb-20 flex flex-col flex-grow md:flex-row flex-wrap">
          <p className="mt-5">
            Stall och gård är inramad av väl tilltagna hagar. Under
            sommarmånaderna krävs under vanliga omständigheter ingen
            stödfodring. Vatten finns att tillgå i nära anslutning till samtliga
            hagar. Under årets mörkare och blötare månader underlättas hästarnas
            vardag av stora grusade entréer. Det finns även planer att anlägga
            totalt 3200kvm helgrusad yta fördelad på 4st vinterhagar att nyttja
            under de mest dystra och blötaste perioderna.
          </p>
        </div>
        <div className="w-full mx-auto">
          <Slide easing="ease" {...properties}>
            {images.map((each, index) => (
              <div
                className="py-56 bg-no-repeat bg-cover bg-center"
                key={index}
                style={{ backgroundImage: `url(${each})` }}
              >
                <span>Slide 1</span>
              </div>
            ))}
          </Slide>
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(index);

