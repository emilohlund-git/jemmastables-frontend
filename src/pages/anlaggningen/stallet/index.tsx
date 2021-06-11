import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Layout from "../../../components/Layout";
import { withApollo } from "../../../utils/withApollo";

const images = [
  "/images/byggnader/stallet/stallet_utsida.png",
  "/images/byggnader/stallet/stallet_insida.png",
  "/images/byggnader/stallet/stallet_box.png",
];

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
          <h1 className="text-4xl uppercase text-white">Stallet</h1>
          <hr className="bg-white my-5 w-full" />
        </div>
        <div className="mx-10 sm:mx-20 md:mx-40 lg:mx-60">
          <Breadcrumbs />
        </div>
        <div className="mx-10 sm:mx-20 md:mx-40 lg:mx-60 mb-20 flex flex-col flex-grow md:flex-row flex-wrap">
          <p className="mt-5">
            I stallet finns det 9st rymliga boxar gjutna i skalblock med
            boxinredning från Myrby. I samtliga boxar finns det vattenkoppar och
            öppningsbara fönster. Alla golv i boxar, stallgång,
            uppbindningsplats samt spolspilta är beklätt med gummimatta.
            Samtliga belysningsarmaturer är av LED, det finns även en svagare
            kvällsbelysning som används när det ska vara ”lugnt” i stallet.
            Inuti stallet finns det en isolerad sadelkammare bakom säkerhetsdörr
            med digitalt kodlås.
          </p>
          <p className="mt-5">
            I direkt anslutning till stallet finns det en stor nedsänkt
            gödselplatta för enkel bortforsling av gödsel från boxarna. Vägg i
            vägg med stallet finns det en större loge där man packar hö och
            bereder foder åt hästarna.
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

