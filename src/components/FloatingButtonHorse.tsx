import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useApolloClient } from "@apollo/client";
import { message, Upload } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { Action, Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import {
  useDeleteHorseMutation,
  useHorseByNameQuery,
  useUpdateHorseMutation
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
    <>
      <Fab
        alwaysShowTitle={true}
        icon={<PlusOutlined />}
        mainButtonStyles={{
          color: "black",
          background: "white",
          outline: "none",
        }}
        style={{ bottom: 24, right: 24, zIndex: 1000 }}
      >
        <Action
          style={{ background: "#228B22", outline: "none" }}
          text={`Lägg till bild`}
          onClick={() => {
            console.log(document.getElementById("imageupload"));
            const imageUpload = document.querySelector("input[type='file']") as HTMLInputElement;
            imageUpload.click();
          }}
        >
          <PlusOutlined className="text-white" />
          <Upload
            accept="image/*"
            id="imageupload"
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
          ></Upload>
        </Action>
        <Action
          style={{ background: "#228B22", outline: "none" }}
          text={`Ändra ${name}`}
          onClick={() => setEdit(true)}
        >
          <EditOutlined className="text-white" />
        </Action>
        <Action
          style={{ background: "#8b0000", outline: "none" }}
          text={`Ta bort ${name}`}
          onClick={handleClick}
        >
          <DeleteOutlined className="text-white" />
        </Action>
      </Fab>
    </>
  );
};

export default FloatingButtonHorse;
