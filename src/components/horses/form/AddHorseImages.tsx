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
        onChange={async (info) => {
          if (info.file.status === "uploading") {
            return;
          }
          if (info.file.status === "done") {
            const imageFile = info.file;
            const response = await putStorageItem(
              imageFile.originFileObj,
              props.horseName,
              {
                contentType: imageFile.type,
              }
            );
            message.success(imageFile.name + " uppladdad!");
            props.setDownloadURLs([...props.downloadURLs, response]);
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
  );
};

export default AddHorseImages;
