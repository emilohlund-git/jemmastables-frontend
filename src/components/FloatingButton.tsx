import { useRouter } from "next/router";
import React from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { Action, Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import {
  useDeleteHorseMutation,
  useHorseByNameQuery,
} from "../generated/graphql";
import { useApolloClient } from "@apollo/client";
import { withApollo } from "../utils/withApollo";

const FloatingButton = () => {
  const apolloClient = useApolloClient();
  const router = useRouter();
  const { name } = router.query;

  const [remove] = useDeleteHorseMutation();
  const { data, loading } = useHorseByNameQuery({
    variables: { name: name as string },
  });

  const handleClick = async () => {
    await remove({
      variables: { id: data?.horseByName?.id || 0 },
      update: (cache) => {
        cache.evict({ id: "Horse:" + data?.horseByName?.id });
      },
    });
    await apolloClient.resetStore();
    router.back();
  };

  return (
    <>
      {name ? (
        <Fab
          alwaysShowTitle={true}
          icon={<FaPlus />}
          mainButtonStyles={{
            color: "black",
            background: "white",
            outline: "none",
          }}
          style={{ bottom: 24, right: 24 }}
        >
          <Action
            style={{ background: "#228B22", outline: "none" }}
            text={`Ändra ${name}`}
          >
            <FaEdit className="text-white" />
          </Action>
          <Action
            style={{ background: "#8b0000", outline: "none" }}
            text={`Ta bort ${name}`}
            onClick={handleClick}
          >
            <FaEdit className="text-white" />
          </Action>
        </Fab>
      ) : (
        <></>
      )}
    </>
  );
};

export default FloatingButton;
