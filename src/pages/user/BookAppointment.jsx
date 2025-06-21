import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatUI from './chat'
import {
  faTachometerAlt, faPills, faUtensils, faBed,
  faHeartbeat, faArrowTrendUp, faDumbbell, faComments,
  faCalendarCheck, faHistory, faUser, faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import './Sidebar.css';

import { mockHospitals } from '../../data/mockHospitals';
import { mockSymptoms } from '../../data/mockSyptoms';
import mockUsers from '../../data/users' // 👈 adjust the path to match your folder structure


export default function BookAppointment() {
  const user = JSON.parse(localStorage.getItem("loggedInUser")) || { name: "Guest" };
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const [name, setName] = useState(user.name);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [showBooking, setShowBooking] = useState(false);
  const [decision, setDecision] = useState("");
  const [appointment, setAppointment] = useState({ date: "", time: "" });
  const [confirmed, setConfirmed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/user/login");
  };

  const handleSymptomChange = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleDecision = (choice) => {
    setDecision(choice);
    if (choice === "Yes") setShowBooking(true);
    if (choice === "Emergency") alert(`Nearest hospital: ${mockHospitals[0].name}`);
  };

  const menuItems = [
    { name: 'Dashboard', icon: faTachometerAlt, path: "/user/dashboard" },
    { name: 'Med Tracker', icon: faPills, path: "/user/medtracker" },
    { name: 'Meal Tracker', icon: faUtensils },
    { name: 'Sleep Tracker', icon: faBed },
    { name: 'Blood Pressure Tracker', icon: faHeartbeat },
    { name: 'Glucose Tracker', icon: faArrowTrendUp },
    { name: 'Exercise', icon: faDumbbell },
    { name: 'Chatrooms', icon: faComments },
    { name: 'Book Appointment', icon: faCalendarCheck, path: "/user/bookappointment" },
    { name: 'History', icon: faHistory },
    { name: 'My Patient file', icon: faHistory, path: "/user/patientrecords" },
    { name: 'Profile', icon: faUser },
  ];

  return (
    <div style={{ display: "flex" }}>
      <aside className="sidebar is-open">
        <div className="sidebar-header">
          <h3>Menu</h3>
        </div>
        <nav className="menu-nav">
          {menuItems.map((item, idx) => (
            <div key={idx} className="nav-item" onClick={() => item.path && navigate(item.path)}>
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
          <h1>Hi, {user.name}</h1>
        </header>

        <main className="dashboard-main">
          <h2 className="section-title">Book Appointment</h2>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label="📅 Manual" />
              <Tab label="🤖 Chatbot" />
            </Tabs>
          </Box>

          {activeTab === 0 && (
            <div className="space-y-4 p-4">
              <div>
                <label className="block font-semibold">Your Name:</label>
                <input
                  className="border px-3 py-2 rounded w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <p className="font-semibold">Select your symptoms:</p>
                {mockSymptoms.map(symptom => (
                  <label key={symptom} className="block">
                    <input
                      type="checkbox"
                      checked={selectedSymptoms.includes(symptom)}
                      onChange={() => handleSymptomChange(symptom)}
                    /> {symptom}
                  </label>
                ))}
              </div>

              <div>
                <p className="font-semibold">Nearest facility:</p>
                <p>{mockHospitals[0].name}</p>
              </div>

              <div>
                <p className="font-semibold">Do you want to book an appointment?</p>
                {['Yes', 'No', 'Emergency'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleDecision(opt)}
                    className="px-4 py-2 m-2 bg-blue-600 text-white rounded"
                  >{opt}</button>
                ))}
              </div>

              {showBooking && (
                <div className="space-y-2">
                  <input
                    type="date"
                    className="border px-3 py-2 rounded"
                    value={appointment.date}
                    onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
                  />
                  <input
                    type="time"
                    className="border px-3 py-2 rounded"
                    value={appointment.time}
                    onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
                  />
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={() => setConfirmed(true)}
                  >Confirm</button>
                </div>
              )}

              {confirmed && (
                <p className="text-green-700 font-semibold">Appointment booked for {appointment.date} at {appointment.time}.</p>
              )}
            </div>
          )}

          {activeTab === 1 && (
            <div className="p-4">
                <ChatUI userName={name} />
            </div>
            )}
        </main>
      </div>
    </div>
  );
}
