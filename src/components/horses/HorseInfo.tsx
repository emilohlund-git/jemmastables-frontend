import { Button } from "antd";
import React, { Key, useState } from "react";
import { SRLWrapper } from "simple-react-lightbox";
import { options } from "../../config/LightBoxConfig";
import { useUpdateHorseMutation } from "../../generated/graphql";
import DeleteImageButton from "./DeleteImageButton";
import ChangeHorseImage from "./form/ChangeHorseImage";
import ChangeHorseImages from "./form/ChangeHorseImages";

const HorseInfo = ({ setEdit, edit, h }: any) => {
  const [loading, setLoading] = useState(false);
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

  return (
    <>
      <div
        onMouseEnter={() => setHover(false)}
        onMouseLeave={() => setHover(true)}
        className="flex flex-col lg:flex-row relative w-full mx-1 lg:mx-40 mt-3"
      >
        <div className="text-xl bg-black mb-2 w-full h-full lg:w-2/3 mr-2">
          <div className="flex flex-col">
            <div className="flex gap-2 text-white">
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
            <div className="flex gap-2 text-white">
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
            <div className="flex gap-2 text-white">
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
            <div className="flex gap-2 text-white">
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
            <div className="flex gap-2 text-white">
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
            <div className="flex gap-2 text-white">
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
            <div className="flex gap-2 text-white">
              {edit ? (
                <Button
                  className="mt-3"
                  type="primary"
                  loading={loading}
                  onClick={async () => {
                    if (
                      values.nickname == h?.nickname &&
                      values.owner == h?.owner &&
                      values.after == h?.after &&
                      (values.birthYear as number) == h?.birthYear &&
                      values.gender == h?.gender &&
                      values.color == h?.color
                    ) {
                      setEdit(false);
                      return;
                    } else {
                      setLoading(true);
                    }
                    const { errors } = await update({
                      variables: {
                        id: h?.id,
                        input: {
                          nickname: values.nickname,
                          owner: values.owner,
                          after: values.after,
                          birthYear: parseInt(values.birthYear),
                          gender: values.gender,
                          color: values.color,
                        },
                      },
                      update: (cache) => {
                        cache.evict({ fieldName: "horseByName" });
                      },
                    });
                    if (!errors) {
                      setLoading(false);
                      setEdit(false);
                    }
                  }}
                >
                  Klar
                </Button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        {!edit ? (
          <div
            className="w-full lg:w-1/1"
            style={{
              backgroundImage: `url(${h?.image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "500px",
            }}
          ></div>
        ) : (
          <ChangeHorseImage horse={h} image={h?.image} />
        )}
      </div>
      <div className="w-full flex mx-1 lg:mx-40 mt-1">
        {edit ? (
          <div className="w-full h-40 flex flex-row flex-wrap">
            {h.images.map((image: string, i: Key) => {
              return (
                <div className="relative w-1/4 cursor-pointer px-1">
                  <ChangeHorseImages image={image} horse={h} />
                  <DeleteImageButton image={image} horse={h} />
                </div>
              );
            })}
          </div>
        ) : (
          <SRLWrapper options={options}>
            <div className="w-full h-44 flex flex-wrap">
              {h.images.map((each: string, index: Key) => (
                <img
                  className="h-full w-1/4 object-cover cursor-pointer px-1 py-1"
                  src={each}
                />
              ))}
            </div>
          </SRLWrapper>
        )}
      </div>
    </>
  );
};

export default HorseInfo;
