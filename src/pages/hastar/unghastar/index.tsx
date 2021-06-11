import React from "react";
import AddHorseForm from "../../../components/AddHorseForm";
import Breadcrumbs from "../../../components/Breadcrumbs";
import FloatingButton from "../../../components/FloatingButton";
import Horse from "../../../components/Horse";
import Layout from "../../../components/Layout";
import Spinner from "../../../components/Spinner";
import {
  useHorsesByCategoryQuery,
  useUserQuery
} from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";
import { withApollo } from "../../../utils/withApollo";

const index = () => {
  const category = "unghästar";

  const { loading: horseLoading, data: horseData } = useHorsesByCategoryQuery({
    variables: { category: category },
  });

  const { loading: userLoading, data: userData } = useUserQuery({
    skip: isServer(),
  });

  let body = null;

  // Data is loading
  if (userLoading) {
    // User is not logged in
  } else if (!userData?.user) {
    // User is logged in
  } else {
    body = <FloatingButton />;
  }

  return (
    <Layout>
      {horseLoading ? (
        <div className="flex justify-center align-middle">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col mt-32 relative text-white w-full z-0">
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
          <div className="flex justify-center">{body}</div>
        </div>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: false })(index);
