import React, { useState } from "react";
import AddHorseForm from "../../../components/AddHorseForm";
import Breadcrumbs from "../../../components/Breadcrumbs";
import FloatingButton from "../../../components/FloatingButton";
import Horse from "../../../components/Horse";
import Layout from "../../../components/Layout";
import Spinner from "../../../components/Spinner";
import {
  useHorsesByCategoryQuery,
  useUserQuery,
} from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";
import { withApollo } from "../../../utils/withApollo";

const index = () => {
  const [showModal, setShowModal] = useState();
  const category = "tävlingshästar";

  const { loading: horseLoading, data: horseData } = useHorsesByCategoryQuery({
    variables: { category: category },
  });

  const { loading: userLoading, data: userData } = useUserQuery({
    skip: isServer(),
  });

  return (
    <Layout>
      {horseLoading ? (
        <div className="flex justify-center align-middle z-10">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col mt-32 relative text-white w-full z-10">
          <div className="flex flex-col mx-auto justify-center">
            <h1 className="text-4xl uppercase text-white">{category}</h1>
            <hr className="bg-white my-5 w-full" />
          </div>
          <div className="flex justify-center">
            <Breadcrumbs />
          </div>

          <div className="flex justify-center w-full align-middle">
            <div className="mb-20 flex flex-col md:flex-row flex-wrap justify-center">
              {horseData?.horsesByCategory.map((horse) => {
                return <Horse key={horse.id} h={horse} />;
              })}
            </div>
          </div>
          {!userLoading && userData?.user ? (
            <div className="z-40">
              <FloatingButton
                category={category}
                showModal={showModal}
                setShowModal={setShowModal}
              />
              {showModal ? <AddHorseForm setShowModal={setShowModal} /> : <></>}
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: false })(index);
