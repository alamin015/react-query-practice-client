import React from 'react'
import HashLoader  from "react-spinners/HashLoader";

const Loader = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center absolute top-0 left-0 bg-black opacity-80'>
        <HashLoader color="#fff" />
    </div>
  )
}

export default Loader