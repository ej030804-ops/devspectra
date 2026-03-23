import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  // ✅ Close menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location])

  // ✅ Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto"
    return () => (document.body.style.overflow = "auto")
  }, [open])

  // ✅ Fake loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="flex justify-between items-center px-4 py-4">

          {/* LOGO */}
          {loading ? (
            <div className="w-32 h-6 bg-white/20 animate-pulse rounded"></div>
          ) : (
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              DevSpectra
            </h1>
          )}

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-8 text-white">
            {["/", "/services", "/portfolio", "/start", "/admin"].map((path, i) => {
              const names = ["Home", "Services", "Portfolio", "Start Project", "Admin"]
              return (
                <Link
                  key={i}
                  to={path}
                  className={`relative transition ${
                    isActive(path) ? "text-purple-400" : "hover:text-purple-300"
                  }`}
                >
                  {names[i]}
                  {isActive(path) && (
                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-purple-400 rounded"></span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* HAMBURGER */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-2xl"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <>
        {/* BACKDROP */}
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition duration-300 ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        />

        {/* DRAWER */}
        <div
 	 className={`fixed top-0 right-0 h-[100dvh] w-3/4 max-w-xs z-50
 	 bg-gradient-to-br from-purple-900/90 via-black to-black
  	backdrop-blur-xl shadow-2xl
 	 p-6
 	 transform transition-all duration-500 ease-in-out
 	 overflow-y-auto
 	 ${open ? "translate-x-0" : "translate-x-full"}
 	 `}
	>
          {/* CLOSE */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-white text-2xl"
          >
            ✕
          </button>

          {/* MENU ITEMS */}
          <div className="mt-20 flex flex-col gap-6 text-lg text-white">

            <Link to="/" className="group" onClick={() => setOpen(false)}>
              Home
              {isActive("/") && (
                <span className="block h-[2px] bg-purple-400 mt-1 w-full"></span>
              )}
            </Link>

            <Link to="/services" onClick={() => setOpen(false)}>
              Services
            </Link>

            <Link to="/portfolio" onClick={() => setOpen(false)}>
              Portfolio
            </Link>

            <Link to="/start" onClick={() => setOpen(false)}>
              Start Project
            </Link>

            <Link to="/admin" onClick={() => setOpen(false)}>
              Admin
            </Link>

          </div>
        </div>
      </>
    </>
  )
}
