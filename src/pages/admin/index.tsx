import { Field, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import {
  useLoginMutation,
  UserDocument,
  UserQuery,
} from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { withApollo } from "../../utils/withApollo";

const index = () => {
  const router = useRouter();

  const [login] = useLoginMutation();

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
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await login({
                variables: { options: values },
                update: (cache, { data }) => {
                  cache.writeQuery<UserQuery>({
                    query: UserDocument,
                    data: {
                      __typename: "Query",
                      user: data?.login.user,
                    },
                  });
                  cache.evict({ fieldName: "horses:{}" });
                },
              });
              if (response.data?.login.errors) {
                setErrors(toErrorMap(response.data.login.errors));
              } else if (response.data?.login.user) {
                if (typeof router.query.next === "string") {
                  // router.push(router.query.next);
                } else {
                  // worked
                  router.push("/");
                  // dispatch(signIn());
                }
              }
            }}
          >
            {({ errors }) => (
              <Form className="mt-8 space-y-6">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="username" className="sr-only">
                      Användarnamn
                    </label>
                    <Field
                      name="username"
                      placeholder="username"
                      label="username"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                      type="username"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Lösenord
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                      placeholder="Lösenord"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                    Logga in
                  </button>
                </div>
                <div className="text-black">
                  {errors.username}
                  {errors.password}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(index);
