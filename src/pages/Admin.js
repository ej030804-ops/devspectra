import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const API =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : process.env.REACT_APP_API_URL;

function Admin() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [newService, setNewService] = useState({
    title: "",
    description: "",
    tech: "",
    file: null,
  });

  const [newPortfolio, setNewPortfolio] = useState({
    title: "",
    description: "",
    file: null,
  });

  // ================= AUTH =================
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    loadData();
  }, [navigate]);

  const loadData = async () => {
    await Promise.all([
      fetchServices(),
      fetchPortfolio(),
      fetchProjects(),
    ]);
    setIsLoading(false);
  };

  // ================= FETCH =================
  const fetchServices = async () => {
    const res = await fetch(`${API}/api/services`);
    const data = await res.json();
    setServices(data || []);
  };

  const fetchPortfolio = async () => {
    const res = await fetch(`${API}/api/portfolio`);
    const data = await res.json();
    setPortfolio(data || []);
  };

  const fetchProjects = async () => {
    const res = await fetch(`${API}/api/projects`);
    const data = await res.json();
    setProjects(data || []);
  };

  // ================= UPLOAD =================
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API}/api/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.filename;
  };

  // ================= ADD SERVICE =================
  const addService = async () => {
    let image = "";

    if (newService.file) {
      image = await uploadImage(newService.file);
    }

    await fetch(`${API}/api/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ ...newService, image }),
    });

    setNewService({ title: "", description: "", tech: "", file: null });
    fetchServices();
  };

  // ================= DELETE =================
  const deleteService = async (id) => {
    await fetch(`${API}/api/services/${id}`, {
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    fetchServices();
  };

  const deletePortfolio = async (id) => {
    await fetch(`${API}/api/portfolio/${id}`, {
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    fetchPortfolio();
  };

  const deleteProject = async (id) => {
    await fetch(`${API}/api/projects/${id}`, {
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    fetchProjects();
  };

  // ================= LOADING =================
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* SERVICES */}
      <h2 className="text-xl mb-2">Services</h2>
      {services.map((s) => (
        <div key={s.id}>
          <h3>{s.title}</h3>
          <button onClick={() => deleteService(s.id)}>Delete</button>
        </div>
      ))}

      {/* PROJECTS */}
      <h2 className="text-xl mt-6">Project Requests</h2>
      {projects.map((p) => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <button onClick={() => deleteProject(p.id)}>Delete</button>
        </div>
      ))}

      <Footer />
    </div>
  );
}

export default Admin;