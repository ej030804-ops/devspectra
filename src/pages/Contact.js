import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function Contact(){
  return(
    <>
      <Navbar/>

      <div className="pt-24 min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">

        <div className="bg-white/10 p-10 rounded-xl w-full max-w-md">

          <h1 className="text-3xl mb-6 text-center">Contact Us</h1>

          <input placeholder="Name" className="w-full p-3 mb-4 bg-black/40 rounded"/>
          <input placeholder="Email" className="w-full p-3 mb-4 bg-black/40 rounded"/>
          <textarea placeholder="Message" className="w-full p-3 mb-4 bg-black/40 rounded"/>

          <button className="w-full bg-indigo-600 p-3 rounded">
            Send Message
          </button>

        </div>

      </div>

      <Footer/>
    </>
  )
}
