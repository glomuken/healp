import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function WorldHealthPage() {
  const [practitioner, setPractitioner] = useState(null);
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

  // Mock article data (with images)
  const articles = [
    {
      title: "Global Mental Health Trends in 2025",
      link: "#",
      image: "https://via.placeholder.com/600x300?text=Mental+Health+2025",
    },
    {
      title: "WHO Releases Guidelines for Adolescent Well-being",
      link: "#",
      image: "https://via.placeholder.com/600x300?text=Adolescent+Wellbeing",
    },
    {
      title: "Telemedicine Impact on Rural Mental Healthcare",
      link: "#",
      image: "https://via.placeholder.com/600x300?text=Telemedicine",
    },
    {
      title: "Nutrition and Mental Health: New Global Insights",
      link: "#",
      image: "https://via.placeholder.com/600x300?text=Nutrition+and+Mind",
    },
    {
      title: "Suicide Prevention Strategies Adopted Worldwide",
      link: "#",
      image: "https://via.placeholder.com/600x300?text=Prevention+Strategies",
    },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
      <aside className="sidebar is-open">
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

      <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
        <header style={{ padding: "1rem", backgroundColor: "#fff", borderBottom: "1px solid #ddd" }}>
          <h1>Hi, {practitioner?.name}</h1>
        </header>

        <main style={{ flex: 1, padding: "2rem", backgroundColor: "#f4f6f9", overflowY: "auto" }}>
          <h2 className="section-title">World Health Announcements</h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              justifyContent: "flex-start",
            }}
          >
            {articles.map((article, index) => (
              <div
                key={index}
                style={{
                  width: "300px",
                  backgroundColor: "#e6f0ff",
                  border: "2px solid #004080",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{ width: "100%", height: "180px", objectFit: "cover" }}
                  />
                )}
                <div style={{ padding: "1rem" }}>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#004080",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      textDecoration: "none",
                    }}
                  >
                    {article.title}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
