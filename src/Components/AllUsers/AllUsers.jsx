import React, { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import Loader from "../Loader/Loader";

const AllUsers = () => {
  const [isLoad,setIsLoad] = useState(true)

  const {data : allUser=[],refetch} = useQuery(["mens"],async () => {
    const result = await fetch("https://react-query-practice-lime.vercel.app/mens")
    setIsLoad(false)
    return result.json();
  })

const handleDelete = (id) => {
  setIsLoad(true)
    fetch(`https://react-query-practice-lime.vercel.app/reduce/${id}`,{
        method: "DELETE",
        headers: {
            "content-type" : "application/json"
        }
    })
    .then(res => res.json())
    .then(result => {
        if(result.deletedCount > 0){
          setIsLoad(false)
            refetch();
        }
    })
}


const handleForm = (e) => {
  setIsLoad(true)
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const info = {name,email}
  fetch('https://react-query-practice-lime.vercel.app/addUser',{
    method: "POST",
    headers: {
      "content-type" : "application/json"
    },
    body: JSON.stringify(info)
  })
  .then(res => res.json())
  .then(result => {
    if(result.insertedId) {
      setIsLoad(false)
      form.reset();
      refetch();
    }
  })
}



  return (
    <div className="container mx-auto">
      {
        isLoad && <Loader />
      }
      <h2>All users</h2>
      <p className="mb-8">Total= {allUser.length}</p>
<div className="sm:flex sm:justify-between gap-7">
  <div className="sm:flex-grow w-full sm:min-w-[400px] sm:mb-0 mb-8 border-r-2 border-green-300 pr-4">
    <form onSubmit={handleForm}>
      <input className="py-2 px-1 w-full border rounded-md outline-none mb-3 block" type="text" name="name" />
      <input className="py-2 px-1 w-full border rounded-md outline-none mb-3 block" type="email" name="email" />
      <button className="py-2 px-7 border-0 outline-none bg-green-700 text-white font-medium">Add User</button>
    </form>
  </div>
 <div className="w-full overflow-auto">
 <table className="border-collapse min-w-[600px] border border-slate-400">
        <thead>
          <tr>
            <th className="border p-2 border-slate-300">SL. No.</th>
            <th className="border p-2 border-slate-300">name</th>
            <th className="border p-2 border-slate-300">email</th>
            <th className="border p-2 border-slate-300">action</th>
          </tr>
        </thead>
        <tbody>
          {
            allUser.map(({_id,name,email},index) => <tr key={_id}>
            <td className="border p-2 border-slate-300">{index +1}</td>
            <td className="border p-2 border-slate-300">{name}</td>
            <td className="border p-2 border-slate-300">{email}</td>
            <td className="border text-center p-2 border-slate-300"><button onClick={()=>handleDelete(_id)} className="py-2 px-6 border-0 bg-red-500 text-white font-medium outline-0">delete</button></td>
          </tr>)
          }
        </tbody>
      </table>
 </div>
</div>
    </div>
  );
};

export default AllUsers;
