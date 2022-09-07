import React from 'react'

export default  function Unpublish () {
  return (
    <div className=" flex justify-center items-center h-screen ">
    <div className="text-center">
      <div role="status">
        <h5 className=" font-bold mt-5  text-white">Event hasn started yet</h5>
        <span className="sr-only">Event has been canceled</span>
      </div>
    </div>
  </div>
  )
}
