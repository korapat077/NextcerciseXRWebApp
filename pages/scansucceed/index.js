import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";
export default function Scansucceed() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [jelId, setJelId] = useState(0);
  const [eventId, setEventId] = useState("");
  const router = useRouter();

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

  useEffect(() => {
    const jelId = window.localStorage.getItem("jelId");
    const eventId = window.localStorage.getItem("eventId");
    setJelId(jelId);
    setEventId(eventId);
  }, []);
  const onPatch = () => {
    axios({
      method: "patch",
      data: {
        isSuccess: true,
      },
      url: `${process.env.NEXT_PUBLIC_APP_NAME}/join-event-list/${jelId}`,
      responseType: "stream",
    }).then(() => {
      router.push(`/checksucceed/${eventId}`)
    })

  };

  return (
    <div>
      <div id="targetFrame1">
        <iframe
          id="targetFrame1"
          src="/gesture.html"
          width={width}
          height={height}
        ></iframe>
      </div>
      <div className="relative  ">
        <div className="absolute inset-x-0 bottom-10 pl-2 ">
          {/* <Link href={`/checksucceed/${eventId}`}> */}
            <button
              className="bg-gradient-to-r from-[#f78830]  to-[#fc252f] w-full mt-4  text-white font-bold py-2 px-4  rounded-full"
              onClick={onPatch}
            >
              Next
            </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}
