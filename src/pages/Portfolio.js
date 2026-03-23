import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/portfolio`)
      .then((res) => setPortfolio(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ paddingTop: "80px", padding: "30px" }}>
      <h2>Our Portfolio</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "25px",
        }}
      >
        {portfolio.map((p) => (
          <div
            key={p.id}
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
                src={`${API_URL}${p.image}`}
                alt={p.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* CONTENT */}
            <div style={{ padding: "15px" }}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <p style={{ color: "#38bdf8" }}>{p.tech}</p>

              {/* SAME STYLE BUTTON (clean) */}
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  padding: "8px 15px",
                  background: "#22c55e",
                  color: "white",
                  borderRadius: "6px",
                  textDecoration: "none",
                }}
              >
                🔗 View Project
              </a>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;