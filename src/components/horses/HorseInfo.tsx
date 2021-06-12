import React, { Key, useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { SRLWrapper } from "simple-react-lightbox";
import { useUpdateHorseMutation } from "../../generated/graphql";
import DeleteHorseButton from "./DeleteImageButton";
import ChangeHorseImage from "./form/ChangeHorseImage";
import ChangeHorseImages from "./form/ChangeHorseImages";

const HorseInfo = ({ setEdit, edit, h }: any) => {
  const properties = {
    duration: 2000,
    transitionDuration: 500,
    infinite: true,
    prevArrow: <></>,
    nextArrow: <></>,
  };

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
                <button
                  className="bg-white text-black px-5 py-1 mt-3"
                  onClick={async () => {
                    setEdit(false);
                    const response = await update({
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
      <div className="w-full flex flex-row flex-wrap mx-1 lg:mx-40 mt-1">
        {edit ? (
          h.images.map((image: string, i: Key) => {
            return (
              <div key={i} className="relative">
                <ChangeHorseImages image={image} horse={h} />
                <DeleteHorseButton image={image} horse={h} />
              </div>
            );
          })
        ) : (
          <div className="w-full mx-40 overflow-hidden">
            <SRLWrapper>
              <Slide easing="ease" {...properties}>
                {h.images.map((each: string, index: Key) => (
                  <div
                    key={index}
                    className="relative w-full flex flex-row h-80"
                  >
                    <img
                      className="h-full w-full flex object-cover cursor-pointer mt-1"
                      src={each}
                    />
                  </div>
                ))}
              </Slide>{" "}
            </SRLWrapper>
          </div>
        )}
      </div>
    </>
  );
};

export default HorseInfo;
