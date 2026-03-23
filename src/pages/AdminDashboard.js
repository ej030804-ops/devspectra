import { useEffect, useState } from "react"

const API_URL = process.env.REACT_APP_API_URL || "https://devspectra-svvi.onrender.com";

export default function AdminDashboard(){

const [projects,setProjects]=useState([])

useEffect(()=>{
fetch(`${API_URL}/api/projects`)
.then(res=>res.json())
.then(data=>setProjects(data))
},[])

return(

<div className="min-h-screen bg-slate-900 text-white p-10">

<h1 className="text-3xl font-bold mb-10">
Admin Dashboard
</h1>

<div className="grid md:grid-cols-2 gap-6">

{projects.map(p=>(
<div
key={p.id}
className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20"
>

<h2 className="font-bold text-xl">{p.name}</h2>
<p className="text-gray-300">{p.email}</p>
<p className="text-indigo-400">{p.project_type}</p>
<p className="text-gray-400">{p.description}</p>

</div>
))}

</div>

</div>

)

}
