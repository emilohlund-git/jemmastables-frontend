import { useRouter } from "next/router";
import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import FloatingButton from "../../../components/FloatingButton";
import HorseInfo from "../../../components/HorseInfo";
import Layout from "../../../components/Layout";
import Spinner from "../../../components/Spinner";
import { useHorseByNameQuery, useUserQuery } from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";
import { withApollo } from "../../../utils/withApollo";

const index = () => {
  const router = useRouter();
  const { name } = router.query;
  const { loading: horseLoading, data: horseData } = useHorseByNameQuery({
    variables: { name: name as string },
  });

  const { loading, data: userData } = useUserQuery({
    skip: isServer(),
  });

  return (
    <Layout>
      <div className="flex flex-col mt-32 relative text-white w-full z-0">
        {horseLoading ? (
          <div className="flex justify-center align-middle">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="flex flex-col mx-auto justify-center">
              <h1 className="text-4xl uppercase">
                {horseData?.horseByName?.name}
              </h1>
              <hr className="bg-white my-5 w-full" />
              <p className="text-center">
                '{horseData?.horseByName?.nickname}'
              </p>
            </div>
            <div className="mx-10 sm:mx-20 md:mx-40 lg:mx-60">
              <Breadcrumbs />
            </div>

            <div className="mx-10 sm:mx-20 md:mx-40 lg:mx-60 mb-20 flex flex-col flex-grow md:flex-row flex-wrap">
              <HorseInfo h={horseData?.horseByName} />
            </div>
            {!loading && userData?.user ? <FloatingButton /> : <></>}
          </>
        )}
      </div>
    </Layout>
  );
};

export default withApollo({ssr: true})(index);