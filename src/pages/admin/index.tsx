import Image from "next/image";
import React from "react";
import Layout from "../../components/Layout";
import LoginForm from "../../components/LoginForm";
import { withApollo } from "../../utils/withApollo";

const index = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex justify-center">
            <Image
              className="mx-auto h-12 w-auto"
              src="/images/jemma_stables.png"
              width={200}
              height={100}
            />
          </div>
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(index);
