import { Button, Form, Input, InputNumber, message, Select } from "antd";
import React, { useState } from "react";
import { HorseInput, useCreateHorseMutation } from "../../../generated/graphql";
import UploadProfileImage from "../UploadProfileImage";
import AddHorseImages from "./AddHorseImages";

const AddHorseForm = ({ setShowModal }: any) => {
  const [create] = useCreateHorseMutation();
  const [horseName, setHorseName] = useState("");
  const [downloadURLs, setDownloadURLs] = useState([] as string[]);
  const [profileImage, setProfileImage] = useState("");

  return (
    <div className="fixed flex justify-center top-0 align-middle w-full bg-black bg-opacity-80 z-40 h-screen">
      <Form
        layout="vertical"
        className="absolute top-40 text-white rounded-lg bg-white p-10 overflow-y-scroll w-full h-3/4 lg:w-1/3 lg:h-2/3 z-40 overscroll-contain"
        onFinish={async (values: HorseInput) => {
          values.image = profileImage;
          values.images = downloadURLs;

          const { errors } = await create({
            variables: { input: values },
            update: (cache) => {
              cache.evict({ fieldName: "horsesByCategory" });
            },
          });

          if (errors) {
            console.log(errors);
          }

          if (!errors) {
            setShowModal(false);
          } else {
            message.error(errors);
          }
        }}
      >
        <h1 className="text-2xl mb-6 font-bold">Lägg till häst</h1>
        <Form.Item
          label={<label style={{ color: "black" }}>Namn</label>}
          name="name"
          rules={[{ required: true, message: "Ange hästens namn" }]}
        >
          <Input
            onChange={(e) => {
              setHorseName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "black" }}>Smeknamn</label>}
          name="nickname"
          rules={[{ required: true, message: "Ange hästens smeknamn" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "black" }}>Ägare</label>}
          name="owner"
          rules={[{ required: true, message: "Ange hästens ägare" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "black" }}>Efter</label>}
          name="after"
          rules={[{ required: true, message: "Ange hästens ursprung" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "black" }}>Födelseår</label>}
          name="birthYear"
          rules={[{ required: true, message: "Ange hästens födelseår" }]}
        >
          <InputNumber min={1980} className="w-full" />
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "black" }}>Kön</label>}
          name="gender"
          rules={[{ required: true, message: "Ange hästens kön" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "black" }}>Färg</label>}
          name="color"
          rules={[{ required: true, message: "Ange hästens färg" }]}
        >
          <Input />
        </Form.Item>
        <UploadProfileImage
          horseName={horseName}
          setProfileImage={setProfileImage}
          profileImage={profileImage}
        />
        <AddHorseImages
          horseName={horseName}
          setDownloadURLs={setDownloadURLs}
          downloadURLs={downloadURLs}
        />
        <Form.Item
          label={<label style={{ color: "black" }}>Kategori</label>}
          name="category"
          rules={[{ required: true, message: "Ange hästens kategori" }]}
        >
          <Select placeholder="Välj kategori">
            <Select.Option value="avelsto">Avelsto</Select.Option>
            <Select.Option value="unghästar">Unghästar</Select.Option>
            <Select.Option value="tävlingshästar">Tävlingshästar</Select.Option>
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
