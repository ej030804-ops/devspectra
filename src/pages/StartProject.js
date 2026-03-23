import { useState } from "react"
import Footer from "../components/Footer"

// ✅ AUTO SWITCH LOCAL / RENDER
const API =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : process.env.REACT_APP_API_URL || "https://devspectra-svvi.onrender.com";

export default function StartProject(){

  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "",
    description: ""
  })

  function handleChange(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  async function handleSubmit(){
    try{

      const res = await fetch(`${API}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if(res.ok){
        alert("✅ Project submitted successfully")

        // clear form
        setForm({
          name:"",
          email:"",
          project_type:"",
          description:""
        })

      } else {
        alert(data.message)
      }

    }catch(err){
      alert("❌ Backend not running")
      console.log(err)
    }
  }

  return(
    <>

     <div className="pt-20">

      <div className="min-h-screen bg-black text-white pt-24 px-6 flex justify-center items-center">

        <div className="bg-white/10 p-8 rounded-xl w-full max-w-md">

          <h1 className="text-2xl font-bold mb-6 text-center">
            Start Your Project 🚀
          </h1>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 mb-4 bg-black/40 rounded"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 mb-4 bg-black/40 rounded"
          />

          <select
            name="project_type"
            value={form.project_type}
            onChange={handleChange}
            className="w-full p-3 mb-4 bg-black/40 rounded"
          >
            <option value="">Select Project Type</option>
            <option value="Website">Website</option>
            <option value="App">App</option>
            <option value="UI/UX">UI/UX</option>
          </select>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your project"
            className="w-full p-3 mb-4 bg-black/40 rounded"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 p-3 rounded hover:bg-indigo-700"
          >
            Submit Project
          </button>

        </div>

      </div>

     </div>

      <Footer/>
    </>
  )
}
