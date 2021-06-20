import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  useLoginMutation,
  UserDocument,
  UserQuery,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

const LoginForm = () => {
  const router = useRouter();
  const [errors, setErrors] = useState({} as any);
  const [login] = useLoginMutation();
  return (
    <Form
      initialValues={{ username: "", password: "" }}
      className="login-form"
      onFinish={async (values: any) => {
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
          } else {
            router.push("/");
          }
        }
        console.log(errors);
      }}
    >
      <Form.Item
        label="Användarnamn"
        name="username"
        rules={[{ required: true, message: "Ange användarnamn" }]}
        validateStatus={errors.username ? "error" : ""}
        help={errors.username}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Lösenord"
        name="password"
        rules={[{ required: true, message: "Ange lösenord" }]}
        validateStatus={errors.password ? "error" : ""}
        help={errors.password}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Logga in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
