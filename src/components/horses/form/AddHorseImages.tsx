import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, message, Upload } from "antd";
import React from "react";
import { putStorageItem } from "../../../utils/firebase/putStorageItem";

interface Props {
  setDownloadURLs: React.Dispatch<React.SetStateAction<string[]>>;
  downloadURLs: string[];
  horseName: string;
}

const AddHorseImages = (props: Props) => {
  return (
    <Form.Item
      label={<label style={{ color: "black" }}>Bilder</label>}
      valuePropName="images"
      name="images"
      rules={[{ required: true, message: "Välj hästens bilder" }]}
    >
      <Upload
        accept="image/*"
        multiple={true}
        onChange={async ({ file, fileList }) => {
          if (file.status !== "uploading") {
            const promise = new Promise<string[]>((resolve) => {
              const files = [] as string[];
              fileList.forEach(async (file) => {
                const f = await putStorageItem(
                  file.originFileObj,
                  props.horseName,
                  {
                    contentType: file.type,
                  }
                );
                files.push(f);
              });
              resolve(files);
            });
            const response = await promise;
            props.setDownloadURLs(response);
          } else {
            return;
          }

          /*
          if (file.status === "uploading") {
            return;
          }
          if (file.status === "done") {
            const imageFile = info.file;

            const promise = new Promise<string>((resolve) => {
              resolve(
                putStorageItem(imageFile.originFileObj, props.horseName, {
                  contentType: imageFile.type,
                })
              );
            });

            const response = await promise;
      
            message.success(imageFile.name + " uppladdad!");
            props.setDownloadURLs([...props.downloadURLs, response]);
          }
          */
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
  );
};

export default AddHorseImages;
