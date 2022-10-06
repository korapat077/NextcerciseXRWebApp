import React, { useEffect, useState } from "react";
import { useRouter, NextRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import Loding from "../../components/Loding";
const Index = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const [Checkpoint, setCheckpoint] = useState([]);
  const [dataCheckpoint, setDataCheckpoint] = useState([]);
  const [jeId, setJeId] = useState([]);
  const [isRandom, setIsrandom] = useState([]);
  const [loding, setLoding] = useState(false);
  useEffect(() => {
    if (eventId != undefined) {
      const uId = window.localStorage.getItem("uId");
      axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_APP_NAME}/checkpoint/event/${eventId}`,
      }).then(function (response) {
        const respones = response.data.result;
        // console.log(respones);
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
              // console.log(response.data.result);
              setCheckpoint(respones);
            });
          });
        }
        setLoding(true);
      });
    }
  }, [eventId]);

  if (loding) {
    return (
      <div>
        <div className=" h-screen flex justify-center items-center p-2">
          <div className="block p-6 w-full bg-white rounded-2xl text-center border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <p>มา Scan Check point ให้ครบกันเถอะ</p>
            <div className=" grid grid-cols-4 gap-4 mt-5">
              {Checkpoint.map((r, k) => {
                return (
                  <div key={k}>
                    {r.isSuccess == true ? (
                      <button className=" bg-[#0AEB57] border-slate-50 hover:bg-blue-700 text-white font-bold py-5 px-5 rounded-full">
                        <BsFillHandThumbsUpFill />
                      </button>
                    ) : (
                      <button className=" bg-slate-300 hover:bg-blue-700  w-14 h-14  text-white font-bold  rounded-full">
                        {r.cpId}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            <Link href={`/checkpoint/${eventId}`}>
              <button className="bg-gradient-to-r from-[#f78830]  to-[#fc252f] w-full mt-4  text-white font-bold py-2 px-4  rounded-full">
                Next
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return(
    <Loding />
    )
  }
};

export default Index;
