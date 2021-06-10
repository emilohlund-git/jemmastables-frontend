import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Horse from "../../../components/Horse";
import Layout from "../../../components/Layout";
import Spinner from "../../../components/Spinner";
import {
  useCreateHorseMutation,
  useHorsesByCategoryQuery,
  useUserQuery,
} from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";
import { withApollo } from "../../../utils/withApollo";

const index = () => {
  const router = useRouter();

  const [create] = useCreateHorseMutation();

  const fields = [
    "name",
    "nickname",
    "owner",
    "after",
    "birthYear",
    "gender",
    "color",
    "image",
  ];

  const fields_swe = [
    "namn",
    "smeknamn",
    "ägare",
    "efter",
    "födelseår",
    "kön",
    "färg",
    "bild",
  ];

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
    body = (
      <Formik
        initialValues={{
          name: "",
          nickname: "",
          owner: "",
          after: "",
          birthYear: 2020,
          gender: "",
          color: "",
          image: "",
          category: "tävlingshästar",
        }}
        onSubmit={async (values) => {
          const response = await create({
            variables: { input: values },
            update: (cache, { data }) => {
              cache.evict({ fieldName: "horses:{}" });
            },
          });
          if (response.data?.createHorse) {
            // worked
            router.reload();
          }
        }}
      >
        {({}) => (
          <Form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              {fields.map((field, i) => {
                return (
                  <div className="py-1" key={field}>
                    <label htmlFor={field} className="sr-only">
                      {field}
                    </label>

                    <Field
                      name={field}
                      placeholder={fields_swe[i]}
                      label={field}
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                      type="text"
                    />
                  </div>
                );
              })}
              <div className="py-1">
                <label htmlFor="category" className="sr-only">
                  category
                </label>
                <Field
                  className="text-black w-44 h-10 pl-2"
                  as="select"
                  name="category"
                >
                  <option value="unghästar">Unghästar</option>
                  <option value="tävlingshästar">Tävlingshästar</option>
                  <option value="avelsto">Avelsto</option>
                </Field>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Lägg till häst
              </button>
            </div>
            <div className="text-black"></div>
          </Form>
        )}
      </Formik>
    );
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
            <h1 className="text-4xl uppercase">{category}</h1>
            <hr className="bg-white my-5 w-full" />
          </div>
          <div className="flex justify-center">
            <Breadcrumbs />
          </div>

          <div className="flex justify-center w-full align-middle">
            <div className="mb-20 flex flex-col md:flex-row flex-wrap">
              {horseData?.horsesByCategory.map((horse) => {
                return <Horse key={horse.id} h={horse} />;
              })}
            </div>
          </div>
          <div className="flex justify-center mx-20">{body}</div>
        </div>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: true })(index);
