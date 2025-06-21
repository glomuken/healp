// PatientsPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
import { mockPractitioners } from '../../data/practitioner';

const mockPatients = [
  { id: 1, name: "Alice Doe", age: 29, condition: "Anxiety", notes: "Weekly sessions ongoing." },
  { id: 2, name: "John Smith", age: 45, condition: "PTSD", notes: "Referred for EMDR." },
  { id: 3, name: "Emily Zhang", age: 33, condition: "Depression", notes: "Stable, meds adjusted." },
];

export default function PatientsPage() {
  const [practitioner, setPractitioner] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [authPromptVisible, setAuthPromptVisible] = useState(false);
  const [authData, setAuthData] = useState({ hpcsa: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [auditLog, setAuditLog] = useState([]);
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

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setAuthPromptVisible(true);
  };

  const confirmIdentity = (e) => {
    e.preventDefault();
    if (practitioner.hpcsa === authData.hpcsa && practitioner.password === authData.password) {
      setAuthPromptVisible(false);
      setAuthError('');
      setFailedAttempts(0);
      const log = { patient: selectedPatient.name, timestamp: new Date().toLocaleString() };
      setAuditLog((prev) => [...prev, log]);
      console.log("Audit Log:", log);
    } else {
      const attempts = failedAttempts + 1;
      setFailedAttempts(attempts);
      if (attempts >= 3) {
        alert("Too many failed attempts. You will be logged out.");
        handleLogout();
      } else {
        setAuthError(`Invalid HPCSA number or password. Attempt ${attempts}/3.`);
      }
    }
  };

  return (
    <div className="app-layout" style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
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

      <div className="main-content" style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" }}>
        <header className="main-header" style={{ padding: "1rem", backgroundColor: "#fff", borderBottom: "1px solid #ddd" }}>
          <h1>Hi, {practitioner?.name}</h1>
        </header>

        <main className="dashboard-main" style={{ flex: 1, padding: "2rem", overflowY: "auto", backgroundColor: "#f4f6f9" }}>
          <h2 className="section-title">Patients</h2>

          <div className="card-grid" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {mockPatients.map((patient) => (
              <div
                key={patient.id}
                className="dashboard-card"
                style={{
                  width: "180px",
                  padding: "1rem",
                  textAlign: "center",
                  backgroundColor: "#fff",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                }}
                onClick={() => handleViewPatient(patient)}
              >
                <FontAwesomeIcon icon={faFileAlt} size="3x" color="#007bff" />
                <p style={{ marginTop: "0.5em", color: "#007bff", fontWeight: "bold" }}>{patient.name}</p>
              </div>
            ))}
          </div>

          {selectedPatient && !authPromptVisible && (
            <div style={{ marginTop: "2em", padding: "1.5em", backgroundColor: "#ffffff", border: "2px solid #007bff", borderRadius: "0.5rem", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", maxWidth: "600px" }}>
              <h3 style={{ color: "#007bff" }}>Patient Info</h3>
              <p><strong>Name:</strong> {selectedPatient.name}</p>
              <p><strong>Age:</strong> {selectedPatient.age}</p>
              <p><strong>Condition:</strong> {selectedPatient.condition}</p>
              <p><strong>Notes:</strong> {selectedPatient.notes}</p>
            </div>
          )}

          {authPromptVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
                <h2 className="text-lg font-semibold mb-4 text-blue-700">Confirm Access</h2>
                {authError && <div className="bg-red-500 text-white p-2 rounded mb-3">{authError}</div>}
                <form onSubmit={confirmIdentity} className="space-y-3">
                  <input
                    type="text"
                    name="hpcsa"
                    placeholder="HPCSA Number"
                    value={authData.hpcsa}
                    onChange={e => setAuthData({ ...authData, hpcsa: e.target.value })}
                    className="w-full border p-2 rounded"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={authData.password}
                    onChange={e => setAuthData({ ...authData, password: e.target.value })}
                    className="w-full border p-2 rounded"
                    required
                  />
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setAuthPromptVisible(false)} className="px-3 py-1 bg-gray-400 text-white rounded">Cancel</button>
                    <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Confirm</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
