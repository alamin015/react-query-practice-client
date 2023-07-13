import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useCarts from '../../hooks/useCarts';

const Home = () => {
  const [cart,refetch] = useCarts();
  const [data,setData] = useState('')



  const handleUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    fetch(`http://localhost:5000/user?email=alamin@gmail.com`,{
      method: "POST",
      headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({name})
    })
    .then(res => res.json())
    .then(result => {
      refetch();
      // alert("ok")
    })
  }
  return (
    <>
    <div className='container mx-auto h-screen py-8'>
        <form onSubmit={handleUser}>
          <input type="text" name="name" className='border py-2 outline-none' />
          <button className='py-2 px-6 border bg-green-600 text-white'>Add</button>
        </form>
        
    </div>
    <Link to="/blog">blog</Link>
    </>
  )
}

export default Home