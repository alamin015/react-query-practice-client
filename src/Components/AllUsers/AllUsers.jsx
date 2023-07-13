import React, { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';

const AllUsers = () => {

  const {data : allUser=[],refetch} = useQuery(["mens"],async () => {
    const result = await fetch("http://localhost:5000/mens")
    return result.json();
  })

const handleDelete = (id) => {
    fetch(`http://localhost:5000/reduce/${id}`,{
        method: "DELETE",
        headers: {
            "content-type" : "application/json"
        }
    })
    .then(res => res.json())
    .then(result => {
        if(result.deletedCount > 0){
            refetch();
        }
    })
}


const handleForm = (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const info = {name,email}
  fetch('http://localhost:5000/addUser',{
    method: "POST",
    headers: {
      "content-type" : "application/json"
    },
    body: JSON.stringify(info)
  })
  .then(res => res.json())
  .then(result => {
    if(result.insertedId) {
      form.reset();
      refetch();
    }
  })
}



  return (
    <div className="container mx-auto">
      <h2>All users</h2>
      <p>hello all = {allUser.length}</p>
<div className="flex justify-between gap-7">
  <div>
    <form onSubmit={handleForm}>
      <input className="py-2 px-1 border rounded-md outline-none mb-3 block" type="text" name="name" />
      <input className="py-2 px-1 border rounded-md outline-none mb-3 block" type="email" name="email" />
      <button className="py-2 px-7 border-0 outline-none bg-green-700 text-white font-medium">Add User</button>
    </form>
  </div>
  <table className="border-collapse w-full border border-slate-400">
        <thead>
          <tr>
            <th className="border p-2 border-slate-300">name</th>
            <th className="border p-2 border-slate-300">email</th>
            <th className="border p-2 border-slate-300">action</th>
          </tr>
        </thead>
        <tbody>
          {
            allUser.map(({_id,name,email}) => <tr key={_id}>
            <td className="border p-2 border-slate-300">{name}</td>
            <td className="border p-2 border-slate-300">{email}</td>
            <td className="border p-2 border-slate-300"><button onClick={()=>handleDelete(_id)} className="py-2 px-6 border-0 bg-red-500 text-white font-medium outline-0">delete</button></td>
          </tr>)
          }
        </tbody>
      </table>
</div>
    </div>
  );
};

export default AllUsers;
