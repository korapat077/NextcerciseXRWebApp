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
  useEffect(() => {
    if (!router.isReady) {
    } else {
      setTimeout(() => {
        axios({
          method: "get",
          url: `${process.env.NEXT_PUBLIC_APP_NAME}/event/${eventId}`,
        }).then(function (response) {
          // console.log(response.data);
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
        return <CheckPointComponents eventId={eventId} />;
      } else {
        return <Unpublish />;
      }
    } else {
      return <Loding />;
    }
  }
};
export default CheckPoint;
