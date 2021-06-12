import React, { Key, useState } from "react";
import { SRLWrapper } from "simple-react-lightbox";
import { useUpdateHorseMutation } from "../../generated/graphql";
import ChangeHorseImage from "./form/ChangeHorseImage";
import ChangeHorseImages from "./form/ChangeHorseImages";

const HorseInfo = ({ setEdit, edit, h }: any) => {
  const [hover, setHover] = useState(true);
  const [update] = useUpdateHorseMutation();
  const [values, setValues] = useState({
    nickname: h?.nickname,
    owner: h?.owner,
    after: h?.after,
    birthYear: h?.birthYear,
    gender: h?.gender,
    color: h?.color,
  });

  const images = h.images.map((image: string, i: Key) => {
    return (
      <img
        key={i}
        src={image}
        className="h-full w-1/4 flex object-cover cursor-pointer px-1 mt-1"
        alt={h?.name}
      />
    );
  });

  return (
    <>
      <div
        onMouseEnter={() => setHover(false)}
        onMouseLeave={() => setHover(true)}
        className="flex relative w-full mx-40 mt-3"
      >
        <div className="text-xl bg-black bg-opacity-60 mb-2 rounded-lg w-2/3">
          <div className="flex flex-col">
            <div className="flex gap-2">
              <p>Smeknamn:</p>{" "}
              {!edit ? (
                h?.nickname
              ) : (
                <input
                  className="text-white bg-black border-b-2 outline-none w-full mr-2"
                  id="h-owner"
                  type="text"
                  value={values.nickname}
                  onChange={(e) =>
                    setValues({ ...values, nickname: e.target.value })
                  }
                />
              )}
            </div>
            <div className="flex gap-2">
              <p>Ägare:</p>{" "}
              {!edit ? (
                h?.owner
              ) : (
                <input
                  className="text-white bg-black border-b-2 outline-none w-full mr-2"
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
                  className="text-white bg-black border-b-2 outline-none w-full mr-2"
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
                  className="text-white bg-black border-b-2 outline-none w-full mr-2"
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
                  className="text-white bg-black border-b-2 outline-none w-full mr-2"
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
                  className="text-white bg-black border-b-2 outline-none w-full mr-2"
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
                        input: {
                          name: h?.name,
                          nickname: h?.nickname,
                          owner: values.owner,
                          after: values.after,
                          birthYear: parseInt(values.birthYear),
                          gender: values.gender,
                          color: values.color,
                          image: h?.image,
                        },
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
        {!edit ? (
          <div
            className="w-1/3"
            style={{
              backgroundImage: `url(${h?.image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "500px",
              width: "30vw",
            }}
          ></div>
        ) : (
          <ChangeHorseImage horse={h} image={h?.image} />
        )}
      </div>
      <div className="w-full flex flex-row mx-40 mt-1">
        {edit ? (
          h.images.map((image: string, i: Key) => {
            return <ChangeHorseImages key={i} image={image} horse={h} />;
          })
        ) : (
          <SRLWrapper>
            <div className="relative w-full flex flex-row overflow-hidden h-40">
              {images}
            </div>
          </SRLWrapper>
        )}
      </div>
    </>
  );
};

export default HorseInfo;
