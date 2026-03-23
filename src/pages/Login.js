import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // API URL - auto-detect based on environment
  const API_URL = 
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : process.env.REACT_APP_API_URL || "https://devspectra-svvi.onrender.com"

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      console.log("✅ Already logged in, redirecting to admin")
      navigate("/admin")
    }
  }, [navigate])

  const handleLogin = async (e) => {
    if (e) e.preventDefault()
    
    setError("")
    setLoading(true)

    console.log("🔐 Login attempt to:", API_URL)

    try {
      if (!email || !password) {
        throw new Error("Email and password are required")
      }

      // Call backend API for authentication
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      if (!data.token) {
        throw new Error("No token received from server")
      }

      console.log("✅ Login successful, token received")
      
      // Save token
      localStorage.setItem("token", data.token)
      localStorage.setItem("user_email", email)
      console.log("✅ Token saved to localStorage")
      
      console.log("🔄 Redirecting to /admin...")
      navigate("/admin")
    } catch (err) {
      console.error("❌ Login error:", err.message)
      setError(err.message)
    }
    
    setLoading(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleLogin(e)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-white/10 p-6 rounded-xl w-80">
        <h2 className="text-xl mb-4 text-center">Admin Login</h2>

        {error && (
          <div style={{
            background: "#fee2e2",
            color: "#c2255c",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "15px",
            fontSize: "14px"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full p-2 text-black rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full p-2 text-black rounded mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700 disabled:bg-gray-500"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

    </div>
  )
}
