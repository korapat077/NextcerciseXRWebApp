import React, { useEffect } from "react";
import { useRouter } from "next/router";

function index() {
  const router = useRouter();

  useEffect(() => {
    router.push("/209f99c1-a855-4602-8396-c0a2816221e0");
  }, []);

  return (
    <div>
      <p>test</p>
    </div>
  );
}

export default index;
