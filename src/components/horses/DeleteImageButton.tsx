import { message } from "antd";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Horse, useUpdateHorseMutation } from "../../generated/graphql";

interface Props {
  horse: Horse;
  image: string;
}

const DeleteHorseButton = (props: Props) => {
  const [update] = useUpdateHorseMutation();
  return (
    <FaTrashAlt
      onClick={async () => {
        const new_arr = props.horse.images?.filter(
          (image) => image !== props.image && image !== ""
        );

        await update({
          variables: {
            id: props.horse.id,
            input: {
              images: new_arr,
            },
          },
          update: (cache) => {
            cache.evict({ fieldName: "horseByName" });
          },
        }).then(() => {
            message.success("Bild borttagen!");
        })
      }}
      className="absolute text-red-500 top-3 right-3 text-2xl z-40 cursor-pointer"
    />
  );
};

export default DeleteHorseButton;
