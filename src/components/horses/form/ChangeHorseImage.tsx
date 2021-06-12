import { Upload } from "antd";
import React, { useState } from "react";
import { Horse, useUpdateHorseMutation } from "../../../generated/graphql";
import { putStorageItem } from "../../../utils/firebase/putStorageItem";
import { FaCross } from "react-icons/fa";

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
            update: (cache) => {
              cache.evict({ fieldName: "horseByName" });
            },
          });
          console.log(response);
        } else {
          return;
        }
      }}
    >
      <div
        className="w-full lg:w-1/1 border-2 border-dashed"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "500px",
          width: "28.1vw",
        }}
      ></div>
    </Upload>
  );
};

export default ChangeHorseImage;
