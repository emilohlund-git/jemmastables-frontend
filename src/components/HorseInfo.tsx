import React, { useState } from "react";
import { useUpdateHorseMutation } from "../generated/graphql";

const HorseInfo = ({ setEdit, edit, h }: any) => {
  const [hover, setHover] = useState(true);
  const [update] = useUpdateHorseMutation();
  const [values, setValues] = useState({
    owner: h?.owner,
    after: h?.after,
    birthYear: h?.birthYear,
    gender: h?.gender,
    color: h?.color,
  });

  return (
    <div
      onMouseEnter={() => setHover(false)}
      onMouseLeave={() => setHover(true)}
      className="flex flex-row relative px-1"
    >
      <div
        className="w-1/3"
        style={{
          backgroundImage: `url(${h?.image})`,
          backgroundSize: "cover",
          height: "500px",
          width: "30vw",
        }}
      ></div>
      <div className="ml-5 text-xl">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <p>Ägare:</p>{" "}
            {!edit ? (
              h?.owner
            ) : (
              <input
                className="text-white bg-black outline-none"
                id="h-owner"
                type="text"
                value={values.owner}
                onChange={(e) =>
                  setValues({ ...values, owner: e.target.value })
                }
              />
            )}
          </div>
          <div className="flex gap-2">
            <p>Efter:</p>{" "}
            {!edit ? (
              h?.after
            ) : (
              <input
                className="text-white bg-black outline-none"
                id="h-after"
                type="text"
                value={values.after}
                onChange={(e) =>
                  setValues({ ...values, after: e.target.value })
                }
              />
            )}
          </div>
          <div className="flex gap-2">
            <p>Födelseår:</p>{" "}
            {!edit ? (
              h?.birthYear
            ) : (
              <input
                className="text-white bg-black outline-none"
                type="number"
                id="h-birthYear"
                value={values.birthYear}
                onChange={(e) =>
                  setValues({ ...values, birthYear: e.target.value })
                }
              />
            )}
          </div>
          <div className="flex gap-2">
            <p>Kön:</p>{" "}
            {!edit ? (
              h?.gender
            ) : (
              <input
                className="text-white bg-black outline-none"
                id="h-gender"
                type="text"
                value={values.gender}
                onChange={(e) =>
                  setValues({ ...values, gender: e.target.value })
                }
              />
            )}
          </div>
          <div className="flex gap-2">
            <p>Färg:</p>{" "}
            {!edit ? (
              h?.color
            ) : (
              <input
                className="text-white bg-black outline-none"
                id="h-color"
                type="text"
                value={values.color}
                onChange={(e) =>
                  setValues({ ...values, color: e.target.value })
                }
              />
            )}
          </div>
          <div className="flex gap-2">
            {edit ? (
              <button
                className="bg-white text-black px-5 py-1 mt-3"
                onClick={async () => {
                  setEdit(false);
                  const response = await update({
                    variables: {
                      id: h?.id,
                      name: h?.name,
                      nickname: h?.nickname,
                      owner: values.owner,
                      after: values.after,
                      birthYear: parseInt(values.birthYear),
                      gender: values.gender,
                      color: values.color,
                      image: h?.image
                    },
                  });
                  console.log(response);
                }}
              >
                Klar
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorseInfo;
