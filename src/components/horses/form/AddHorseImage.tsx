import { Upload, message, Form } from "antd";
import React from "react";
import { Horse, useUpdateHorseMutation } from "../../../generated/graphql";
import { putStorageItem } from "../../../utils/firebase/putStorageItem";

interface Props {
  horse: Horse;
}

const AddHorseImage = (props: Props) => {
  const [update] = useUpdateHorseMutation();

  return (
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
          if (info.file.status === "done") {
            var imageFile = info.file;
            const response = await putStorageItem(
              imageFile.originFileObj,
              props.horse?.name,
              {
                contentType: imageFile.type,
              }
            );
            await update({
              variables: {
                id: props.horse?.id,
                input: {
                  images: [...props.horse.images!, response],
                },
              }
            });
            message.success(info.file.name + " uppladdad!");
          }
        }}
      ></Upload>
    </Form.Item>
  );
};

export default AddHorseImage;
