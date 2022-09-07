import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import CheckGps from "../components/CheckGps";
export default function Home() {
  const [stateDataEvent, setStateDataEvent] = useState([]);
  const [uId, setUid] = useState([]);
  const location = CheckGps();
  const [myLocation, setMylocation] = useState({
    lat: "",
    lng: "",
  });
  const makeid = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  useEffect(() => {
    if (!localStorage.getItem("uId")) {
      localStorage.setItem("uId", makeid(15));
    }
    setUid(localStorage.getItem("uId"));
    const data = async () => {
      const lastData = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_APP_NAME}/event/show/publish`,
      }).then(function (response) {
        setStateDataEvent(response.data.result);
        // console.log(response.data.result);
      });
    };
    data();
  }, []);

  useEffect(() => {
    const myLocation = async () => {
      const data = (await location.loaded)
        ? JSON.stringify(location)
        : "Location not available yet";
      if (!location.loaded) {
        // console.log(location);
      } else {
        // console.log(location.coordinates);
        setMylocation(location.coordinates);
      }
    };
    myLocation();
  }, [location]);
  const CheckLogin = () => {
    if (uId) {
      return (
        <div className=" flex  h-screen justify-center mt-5 ">
          <div className=" flex flex-col items-center   ">
            <div className="font-bold text-2xl text-white">NEXT CERCISE</div>
            {stateDataEvent.map((r, k) => {
              if(!r.isTrash){
                return (
                  <div key={k} className="w-screen px-2 pt-5">
                    <Link href={`/${r.eId}`}>
                    <a 
                      className="block h-28  p-5 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                      style={{
                        backgroundImage: `steam-files/event/${r.eId}/${r.visual}`,
                      }}
                    >
                      <h5 className="mb-2 text-2xl truncate font-bold tracking-tight text-gray-900 dark:text-white">
                        {r.title}
                      </h5>
                      <p className="font-normal truncate  text-gray-700 dark:text-gray-400">
                        {r.description}
                      </p>
                    </a>
                    </Link>
                
                  </div>
                );
              }

            })}
          </div>
        </div>
      );
    } else {
      return <div>ยังไม่ได้เข้าสู่ระบบ</div>;
    }
  };
  return <CheckLogin />;
}
