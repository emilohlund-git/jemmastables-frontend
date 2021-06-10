import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = (props) => {
  return (
    <>
      <div className="bg-black text-white px-10 sm:px-20 md:px-40 lg:flex lg:flex-col lg:px-60">
        <div className="py-10 text-white lg:text-left flex flex-row w-full justify-center">
          <Image
            src="/images/Jemma_stable_logo_vit.png"
            width={150}
            height={150}
            alt=""
          />
        </div>
        <div className="flex justify-center">
          <ul className="flex flex-row gap-5">
            <li>
              <Link href="/">
                <a>Om oss</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Bokning</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Integritetspolicy</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-center mt-5 mb-10">
          <p>© 2020 Jemma Stables. All rights reserved</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
