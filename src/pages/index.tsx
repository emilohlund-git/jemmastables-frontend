import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Layout from "../components/Layout";
import { VideoPlayer } from "../components/VideoPlayer";
import responsive from "../config/responsive";
import { withApollo } from "../utils/withApollo";

const index = () => {
  return (
    <Layout>
      <div className="mt-20 relative text-center text-white w-full">
        <VideoPlayer source="/videos/maja.mp4" />
        <Carousel
          responsive={responsive}
          className="flex justify-center items-center"
        >
          <div className="flex justify-center h-52 items-center">
            <Image
              src="/images/partners/horse_partner.png"
              className="filter grayscale invert"
              width={110}
              height={100}
              alt=""
            />
          </div>
          <div className="flex justify-center h-52 items-center">
            <Image
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
        </Carousel>
        <div className="mx-10 sm:mx-10 md:mx-20 lg:mx-60 lg:mt-20 lg:mb-20">
          <div className="md:flex md:flex-row">
            <div className="md:flex md:flex-col lg:w-3/4 lg:align-middle lg:justify-center">
              <div className="mx-6 text-justify md:flex md:flex-col lg:justify-center">
                <h2 className="text-center text-4xl mb-8 font-bold uppercase">
                  VÄLKOMMEN
                </h2>
                <p className="text-lg">
                  Mittemellan Halmstad och Laholms kommun hittar ni en småort
                  som heter Öringe, i utkanten av det lilla samhället har det
                  byggts upp en hästgård som sedan mitten av 2018 bedrivs av
                  JEMMA Stables. På gården bor och arbetar John, Eva, Maja,
                  Magnus och Adam (ej bosatt men finns i krokarna).
                </p>

                <p className="text-lg">
                  Dessa namn skapar akronymet JEMMA – så enkelt är det.
                </p>
              </div>
              <div className="mt-10 mx-6 text-justify">
                <h2 className="text-center text-4xl mb-8 font-bold uppercase">
                  Vad gör vi?
                </h2>
                <p className="text-lg">
                  Förutom att leva vanliga familjeliv och ha ett arbetsliv
                  utanför stallet så bedrivs en verksamhet som bland annat
                  innefattar uppfödning och utbildning av unghästar,
                  inackordering, utbildning av tävlingshästar (markarbete och
                  hoppning), träningar (hoppning), försäljning av hästar samt
                  försäljning av eget hösilage som odlas på markerna runt
                  gården.
                </p>

                <p className="text-lg">
                  Det tål att förtydligas att det är det första M:et i JEMMA,
                  dvs Maja som rider och utbildar hästar och andra ryttare.
                </p>
              </div>
            </div>
            <div className="md:flex lg:align-middle lg:justify-center relative">
              <Image
                src="/images/jemma_stables_drönarbild.png"
                className="filter grayscale hover:filter-none transition-all"
                width={1020}
                height={1020}
                alt=""
              />
            </div>
          </div>
        </div>
        {/*Other Page Content*/}
        {/*<InstagramFeed instagramPosts={instagramPosts} />*/}
      </div>
    </Layout>
  );
};

export default withApollo()(index);
