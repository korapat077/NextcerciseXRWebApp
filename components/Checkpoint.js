import axios from "axios";
import Link from "next/link";
import { useRouter, NextRouter } from "next/router";
import { useEffect, useState } from "react";
import ButtonCheckpoint from "./ButtonCheckpoint";
import Loding from "./Loding";
import Image from "next/image";
import Unpublish from "./Unpublish";
const CheckPointComponents = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const [stateDataEvent, setStateDataEvent] = useState([]);
  const [img, setImg] = useState([]);
  const [loding, setLoding] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
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
          // console.log(response);
          const dateNow = Math.floor(Date.now() / 1000);
          const dateStart = Math.floor(
            new Date(response.data.result.periodStart).getTime() / 1000
          );
          const dateEnd = Math.floor(
            new Date(response.data.result.periodEnd).getTime() / 1000
          );
          setStateDataEvent(response.data.result);
          setStartData(dateStart);
          setEndData(dateEnd);
          setNowData(dateNow);
          setImg(
            `${process.env.NEXT_PUBLIC_APP_S3}/${response.data.result.background}`
          );
          // console.log(response.data.result);
        });
        setLoding(true);
      }, 500);
    }
  }, [router.isReady]);

  function getWindowDimensions() {
    if (typeof window !== "undefined") {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width,
        height,
      };
    }
  }

  useEffect(() => {
    setHeight(getWindowDimensions().height);
    setWidth(getWindowDimensions().width);
  }, []);
  if (img.length > 0) {
    if (stateDataEvent.isTrash == false && stateDataEvent.isPublish == true) {
      if (nowData >= startData) {
        if (nowData <= endData) {
          return (
            <div className="relative">
              <img src={img} width={width} height={height}></img>
              <ButtonCheckpoint eventId={eventId} />
            </div>
          );
        }
      } else {
        return <Unpublish />;
      }
    } else {
      return <Unpublish />;
    }
  }
};
export default CheckPointComponents;
