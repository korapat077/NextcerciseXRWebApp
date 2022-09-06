import axios from "axios";
import Link from "next/link";
import { useRouter, NextRouter } from "next/router";
import { useEffect, useState } from "react";
import Loding from "./Loding";
import Unpublish from "./Unpublish";
const ShowEvnet = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const [stateDataEvent, setStateDataEvent] = useState([]);
  const [startData, setStartData] = useState([]);
  const [endData, setEndData] = useState([]);
  const [nowData, setNowData] = useState([]);
  const [img, setImg] = useState([]);
  const [loding, setLoding] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
    } else {
      setTimeout(() => {
        axios({
          method: "get",
          url: `${process.env.NEXT_PUBLIC_APP_NAME}/event/${eventId}`,
        }).then(function (response) {
          // console.log(response.data.result);
          const dateNow = Math.floor(Date.now() / 1000);
          const dateStart = Math.floor(
            new Date(response.data.result.periodStart).getTime() / 1000
          );
          const dateEnd = Math.floor(
            new Date(response.data.result.periodEnd).getTime() / 1000
          );
          setStartData(dateStart);
          setEndData(dateEnd);
          setNowData(dateNow);
          setStateDataEvent(response.data.result);
          setImg(
            `${process.env.NEXT_PUBLIC_APP_NAME}/stream-files/event/${eventId}/${response.data.result.visual}`
          );
        });
        setLoding(true);
      }, 500);
    }
  }, [router.isReady]);

  if (!router.isReady) {
  } else {
    if (stateDataEvent.isTrash == false && stateDataEvent.isPublish == true) {
      if (nowData >= startData) {
        if (nowData <= endData) {
          if (loding) {
            return (
              <div>
                <div className=" flex  h-screen justify-center  ">
                  <div className=" flex flex-col items-center   ">
                    <div className="flex h-screen items-center ">
                      <div className="w-screen p-2  text-center">
                        <Link href={`/checkpoint/${eventId}`}>
                          <a>
                            <h5 className="mb-2 text-white text-2xl font-bold tracking-tight  dark:text-white">
                              {stateDataEvent.title}
                            </h5>
                            <img
                              src={img}
                              alt="stream-files-event"
                              className="block object-cover md:hidden bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                            />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            return <Loding />;
          }
        } else {
          return <Unpublish />;
        }
      } else {
        return <Unpublish />;
      }
    } else {
      return <Unpublish />;
    }
  }
};
export default ShowEvnet;
