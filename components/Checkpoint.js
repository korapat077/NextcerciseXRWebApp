import axios from "axios";
import Link from "next/link";
import { useRouter, NextRouter } from "next/router";
import { useEffect, useState } from "react";
import ButtonCheckpoint from "./ButtonCheckpoint";
import Loding from "./Loding";
import Image from 'next/image'
const CheckPointComponents = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const [stateDataEvent, setStateDataEvent] = useState([]);
  const [img, setImg] = useState([]);
  const [loding, setLoding] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (!router.isReady) {
    } else {
      setTimeout(() => {
        axios({
          method: "get",
          url: `${process.env.NEXT_PUBLIC_APP_NAME}/event/${eventId}`,
        }).then(function (response) {
          // console.log(response);
          setStateDataEvent(response.data.result);
          setImg(
            `${process.env.NEXT_PUBLIC_APP_NAME}/stream-files/event/${eventId}/${response.data.result.background}`
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
  if(img.length > 0){
    return (
      <div className="relative">
        <img src={img} width={width} height={height}></img>
        <ButtonCheckpoint eventId={eventId} />
      </div>
    );
  }else{
    return <Loding />
  }
};
export default CheckPointComponents;
