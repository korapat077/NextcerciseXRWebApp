import React, { useEffect, useState } from "react";
import { useRouter, NextRouter } from "next/router";
import CheckGps from "../../../../../../../../../../../components/CheckGps";
import { AiFillHome } from "react-icons/ai";
import { FaMapMarkedAlt } from "react-icons/fa";
import Link from "next/link";
import { getDistance } from "geolib";
import Swal from "sweetalert2";
const CpIdT = () => {
  const router = useRouter();
  const {
    jelId,
    name,
    desciption,
    lat,
    long,
    length,
    startFile,
    resultFile,
    eventId,
    cpId
  } = router.query;
 
  const location = CheckGps();
  const [myLocation, setMylocation] = useState({
    lat: "",
    lng: "",
  });
  const [ischeckArea, setIsCheckArea] = useState(false);
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
  const onCheckLocation = () =>{
    const calDistance = () => {
      var distance = getDistance(
        {
          latitude: parseFloat(lat),
          longitude: parseFloat(long),
        },
        {
          latitude: parseFloat(myLocation.lat),
          longitude: parseFloat(myLocation.lng),
        }
      );
      var distances = parseFloat(distance) / 1000;
      console.log("Your Location : ", myLocation.lat, myLocation.lng);
      // alert(`${latitude},${longtitude}`)
      console.log("ระยะห่าง (KM)", distances);
      if (distances <= length) {
        if (ischeckArea == false) {
          console.log("อยู่ในพื้นที่");
          setIsCheckArea(true);
          window.localStorage.setItem("startFile",startFile)
          window.localStorage.setItem("resultFile",resultFile)
          window.localStorage.setItem("jelId",jelId)
          window.localStorage.setItem("eventId",eventId)
          window.localStorage.setItem("cpId",cpId)
        }
      } else {
        console.log("อยู่นอกพื้นที่");
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "You are out of the scan area.",
          text: `distance is ${distances} Km`,
          showConfirmButton: false,
          showCloseButton: true,
        });
      }
    };
    calDistance();
  }
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen p-4">
        <h5 className="w-full  bg-black  tracking-tight text-white p-4 rounded-t-3xl dark:text-white">
          Check point {cpId}
        </h5>
        <a
          href="#"
          className="block p-8 w-full bg-white rounded-b-2xl border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="font-bold text-2xl mt-2 text-center text-[#f12757]  dark:text-gray-400">
            {name}
          </h5>
          <p className=" bg-white p-2 h-52  text-center text-back shadow-inner shadow-slate-500/50   mt-4 pt-4 py-2 px-4 rounded">
            {desciption}
          </p>
          <Link href={`/scan/`}>
          <button className="bg-gradient-to-r from-[#f78830]  to-[#fc252f] w-full mt-4  text-white font-bold py-2 px-4  rounded-full"
           onClick={onCheckLocation}
          >
            Next
          </button>
          </Link>
        </a>
        <div className="flex justify-start font-bold  text-white mt-10 items-center gap-4">
          <Link href={`/checkpoint/${eventId}`}>
            <div className=" flex flex-col justify-center items-center">
              <div className=" text-2xl">
                <AiFillHome />
              </div>
              <div>HOME</div>
            </div>
          </Link>
          <div>
            <a
              href={`https://www.google.com/maps/dir/${lat},${long}/${myLocation.lat},${myLocation.lng}/data=!3m1!4b1!4m2!4m1!3e2`}
              target="_blank"
              rel="noreferrer"
            >
              <div className=" flex flex-col justify-center items-center">
                <div className=" text-2xl">
                  <FaMapMarkedAlt />
                </div>
                <div> MAP</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CpIdT;
