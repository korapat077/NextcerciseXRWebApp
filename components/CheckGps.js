import { useEffect, useState } from "react";

const CheckGps = () =>{
  const [location , setLocation] = useState({
    loaded : false , 
    coordinates: { lat:"" , lng:""}
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (location) => {
    setLocation({
      loaded: true,
    });
  };

  useEffect(() => {
    if(!("geolocation" in navigator)){
      onError({
        code: 0 , 
        message:"Geolocation not supported"
      })
    }
    navigator.geolocation.getCurrentPosition(onSuccess , onError);
  }, []);
  return location
}
export default CheckGps;