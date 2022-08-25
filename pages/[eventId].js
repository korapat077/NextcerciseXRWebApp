import axios from "axios";
import Link from "next/link";
import { useRouter, NextRouter } from "next/router";
import { useEffect, useState } from "react";
import ShowEvnet from "../components/ShowEvent";
const Pang = () => {
  const router = useRouter();
  const { eventId } = router.query;
  return <ShowEvnet eventId={eventId}/>
};
export default Pang;
