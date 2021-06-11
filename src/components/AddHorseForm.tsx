import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCreateHorseMutation } from "../generated/graphql";
import firebase from "../firebase/firebase";

const AddHorseForm = ({ setShowModal }: any) => {
  const { Option } = Select;
  const router = useRouter();
  const [create] = useCreateHorseMutation();
  const [horseName, setHorseName] = useState("");

  //Handle waiting to upload each file using promise
  function putStorageItem(item: any, folderName: string, metadata: any) {
    // the return value will be a Promise
    return firebase
      .storage()
      .ref(folderName + "/" + item.name)
      .put(item, metadata)
      .then((snapshot) => {
      })
      .catch((error) => {
        message.error("Error");
      });
  }

  return (
    <div className="fixed flex justify-center align-middle top-1/4 w-full bg-black bg-opacity-80 z-40 h-screen overscroll-contain">
      <Form
        layout="vertical"
        initialValues={{
          name: "1",
          nickname: "1",
          owner: "1",
          after: "1",
          birthYear: null,
          gender: "1",
          color: "1",
          category: "1",
        }}
        className="text-white rounded-lg bg-white p-10 overflow-y-scroll w-full h-3/4 lg:w-1/3 lg:h-2/3 z-40"
        onFinish={async (values: any) => {
          const result = new Promise((resolve) => {
            const storage = firebase.storage();
            const storageRef = storage.ref();
            const imagesRef = storageRef.child(values.name);

            imagesRef.listAll().then(async (res) => {
              res.items.forEach(async (item, index) => {
                if (index == 0) {
                  const imageName = await item.getDownloadURL();
                  resolve(imageName);
                }
              });
            });
          });

          values.image = await result;

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
        <Form.Item
          label={<label style={{ color: "black" }}>Bilder</label>}
          name="image"
          rules={[{ required: true, message: "Välj hästens bilder" }]}
        >
          <Upload
            accept="image/*"
            multiple={true}
            onChange={async (info) => {
              if (horseName) {
                if (info.file.status === "uploading") {
                  return;
                }
                if (info.file.status === "done") {
                  for (var i = 0; i < info.fileList.length; i++) {
                    var imageFile = info.fileList[i];
                    await putStorageItem(imageFile.originFileObj, horseName, {
                      contentType: imageFile.type,
                    });
                  }
                  message.success(info.file.name + " uppladdad!");
                }
              } else {
                message.error("Välj hästnamn först");
              }
            }}
          >
            <Button
              icon={<UploadOutlined />}
              style={{ display: "flex", verticalAlign: "middle" }}
            >
              Lägg till bilder
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "black" }}>Kategori</label>}
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
