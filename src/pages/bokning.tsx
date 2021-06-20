import React from "react";
import Calendar from "../components/calendar/Calendar";
import Layout from "../components/Layout";
import { withApollo } from "../utils/withApollo";

const bokning = () => {
  return (
    <Layout>
      <div className="mt-32 bg-gray-100">
        <Calendar />
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(bokning);
