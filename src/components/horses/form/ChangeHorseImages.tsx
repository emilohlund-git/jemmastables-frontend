import { Upload } from "antd";
import React, { useState } from "react";
import { Horse, useUpdateHorseMutation } from "../../../generated/graphql";
import { putStorageItem } from "../../../utils/firebase/putStorageItem";

interface Props {
  image: string;
  horse: Horse;
}

const ChangeHorseImages = (props: Props) => {
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

          const new_arr = props.horse.images?.filter(
            (image) => image !== props.image && image !== ""
          );

          const response = await update({
            variables: {
              id: props.horse.id,
              input: {
                images: [...new_arr!, URL].filter(
                  (v, i, a) => a.indexOf(v) === i
                ),
              },
            },
          });
          console.log(response);
        } else {
          return;
        }
      }}
    >
      <div className="relative w-full flex flex-row overflow-hidden h-40 border-2 border-dashed">
        <img
          src={image}
          className="h-full w-full flex object-cover cursor-pointer mx-1 mt-1"
        />
      </div>
    </Upload>
  );
};

export default ChangeHorseImages;
