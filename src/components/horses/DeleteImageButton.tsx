import { Button, message } from "antd";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Horse, useUpdateHorseMutation } from "../../generated/graphql";
import { Tooltip } from "antd";

interface Props {
  horse: Horse;
  image: string;
}

const DeleteHorseButton = (props: Props) => {
  const [update] = useUpdateHorseMutation();
  return (
    <Tooltip placement="topRight" title="Ta bort bilden">
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
          });
        }}
        className="absolute text-white bg-black mr-1 p-1 top-3 right-3 text-2xl z-40 cursor-pointer"
      />
    </Tooltip>
  );
};

export default DeleteHorseButton;
