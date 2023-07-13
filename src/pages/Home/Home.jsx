import React, { useState } from 'react'
import useCarts from '../../hooks/useCarts';
import Loader from '../../Components/Loader/Loader';

const Home = () => {
  const [cart,refetch] = useCarts();
  const [isLoad,setIsLoad] = useState(false)



  const handleUser = (e) => {
    setIsLoad(true)
    e.preventDefault();
    const name = e.target.name.value;
    fetch(`https://react-query-practice-lime.vercel.app/user?email=alamin@gmail.com`,{
      method: "POST",
      headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({name})
    })
    .then(res => res.json())
    .then(result => {
      setIsLoad(false)
      e.target.reset();
      refetch();
    })
  }
  return (
    <>
    <div className='container mx-auto py-8'>
      {
        isLoad && <Loader />
      }
        <form onSubmit={handleUser}>
          <input type="text" name="name" className='border p-2 outline-none' placeholder='add text' />
          <button className='py-2 px-6 border bg-green-600 text-white'>Add</button>
        </form>
        
    </div>
    </>
  )
}

export default Home