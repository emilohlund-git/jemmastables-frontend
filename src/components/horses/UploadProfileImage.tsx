import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import React, { useState } from "react";
import { putStorageItem } from "../../utils/firebase/putStorageItem";


interface Props {
    horseName: string,
    setProfileImage: React.Dispatch<React.SetStateAction<string>>,
    profileImage: string
}

const UploadProfileImage = (props: Props) => {
  const [loading, setLoading] = useState(false);

  return (
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
            props.horseName,
            {
              contentType: imageFile.type,
            }
          );
          props.setProfileImage(response);
          setLoading(false);
          message.success(info.file.name + " uppladdad!");
        }
      }}
    >
      {props.profileImage ? (
        <img
          src={props.profileImage}
          alt="avatar"
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div className="mt-2">Ladda upp</div>
        </div>
      )}
    </Upload>
  );
};

export default UploadProfileImage;
