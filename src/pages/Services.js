import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/services`)
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch services:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ paddingTop: "80px", padding: "30px" }}>
      <h2>Our Services</h2>

      {loading && <p>Loading services...</p>}
      
      {error && (
        <div style={{
          background: "#fee2e2",
          color: "#c2255c",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px"
        }}>
          <strong>Error loading services:</strong> {error}<br/>
          <small>API URL: {API_URL}</small>
        </div>
      )}

      {!loading && services.length === 0 && (
        <div style={{
          background: "#fef3c7",
          color: "#92400e",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px"
        }}>
          <strong>No services added yet.</strong> Go to <strong>Admin Dashboard</strong> to add services.
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "25px",
        }}
      >
        {services.map((s) => (
          <div
            key={s.id}
            style={{
              background: "#1e293b",
              borderRadius: "12px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* IMAGE */}
            <div style={{ height: "200px", overflow: "hidden" }}>
              <img
                src={`${API_URL}${s.image}`}
                alt={s.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23333' width='400' height='300'/%3E%3C/svg%3E";
                }}
              />
            </div>

            {/* CONTENT */}
            <div style={{ padding: "15px" }}>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <p style={{ color: "#38bdf8" }}>{s.tech}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Services;