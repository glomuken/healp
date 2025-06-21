import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function RemindersPage() {
  const [practitioner, setPractitioner] = useState(null);
  const [reminders, setReminders] = useState([
    "Follow up with Alice",
    "Submit monthly report",
    "Call pharmacy about John's prescription"
  ]);
  const [newReminder, setNewReminder] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("loggedInPractitioner"));
    if (!loggedIn) {
      navigate("/practitioner/login");
    } else {
      setPractitioner(loggedIn);
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
    menuItems.push({ name: "Chat Rooms", path: "/practitioner/chat" });
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedInPractitioner");
    navigate("/practitioner/login");
  };

  const handleAddReminder = () => {
    if (newReminder.trim()) {
      setReminders([...reminders, newReminder.trim()]);
      setNewReminder("");
    }
  };

  return (
    <div
      className="app-layout"
      style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}
    >
      <aside
        className="sidebar is-open"
      >
        <div className="sidebar-header">
          <h3>Menu</h3>
        </div>
        <nav className="menu-nav">
          {menuItems.map((item, idx) => (
            <div key={idx} className="nav-item" onClick={() => navigate(item.path)}>
              {item.name}
            </div>
          ))}
          <div className="nav-item logout" onClick={handleLogout}>
            Logout
          </div>
        </nav>
      </aside>

      <div
        className="main-content"
        style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" }}
      >
        <header
          className="main-header"
          style={{ padding: "1rem", backgroundColor: "#fff", borderBottom: "1px solid #ddd" }}
        >
          <h1>Hi, {practitioner?.name}</h1>
        </header>

        <main
          className="dashboard-main"
          style={{ flex: 1, padding: "2rem", overflowY: "auto", backgroundColor: "#f4f6f9" }}
        >
          <h2 className="section-title">Reminders</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {reminders.map((reminder, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#e6f0ff",
                  border: "2px solid #004080",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                }}
              >
                {reminder}
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2rem" }}>
            <h3 style={{ color: "#004080" }}>Add Reminder</h3>
            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              <input
                type="text"
                value={newReminder}
                onChange={(e) => setNewReminder(e.target.value)}
                placeholder="Enter new reminder"
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "0.25rem",
                }}
              />
              <button
                onClick={handleAddReminder}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
              >
                Add
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
