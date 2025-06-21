// PatientHistoryPage.jsx
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt, faPills, faUtensils, faBed,
  faHeartbeat, faArrowTrendUp, faDumbbell, faComments,
  faCalendarCheck, faHistory, faUser, faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import './Sidebar.css';
import HistoryFormModal from './HistoryFormModal';

export default function PatientHistoryPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  const [showModal, setShowModal] = useState(false);
  const [patientHistory, setPatientHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("history_" + user.email)) || null;
  });

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/user/login");
  };

  const saveHistory = (data) => {
    localStorage.setItem("history_" + user.email, JSON.stringify(data));
    setPatientHistory(data);
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
    { name: 'My Patient file', icon: faHistory, path: "/user/patientrecords" },
    { name: 'Profile', icon: faUser },

  ];

  return (
    <div style={{ display: "flex" }}>
      <aside className="sidebar is-open">
        <div className="sidebar-header"><h3>Menu</h3></div>
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

      <div className={`main-content ${showModal ? 'blur-sm brightness-75 transition-all' : ''}`}>
        <header className="main-header">
          <h1>Patient History</h1>
        </header>

        <main className="dashboard-main p-4">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Patient Info</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Date of Birth:</strong> {user.dob}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user.idNumber}</p>
            <p><strong>Postal Code:</strong> {user.postalCode}</p>
          </div>

          {patientHistory ? (
            <div className="mt-6 bg-white shadow p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Medical History</h2>
              <p><strong>Chronic Illnesses:</strong> {patientHistory.chronicIllnesses}</p>
              <p><strong>Medications:</strong> {patientHistory.medications}</p>
              <p><strong>Allergies:</strong> {patientHistory.allergies}</p>
              <p><strong>Surgeries:</strong> {patientHistory.surgeries}</p>
              <p><strong>Family History:</strong> {patientHistory.familyHistory}</p>
              <p><strong>Lifestyle Notes:</strong> {patientHistory.lifestyle}</p>
            </div>
          ) : (
            <div className="mt-6">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setShowModal(true)}
              >
                ➕ Add History
              </button>
            </div>
          )}
        </main>
      </div>

      {showModal && <HistoryFormModal onClose={() => setShowModal(false)} onSave={saveHistory} />}
    </div>
  );
}
