import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faBell,
  faStickyNote,
  faGlobe,
  faUserCircle,
  faComments,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { CalendarCard } from "../../components/CalendarCard";
import { QuickNotesCard } from "../../components/QuickNotesCard";
import { PatientFeedbackCard } from "../../components/PatientFeedbackCard";
import  CPDCard  from "../../components/CPDCard";
import { CollaborationRequestsCard } from "../../components/CollaborationRequestsCard";
import "./Sidebar.css";

export default function PractitionerDashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [practitioner, setPractitioner] = useState({
    name: "",
    mentalHealth: false,
    title: "",
    placesOfWork: [],
    workSummary: [],
    reminders: [],
    appointments: [],
    cpd: [],
    notes: [],
    feedback: [],
    collaborationRequests: [],
  });

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem('loggedInPractitioner'));

    if (loggedIn) {
      setPractitioner({
        name: loggedIn.name || "Practitioner",
        mentalHealth: loggedIn.mentalHealth || false,
        title: loggedIn.title || "Clinical Psychologist",
        placesOfWork: loggedIn.placesOfWork || [],
        workSummary: loggedIn.workSummary || [],
        reminders: loggedIn.reminders || [],
        appointments: loggedIn.appointments || [],
        notes: loggedIn.notes || [], // Optional: for QuickNotesCard
        cpd: loggedIn.cpd || [], // ✅ Add this
        feedback: loggedIn.feedback || [], // Optional: for FeedbackCard
        collaborationRequests: loggedIn.collaborationRequests || [], // Optional: for CollaborationCard
      });
    } else {
      navigate("/practitioner/login");
    }
  }, [location]);

  const totalHours = practitioner.workSummary.reduce((sum, day) => sum + day.hours, 0);
  const totalPatients = practitioner.workSummary.reduce((sum, day) => sum + day.patients, 0);
  const avgPatientsPerDay = practitioner.workSummary.length > 0 ? (totalPatients / practitioner.workSummary.length).toFixed(2) : 0;
  const regulatoryRequirement = 20;

  const menuItems = [
    { name: "Dashboard", path: "/practitioner/dashboard" },
    { name: "Patients", path: "/practitioner/patients" },
    { name: "Reminders", path: "/practitioner/reminders" },
    { name: "World Health Announcements", path: "/practitioner/announcements" },
    { name: "Profile", path: "/practitioner/profile" },
  ];

  if (practitioner.mentalHealth) {
    menuItems.push({ name: "Chat Rooms", path: "/practitioner/chat" });
  }

  const handleMenuClick = (item) => {
    navigate(item.path);
  };

  const handleLogout = () => {
    navigate("/practitioner/login");
  };

  return (
    <div className="app-layout">
      <aside className="sidebar is-open">
        <div className="sidebar-header">
          <h3>Menu</h3>
        </div>
        <nav className="menu-nav">
          {menuItems.map((item, idx) => (
            <div key={idx} className="nav-item" onClick={() => handleMenuClick(item)}>
              <FontAwesomeIcon icon={item.icon} className="mr-2" />
              {item.name}
            </div>
          ))}
          <div className="nav-item logout" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
          </div>
        </nav>
      </aside>

      <div className="main-content">
        <header className="main-header">
          <h1>Hi, {practitioner.name}</h1>
        </header>
        <main className="dashboard-main">
          <h2 className="section-title">Dashboard</h2>
          <div className="card-grid">
            <div className="dashboard-card">
              <h3>Practitioner Info</h3>
              <p><strong>Name:</strong> {practitioner.name}</p>
              <p><strong>Title:</strong> {practitioner.title}</p>
              <p><strong>Places of Work:</strong> {practitioner.placesOfWork.join(", ")}</p>
            </div>

            <div className="dashboard-card" style={{ minHeight: "300px" }}>
              <h3>Work Summary</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={practitioner.workSummary}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="hours" fill="#8884d8" name="Work Hours" />
                  <Bar dataKey="patients" fill="#82ca9d" name="Patients Seen" />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ marginTop: "1em" }}>
                <p><strong>Total Hours:</strong> {totalHours} / <strong>Regulatory Requirement:</strong> {regulatoryRequirement}</p>
                <p><strong>Avg. Patients/Day:</strong> {avgPatientsPerDay}</p>
              </div>
            </div>

            <div className="dashboard-card" style={{ minHeight: "300px" }}>
              <h3>Reminders</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1em", marginTop: "1em" }}>
                {practitioner.reminders.length === 0 ? (
                  <p>No reminders</p>
                ) : (
                  practitioner.reminders.map((reminder, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: "#e0f0ff",
                        borderLeft: "4px solid #1e3a8a",
                        padding: "1em",
                        borderRadius: "0.5rem"
                      }}
                    >
                      <strong>{reminder.date}:</strong> {reminder.text}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="dashboard-card" style={{ minHeight: "300px" }}>
              <h3>Appointments</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1em", marginTop: "1em" }}>
                {practitioner.appointments.length === 0 ? (
                  <p>No upcoming appointments</p>
                ) : (
                  practitioner.appointments.map((appt, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: "#e0f0ff",
                        borderLeft: "4px solid #1e3a8a",
                        padding: "1em",
                        borderRadius: "0.5rem"
                      }}
                    >
                      <strong>{appt.time}:</strong> {appt.patientName}
                    </div>
                  ))
                )}
              </div>
            </div>

            <CalendarCard />
            <QuickNotesCard />
            <PatientFeedbackCard />
            <CPDCard activities={practitioner.cpd} />
            <CollaborationRequestsCard
              requests={practitioner.collaborationRequests || []}
              onRespond={(id, accepted) => {
                console.log(`Request ${id} was ${accepted ? "accepted" : "declined"}`);
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
