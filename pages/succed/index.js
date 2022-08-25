import React from "react";
import Pic_Logo from "../../asset/pic/logo.png";
import Pic_Success from "../../asset/pic/success.png";
import Image from "next/image";
export default function index() {
  return (
    <div className="bg-black absolute top-0 left-0 w-full ">
      <div className="body ">
        <center className="bg-black">
          <Image
            src={Pic_Logo}
            alt="Alt text for the picture"
            width="100%"
            height="100%"
          />
        </center>
      </div>
      <div className="success mt-5 font-bold pt-10 bg-white rounded-t-2xl h-screen first-letter:font-bold">
        <center>
            <span>ยินดีด้วย !</span>
          <div className="mt-2 text-[#F46245]">
            <div >
              <span>Congratulation,</span>
            </div>
            <div >
              <span>You Have Completed</span>
            </div>
            <div >
              <span>all check points</span>
            </div>
          </div>
          <div className="mt-2">
            <Image src={Pic_Success} alt="success" width="100%" height="100%" />
          </div>
          <div>
            {/* <Link to="/">
           <button className="btn-sc">HOME</button>
           </Link> */}
          </div>
        </center>
      </div>
    </div>
  );
}
