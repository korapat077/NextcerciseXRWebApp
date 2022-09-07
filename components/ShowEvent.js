import axios from "axios";
import Link from "next/link";
import { useRouter, NextRouter } from "next/router";
import { useEffect, useState } from "react";
import Loding from "./Loding";
import Unpublish from "./Unpublish";
const ShowEvnet = (props) => {
  const router = useRouter();
  const { eventId } = router.query;

  return (
    <div>
      <div className=" flex  h-screen justify-center  ">
        <div className=" flex flex-col items-center   ">
          <div className="flex h-screen items-center ">
            <div className="w-screen p-2  text-center">
              <Link href={`/checkpoint/${props.eventId}`}>
                <a>
                  <h5 className="mb-2 text-white text-2xl font-bold tracking-tight  dark:text-white">
                    {props.title}
                  </h5>
                  <img
                    src={props.img}
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
};
export default ShowEvnet;
