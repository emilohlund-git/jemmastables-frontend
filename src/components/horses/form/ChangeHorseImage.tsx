import { Upload } from "antd";
import React, { useState } from "react";
import { Horse, useUpdateHorseMutation } from "../../../generated/graphql";
import { putStorageItem } from "../../../utils/firebase/putStorageItem";

interface Props {
  image: string;
  horse: Horse;
}

const ChangeHorseImage = (props: Props) => {
  const [update] = useUpdateHorseMutation();
  const [image, setImage] = useState(props.image);
  return (
    <Upload
      name="avatar"
      showUploadList={false}
      onChange={async (info) => {
        if (info.file.status === "done") {
          const URL = await putStorageItem(
            info.file.originFileObj,
            props.horse.name,
            {
              "contentType:": info.file.type,
            }
          );
          setImage(URL);

          const response = await update({
            variables: {
              id: props.horse.id,
              input: {
                image: URL,
              },
            },
          });
          console.log(response);
        } else {
          return;
        }
      }}
    >
      <div
        className="w-1/3 border-2 border-dashed p-2"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "500px",
          width: "23vw",
        }}
      ></div>
    </Upload>
  );
};

export default ChangeHorseImage;
