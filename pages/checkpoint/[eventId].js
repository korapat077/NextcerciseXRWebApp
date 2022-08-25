import axios from "axios";
import Link from "next/link";
import { useRouter, NextRouter } from "next/router";
import { useEffect, useState } from "react";
import CheckPointComponents from "../../components/Checkpoint";
const CheckPoint =() =>{
  const router = useRouter();
  const { eventId } = router.query;
  return <CheckPointComponents eventId={eventId} />
}
export default CheckPoint;