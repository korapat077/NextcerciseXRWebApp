import axios from "axios";
import { useEffect, useState } from "react";
import Loding from "./Loding";
import styled from "styled-components";
import Link from "next/link";
import CheckGps from "./CheckGps";
import { getDistance } from "geolib";
import Swal from "sweetalert2";
import Pic_Logo from "../asset/pic/logo.png";
import Pic_Success from "../asset/pic/success.png";
import Image from "next/image";
const DivTest = styled.div`
  @media screen and (min-width: 320px) {
    position: absolute;
    left: ${(props) => props.left};
    top: ${(props) => props.top};
  }

  @media screen and (min-width: 375px) {
    position: absolute;
    left: ${(props) => props.left};
    top: ${(props) => props.top};
  }

  @media screen and (min-width: 425px) {
    position: absolute;
    left: ${(props) => props.left};
    top: ${(props) => props.top};
  }
`;
const ButtonCheckpoint = ({ eventId }) => {
  const [Checkpoint, setCheckpoint] = useState([]);
  const [dataCheckpoint, setDataCheckpoint] = useState([]);
  const [isRandom, setIsrandom] = useState([]);
  const [isCheckpoint, setIsCheckpoint] = useState(false);
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [length, setLength] = useState();
  const [jeId, setJeId] = useState([]);
  const location = CheckGps();
  const [ischeckArea, setIsCheckArea] = useState(false);
  const [myLocation, setMylocation] = useState({
    lat: "",
    lng: "",
  });

  useEffect(() => {
    const isSuccessLength = 0;
    if (eventId != undefined) {
      const uId = window.localStorage.getItem("uId");
      axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_APP_NAME}/checkpoint/event/${eventId}`,
      }).then(function (response) {
        const respones = response.data.result;
        console.log("test", respones);
        setDataCheckpoint(respones);
      });
      axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_APP_NAME}/event/${eventId}`,
      }).then(function (response) {
        const respones = response.data.result;
        // console.log(respones);
        setIsrandom(respones);
      });
      axios({
        method: "post",
        data: {
          eId: eventId,
          uId: uId,
        },
        url: `${process.env.NEXT_PUBLIC_APP_NAME}/join-event`,
      }).then((res) => {
        const jeId = res.data.result.jeId;
        setJeId(jeId);
        // console.log(jeId);
        if (jeId) {
          axios({
            method: "post",
            data: {
              jeId: res.data.result.jeId,
            },
            url: `${process.env.NEXT_PUBLIC_APP_NAME}/join-event-list/generate/${eventId}`,
          }).then(function (response) {
            axios({
              method: "get",
              url: `${process.env.NEXT_PUBLIC_APP_NAME}/join-event-list/event/${jeId}`,
            }).then(function (response) {
              const respones = response.data.result;
              // console.log(respones);
              respones.map((r) => {
                if (r.isSuccess) {
                  isSuccessLength += 1;
                }
              });
              if (respones.length <= isSuccessLength) {
                // console.log(respones.length);
                setIsCheckpoint(true);
                window.location.assign("/succed");
              } else {
                // console.log("ไม่สำเร็จ");
              }
              setCheckpoint(respones);
            });
          });
        }
      });
    }
  }, [eventId]);

  useEffect(() => {
    const myLocation = async () => {
      const data = (await location.loaded)
        ? JSON.stringify(location)
        : "Location not available yet";
      if (!location.loaded) {
      } else {
        setMylocation(location.coordinates);
      }
    };
    myLocation();
  }, [location]);
  let array = [];
  // console.log(Checkpoint);
  if (!isCheckpoint) {
    if (!isRandom.isNoPath) {
      if (
        (Checkpoint.length > 0 &&
          dataCheckpoint.length > 0 &&
          myLocation.lat) ||
        myLocation.lng
      ) {
        Checkpoint.map((r3, k3) => {
          if (r3.isSuccess) {
            array.push(r3.isSuccess);
          }
        });
        return (
          <div>
            {dataCheckpoint.map((r, k) => {
              return Checkpoint.map((r2, k2) => {
                let count = 1;
                if (r.cpId == r2.cpId) {
                  const cpOrderOld = r2.cpOrder;
                  const cpOrderNew = r2.cpOrder + 1;
                  return (
                    <DivTest
                      key={k2}
                      top={`${r.positionY}%`}
                      left={`${r.positionX}%`}
                    >
                      {r2.isSuccess == true ? (
                        // <button className=" bg-lime-600 hover:bg-blue-700 text-white font-bold w-16 h-16  rounded-full">
                        //   {r2.cpId}
                        // </button>
                        <div
                          className={`absolute top-[${r.positionY}%] left-[${r.positionX}%]  flex justify-center items-center text-center `}
                        >
                          <div>
                            <button
                              className={` text-white font-bold shadow-red-600 shadow-2xl w-16  h-16 rounded-full`}
                            >
                              <img
                                src={`${process.env.NEXT_PUBLIC_APP_NAME}/stream-files/checkpoint/${eventId}/${r.cpId}/${r.afterFile}`}
                              />
                            </button>
                            <div className="rounded-2xl text-white  p-2 text-sm bg-neutral-800 ">
                              <div>{r.name}</div>
                            </div>
                          </div>
                        </div>
                      ) : r2.cpOrder <= 1 && r2.isSuccess == false ? (
                        <Link
                          href={`/checkgps/${r2.jelId}/${r.name}/${r.desciption}/${r.lat}/${r.long}/${r.length}/${r.startFile}/${r.resultFile}/${eventId}/${r2.cpId}`}
                        >
                          {/* <button className="  bg-amber-600 hover:bg-blue-700 text-white font-bold w-16 h-16  rounded-full">
                            {r2.cpId}
                            
                          </button> */}
                          <div
                            className={`absolute top-[${r.positionY}%] left-[${r.positionX}%]  flex justify-center items-center text-center `}
                          >
                            <div>
                              <button
                                className={` text-white font-bold shadow-red-600 shadow-2xl w-16  h-16 rounded-full`}
                              >
                                <img
                                  src={`${process.env.NEXT_PUBLIC_APP_NAME}/stream-files/checkpoint/${eventId}/${r.cpId}/${r.afterFile}`}
                                />
                              </button>
                              <div className="rounded-2xl text-white  p-2 text-sm bg-neutral-800 ">
                                <div>{r.name}</div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ) : r2.cpOrder == array.length + 1 ? (
                        <Link
                          href={`/checkgps/${r2.jelId}/${r.name}/${r.desciption}/${r.lat}/${r.long}/${r.length}/${r.startFile}/${r.resultFile}/${eventId}/${r2.cpId}`}
                        >
                          {/* <div>
                            <button className="  bg-amber-600 hover:bg-blue-700 text-white font-bold w-16 h-16  rounded-full">
                              {r2.cpId}
                            </button>
                          </div> */}
                          <div
                            className={`absolute top-[${r.positionY}%] left-[${r.positionX}%]  flex justify-center items-center text-center `}
                          >
                            <div>
                              <button
                                className={` text-white font-bold shadow-red-600 shadow-2xl w-16  h-16 rounded-full`}
                              >
                                <img
                                  src={`${process.env.NEXT_PUBLIC_APP_NAME}/stream-files/checkpoint/${eventId}/${r.cpId}/${r.beforeFile}`}
                                />
                              </button>
                              <div className="rounded-2xl text-white  p-2 text-sm bg-neutral-800 ">
                                <div>{r.name}</div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        // แสกนตัวนี้
                        // <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-16 h-16 rounded-full">
                        //   {r2.cpId}
                        // </button>
                        <div
                        className={`absolute top-[${r.positionY}%] left-[${r.positionX}%] grayscale   flex justify-center items-center text-center `}
                      >
                        <div>
                          <button
                            className={` text-white font-bold shadow-red-600 shadow-2xl w-16  h-16 rounded-full`}
                          >
                            <img
                              src={`${process.env.NEXT_PUBLIC_APP_NAME}/stream-files/checkpoint/${eventId}/${r.cpId}/${r.beforeFile}`}
                            />
                          </button>
                          <div className="rounded-2xl text-white  p-2 text-sm bg-neutral-800 ">
                            <div>{r.name}</div>
                          </div>
                        </div>
                      </div>

                        // ไม่บอกหลอก
                      )}
                      {/* <Link href="#" key={k2}>
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-6 rounded-full">
                            {r2.cpId}
                          </button>
                        </Link> */}
                    </DivTest>
                  );
                }
              });
            })}
          </div>
        );
      } else {
        return <Loding />;
      }
    } else {
      return (
        <div>
          {dataCheckpoint.map((r, k) => {
            return Checkpoint.map((r2, k2) => {
              let count = 1;
              // console.log(r2);
              // console.log(r);
              if (r.cpId == r2.cpId) {
                const cpOrderOld = r2.cpOrder;
                const cpOrderNew = r2.cpOrder + 1;
                return (
                  <DivTest
                    key={k2}
                    top={`${r.positionY}%`}
                    left={`${r.positionX}%`}
                  >
                    {
                      r2.isSuccess == true ? (
                        <button
                          className={`absolute top-[${r.positionY}%] left-[${r.positionX}%] text-white font-bold shadow-red-600 shadow-2xl   w-16 h-16 rounded-full`}
                        >
                          <img
                            src={`${process.env.NEXT_PUBLIC_APP_NAME}/stream-files/checkpoint/${eventId}/${r.cpId}/${r.afterFile}`}
                          />
                          <span className="bg-black px-5 rounded-2xl">
                            {r2.cpOrder}
                          </span>
                        </button>
                      ) : // เสร็จ
                      r2.isSuccess == false ? (
                        <Link
                          href={`/checkgps/${r2.jelId}/${r.name}/${r.desciption}/${r.lat}/${r.long}/${r.length}/${r.startFile}/${r.resultFile}/${eventId}/${r2.cpId}`}
                        >
                          <button
                            className={`absolute top-[${r.positionY}%] left-[${r.positionX}%] text-white font-bold   w-16 h-16 rounded-full`}
                          >
                            <img
                              src={`${process.env.NEXT_PUBLIC_APP_NAME}/stream-files/checkpoint/${eventId}/${r.cpId}/${r.beforeFile}`}
                            />
                            <span className="bg-black px-5 rounded-2xl">
                              {r2.cpOrder}
                            </span>
                          </button>
                        </Link>
                      ) : (
                        "test"
                      ) // แสกนตัวแรก
                    }
                    {/* <Link href="#" key={k2}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-6 rounded-full">
                        {r2.cpId}
                      </button>
                    </Link> */}
                  </DivTest>
                );
              }
            });
          })}
        </div>
      );
    }
  } else {
    window.location.assign("/succed");
  }
};
export default ButtonCheckpoint;
