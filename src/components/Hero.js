import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#8b5cf6] text-white">

      {/* 🌟 GLOW BACKGROUND */}
      <div className="absolute w-[500px] h-[500px] bg-purple-500/30 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-pink-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* 💜 BLOB 1 */}
      <motion.div
        animate={{ x: mouse.x, y: mouse.y }}
        transition={{ type: "spring", stiffness: 50 }}
        className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[100px] rounded-full"
      />

      {/* 💖 BLOB 2 */}
      <motion.div
        animate={{ x: -mouse.x, y: -mouse.y }}
        transition={{ type: "spring", stiffness: 50 }}
        className="absolute w-[350px] h-[350px] bg-pink-500/20 blur-[100px] rounded-full"
      />

      {/* ✨ CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6"
      >

        {/* 💎 GLASS BOX */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-10 shadow-2xl max-w-3xl">

          {/* 🔥 HEADING */}
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Building Digital Products <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              That Scale
            </span>
          </h1>

          {/* ✨ DESCRIPTION */}
          <p className="mt-6 text-gray-300 text-lg">
            We design and develop modern web applications, cloud platforms and digital experiences.
          </p>

          {/* 🚀 BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

            <Link
              to="/start"
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
            >
              Start Your Project
            </Link>

            <Link
              to="/services"
              className="border border-white/20 px-6 py-3 rounded-xl hover:bg-white/10 transition"
            >
              Our Services
            </Link>

          </div>

        </div>
      </motion.div>
    </section>
  )
}
