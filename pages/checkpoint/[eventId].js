import axios from "axios";
import Link from "next/link";
import { useRouter, NextRouter } from "next/router";
import { useEffect, useState } from "react";
import CheckPointComponents from "../../components/Checkpoint";
import Loding from "../../components/Loding";
import Unpublish from "../../components/Unpublish";
const CheckPoint = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const [stateDataEvent, setStateDataEvent] = useState([]);
  const [statStatus, setStateStatus] = useState([]);
  const [loding, setLoding] = useState(false);
  const [startData, setStartData] = useState([]);
  const [endData, setEndData] = useState([]);
  const [nowData, setNowData] = useState([]);
  useEffect(() => {
    if (!router.isReady) {
    } else {
      setTimeout(() => {
        axios({
          method: "get",
          url: `${process.env.NEXT_PUBLIC_APP_NAME}/event/${eventId}`,
        }).then(function (response) {
          // console.log(response.data);
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
          setStateStatus(response.success);
          setLoding(true);
        });
      }, 500);
    }
  }, [router.isReady]);

  if (!router.isReady) {
  } else {
    if (loding) {
      if (stateDataEvent.isTrash == false && stateDataEvent.isPublish == true) {
        if (nowData >= startData) {
          if (nowData <= endData) {
            return <CheckPointComponents eventId={eventId} />;
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
export default CheckPoint;
