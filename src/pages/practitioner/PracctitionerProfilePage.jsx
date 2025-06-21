import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faComments,
  faEdit,
  faSave,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

export default function PractitionerProfilePage() {
  const navigate = useNavigate();
  const [practitioner, setPractitioner] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", surname: "", gender: "", email: "", password: "", jobTitle: "", placesOfWork: "" });

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("loggedInPractitioner"));
    if (!loggedIn) {
      navigate("/practitioner/login");
    } else {
      setPractitioner(loggedIn);
      setEditData({
        name: loggedIn.name,
        surname: loggedIn.surname,
        gender: loggedIn.gender,
        email: loggedIn.email,
        password: loggedIn.password,
        jobTitle: loggedIn.jobTitle,
        placesOfWork: loggedIn.placesOfWork.join(", "),
      });
    }
  }, []);

  const menuItems = [
    { name: "Dashboard", path: "/practitioner/dashboard" },
    { name: "Patients", path: "/practitioner/patients" },
    { name: "Reminders", path: "/practitioner/reminders" },
    { name: "World Health Announcements", path: "/practitioner/announcements" },
    { name: "Profile", path: "/practitioner/profile" },
  ];

  if (practitioner?.mentalHealth) {
    menuItems.push({ name: "Chat Rooms", path: "/practitioner/chat", icon: faComments });
  }

  const handleMenuClick = (item) => {
    navigate(item.path);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInPractitioner");
    navigate("/practitioner/login");
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedPractitioner = {
      ...practitioner,
      name: editData.name,
      surname: editData.surname,
      gender: editData.gender,
      email: editData.email,
      password: editData.password,
      jobTitle: editData.jobTitle,
      placesOfWork: editData.placesOfWork.split(",").map(p => p.trim()),
    };
    localStorage.setItem("loggedInPractitioner", JSON.stringify(updatedPractitioner));
    setPractitioner(updatedPractitioner);
    setIsEditing(false);
  };

  if (!practitioner) return null;

  return (
  <div
    className="app-layout"
    style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}
  >
    <aside className="sidebar is-open">
      <div className="sidebar-header">
        <h3>Menu</h3>
      </div>
      <nav className="menu-nav">
        {menuItems.map((item, idx) => (
          <div key={idx} className="nav-item" onClick={() => handleMenuClick(item)}>
            {item.icon && <FontAwesomeIcon icon={item.icon} className="mr-2" />}
            {item.name}
          </div>
        ))}
        <div className="nav-item logout" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
        </div>
      </nav>
    </aside>

    <div
      className="main-content"
      style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" }}
    >
      

      <main
        className="dashboard-main"
        style={{ flex: 1, padding: "2rem", backgroundColor: "#f4f6f9", overflowY: "auto" }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "800px",
            backgroundColor: "#ffffff",
            border: "1px solid #ccc",
            borderRadius: "0.75rem",
            padding: "2rem",
            alignSelf: "center",
            alignItems: "center",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ color: "#004080" }}>Practitioner Profile</h2>
            <button
              onClick={isEditing ? handleSave : handleEditToggle}
              style={{
                backgroundColor: isEditing ? "#4caf50" : "#2196f3",
                color: "#fff",
                border: "none",
                borderRadius: "0.3rem",
                padding: "0.4rem 0.8rem",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon icon={isEditing ? faSave : faEdit} className="mr-1" />{" "}
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          {isEditing ? (
            <div style={{ marginTop: "1rem" }}>
              <label><strong>Name:</strong></label>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleChange}
                style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
              />

              <label><strong>Surname:</strong></label>
              <input
                type="text"
                name="surname"
                value={editData.surname}
                onChange={handleChange}
                style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
              />

              <label><strong>Gender:</strong></label>
              <select className="primaryInput focus" name="gender" value={editData.gender} onChange={handleChange} required>
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <br />

              <label><strong>Email:</strong></label>
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
                style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
              />

              <label><strong>Password:</strong></label>
              <input
                type="password"
                name="password"
                value={editData.password}
                onChange={handleChange}
                style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
              />

              <label><strong>Job Title:</strong></label>
              <input
                type="text"
                name="title"
                value={editData.jobTitle}
                onChange={handleChange}
                style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
              />

              <label><strong>Places of Work:</strong></label>
              <input
                type="text"
                name="placesOfWork"
                value={editData.placesOfWork}
                onChange={handleChange}
                placeholder="Comma-separated"
                style={{ width: "100%", padding: "0.5rem" }}
              />
            </div>
          ) : (
            <div style={{ marginTop: "1.5rem" }}>
              <p><strong>Name:</strong> {practitioner.name}</p>
              <p><strong>Surname:</strong> {practitioner.surname}</p>
              <p><strong>Gender:</strong> {practitioner.gender}</p>
              <p><strong>Email:</strong> {practitioner.email}</p>
              <p><strong>Job Title:</strong> {practitioner.jobTitle}</p>
              <p><strong>Places of Work:</strong> {practitioner.placesOfWork.join(", ")}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  </div>
);
}