import { useApolloClient } from "@apollo/client";
import { Upload, message } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { FaEdit, FaPlus, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { Action, Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import {
  useDeleteHorseMutation,
  useHorseByNameQuery,
  useUpdateHorseMutation,
} from "../generated/graphql";
import { putStorageItem } from "../utils/firebase/putStorageItem";

const FloatingButtonHorse = ({ category, setEdit }: any) => {
  const apolloClient = useApolloClient();
  const router = useRouter();
  const { name } = router.query;

  const [remove] = useDeleteHorseMutation();

  const { data, loading } = useHorseByNameQuery({
    variables: { name: name as string },
  });

  const [update] = useUpdateHorseMutation();

  const handleClick = async () => {
    if (!category) {
      await remove({
        variables: { id: data?.horseByName?.id || 0 },
        update: (cache) => {
          cache.evict({ id: "Horse:" + data?.horseByName?.id });
        },
      });
      await apolloClient.resetStore();
      router.back();
    }
  };

  return (
    <Fab
      alwaysShowTitle={true}
      icon={<FaPlus />}
      mainButtonStyles={{
        color: "black",
        background: "white",
        outline: "none",
      }}
      style={{ bottom: 24, right: 24, zIndex: 1000 }}
    >
      <Action
        style={{ background: "#228B22", outline: "none", paddingTop: "3px" }}
        text={`Lägg till bild`}
      >
        <Upload
          accept="image/*"
          showUploadList={false}
          multiple={false}
          onChange={async (info) => {
            if (info.file.status === "uploading") {
              return;
            }
            if (info.file.status === "done") {
              if (data?.horseByName) {
                const imageFile = info.file;
                const response = await putStorageItem(
                  imageFile.originFileObj,
                  name as string,
                  {
                    contentType: imageFile.type,
                  }
                );
                await update({
                  variables: {
                    id: data!.horseByName!.id,
                    input: {
                      images: [...data!.horseByName!.images!, response],
                    },
                  },
                  update: (cache) => {
                    cache.evict({ fieldName: "horseByName" });
                  },
                });
                message.success(imageFile.name + " uppladdad!");
              }
            }
          }}
        >
          <FaPlusCircle className="text-white mt-1 text-lg" />
        </Upload>
      </Action>
      <Action
        style={{ background: "#228B22", outline: "none" }}
        text={`Ändra ${name}`}
        onClick={() => setEdit(true)}
      >
        <FaEdit className="text-white" />
      </Action>
      <Action
        style={{ background: "#8b0000", outline: "none" }}
        text={`Ta bort ${name}`}
        onClick={handleClick}
      >
        <FaTrashAlt className="text-white" />
      </Action>
    </Fab>
  );
};

export default FloatingButtonHorse;
