import { Button, Form, Input, InputNumber, Select } from "antd";
import { useRouter } from "next/router";
import React from "react";
import {
  useCreateHorseMutation
} from "../generated/graphql";

const AddHorseForm = ({ setShowModal }: any) => {
  const { Option } = Select;
  const router = useRouter();
  const [create] = useCreateHorseMutation();

  return (
    <div className="absolute flex justify-center w-full bg-black bg-opacity-80 z-40 h-screen overscroll-contain">
      <Form
        layout="vertical"
        initialValues={{
          name: "",
          nickname: "",
          owner: "",
          after: "",
          birthYear: null,
          gender: "",
          color: "",
          image: "",
          category: "tävlingshästar",
        }}
        style={{ height: "60vh", width: "30vw" }}
        className="text-white overflow-y-scroll"
        onFinish={async (values: any) => {
          const { errors } = await create({
            variables: { input: values },
            update: (cache) => {
              cache.evict({ fieldName: "horses:{}" });
            },
          });
          if (!errors) {
            setShowModal(false);
            router.reload();
          }
        }}
      >
        <Form.Item
          label={<label style={{ color: "white" }}>Namn</label>}
          name="name"
          rules={[{ required: true, message: "Ange hästens namn" }]}
          className="text-white"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "white" }}>Smeknamn</label>}
          name="nickname"
          rules={[{ required: true, message: "Ange hästens smeknamn" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "white" }}>Ägare</label>}
          name="owner"
          rules={[{ required: true, message: "Ange hästens ägare" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "white" }}>Efter</label>}
          name="after"
          rules={[{ required: true, message: "Ange hästens ursprung" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "white" }}>Födelseår</label>}
          name="birthYear"
          rules={[{ required: true, message: "Ange hästens födelseår" }]}
        >
          <InputNumber min={1980} className="w-full" />
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "white" }}>Kön</label>}
          name="gender"
          rules={[{ required: true, message: "Ange hästens kön" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "white" }}>Färg</label>}
          name="color"
          rules={[{ required: true, message: "Ange hästens färg" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "white" }}>Bild</label>}
          name="image"
          rules={[{ required: true, message: "Ange hästens profilbild" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "white" }}>Kategori</label>}
          name="category"
          rules={[{ required: true, message: "Ange hästens kategori" }]}
        >
          <Select placeholder="Välj kategori">
            <Option value="avelsto">Avelsto</Option>
            <Option value="unghästar">Unghästar</Option>
            <Option value="tävlingshästar">Tävlingshästar</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            className="w-full bg-black text-white border-0"
            type="primary"
            htmlType="submit"
          >
            Spara
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddHorseForm;
