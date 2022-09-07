import axios from "axios";
import Link from "next/link";
import { useRouter, NextRouter } from "next/router";
import { useEffect, useState } from "react";
import Loding from "../components/Loding";
import ShowEvnet from "../components/ShowEvent";
import Unpublish from "../components/Unpublish";
const Pang = () => {
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
          console.log(response.data.result);
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
    if (stateDataEvent.isTrash == false && stateDataEvent.isPublish == true  ) {
      if (nowData >= startData) {
        if (nowData <= endData) {
          if (loding) {
            return (
              <ShowEvnet
                eventId={eventId}
                title={stateDataEvent.title}
                img={img}
              />
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
      return <Loding />;
    }
  }
};
export default Pang;
