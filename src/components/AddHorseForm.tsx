import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Upload,
} from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import firebase from "../firebase/firebase";
import { HorseInput, useCreateHorseMutation } from "../generated/graphql";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const AddHorseForm = ({ setShowModal }: any) => {
  const router = useRouter();
  const [create] = useCreateHorseMutation();
  const [horseName, setHorseName] = useState("");
  const [downloadURLs, setDownloadURLs] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(false);

  //Handle waiting to upload each file using promise
  function putStorageItem(item: any, folderName: string, metadata: any) {
    // the return value will be a Promise
    return firebase
      .storage()
      .ref(folderName + "/" + item.name)
      .put(item, metadata)
      .then(async (snapshot) => {
        const URL = new Promise<string>(async (res) => {
          res(await snapshot.ref.getDownloadURL());
        });
        const promise = await URL;
        return promise;
      })
      .catch((error) => {
        message.error("Error");
      });
  }

  return (
    <div className="fixed flex justify-center align-middle top-1/4 translate-y-1/3 lg:top-1/4 w-full bg-black bg-opacity-80 z-40 h-screen overscroll-contain">
      <Form
        layout="vertical"
        className="text-white rounded-lg bg-white p-10 overflow-y-scroll w-full h-3/4 lg:w-1/3 lg:h-2/3 z-40"
        onFinish={async (values: HorseInput) => {
          values.image = profileImage;
          values.images = downloadURLs;

          const { errors } = await create({
            variables: { input: values },
            update: (cache) => {
              cache.evict({ fieldName: "horses:{}" });
            },
          });

          if (errors) {
            console.log(errors);
          }

          if (!errors) {
            setShowModal(false);
            router.reload();
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
        <Form.Item
          label={<label style={{ color: "black" }}>Profilbild</label>}
          valuePropName="image"
          name="image"
          rules={[{ required: true, message: "Välj hästens profilbild" }]}
        >
          <Upload
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={async (info) => {
              if (info.file.status === "uploading") {
                setLoading(true);
                return;
              }
              if (info.file.status === "done") {
                var imageFile = info.file;
                const response = await putStorageItem(
                  imageFile.originFileObj,
                  horseName,
                  {
                    contentType: imageFile.type,
                  }
                );
                setProfileImage(response);
                setLoading(false);
                message.success(info.file.name + " uppladdad!");
              }
            }}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="avatar"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="mt-2">Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "black" }}>Bilder</label>}
          valuePropName="images"
          name="images"
          rules={[{ required: true, message: "Välj hästens bilder" }]}
        >
          <Upload
            accept="image/*"
            multiple={true}
            onChange={async (info) => {
              if (info.file.status === "uploading") {
                return;
              }
              if (info.file.status === "done") {
                var imageFile = info.file;
                const response = await putStorageItem(
                  imageFile.originFileObj,
                  horseName,
                  {
                    contentType: imageFile.type,
                  }
                );
                setDownloadURLs((downloadURLs) => [...downloadURLs, response]);
                message.success(info.file.name + " uppladdad!");
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
