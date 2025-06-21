import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt, faPills, faUtensils, faBed,
  faHeartbeat, faArrowTrendUp, faDumbbell, faComments,
  faCalendarCheck, faHistory, faUser, faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import './Sidebar.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Optional but recommended for styling
import './MedTracker.css'; // Custom styles for MedTracker



export default function MedTracker() {
  const user = JSON.parse(localStorage.getItem("loggedInUser")) || { email: "guest@example.com", name: "User" };
  const webcamRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [medData, setMedData] = useState(() => {
    return JSON.parse(localStorage.getItem(`${user.email}_medData`)) || [];
  });
  const navigate = useNavigate();
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newMed, setNewMed] = useState({ image: null, dosage: '', sideEffects: '', usage: '' });


  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem(`${user.email}_medImages`)) || [];
    setCapturedImages(existing);
  }, [user.email]);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    const timestamp = format(new Date(), "yyyy-MM-dd_HH-mm-ss");
    const image = { fileName: `${timestamp}.jpg`, dataUrl: imageSrc };

    const updated = [...capturedImages, image];
    localStorage.setItem(`${user.email}_medImages`, JSON.stringify(updated));
    setCapturedImages(updated);
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

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate('/user/login');
  };

  const handleMenuClick = (item) => {
    if (item.path) {
      navigate(item.path);
    }
  };

  const groupImagesByDate = () => {
    const groups = {};
    capturedImages.forEach(img => {
      const dateStr = img.fileName.split("_")[0]; // "yyyy-MM-dd"
      const timeStr = img.fileName.split("_")[1]?.replace(/-/g, ":")?.replace(".jpg", ""); // "HH:mm:ss"
      if (!groups[dateStr]) groups[dateStr] = [];
      groups[dateStr].push({ ...img, time: timeStr });
    });
    return groups;
  };

  const groupedImages = groupImagesByDate();


  return (
    <div style={{ display: "flex", width: "100vw" }}>
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
          <h1>Hi, {user.name}</h1>
        </header>

        <main className="dashboard-main">
          <h2 className="section-title">Med Tracker</h2>

          <div className="flex mb-4 space-x-4 justify-between">
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                aria-label="med tracker tabs"
              >
                <Tab label="📷 Snap Medication" />
                <Tab label="💊 Meds" />
                <Tab label="📅 Tab 3"/>
              </Tabs>
            </Box>

          </div>


          {activeTab === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="rounded shadow-md w-full"
                  videoConstraints={{ facingMode: "environment" }}
                />
                <button
                  onClick={captureImage}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  📸 Capture
                </button>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Captured Images</h2>
                {capturedImages.length === 0 ? (
                  <p>No images yet.</p>
                ) : (
                  <ul className="space-y-2 max-h-64 overflow-y-auto">
                    {capturedImages.map((img, idx) => (
                      <li key={idx} className="border p-2 rounded shadow-sm">
                        <p className="text-sm text-gray-600">{img.fileName}</p>
                        <img src={img.dataUrl} alt={img.fileName} className="mt-1 max-h-40 object-contain" />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

          )}

          {activeTab === 1 && (
            <div className="flex flex-col min-h-[180vh] justify-between" style={{ marginTop: 0, paddingTop: 0 }}>
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setShowUploadPopup(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  ➕ Upload Med
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow overflow-y-auto">
                {medData.length === 0 ? (
                  <p className="text-gray-500 col-span-full">No meds uploaded.</p>
                ) : (
                  medData.map((med, idx) => (
                    <div key={idx} className="bg-white shadow rounded p-4 h-full flex flex-col justify-between">
                      <img src={med.image} alt={`Med ${idx}`} className="h-32 w-full object-contain mb-2" />
                      <div>
                        <p className="text-sm"><strong>Dosage:</strong> {med.dosage}</p>
                        <p className="text-sm"><strong>Side Effects:</strong> {med.sideEffects}</p>
                        <p className="text-sm"><strong>Usage:</strong> {med.usage}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {showUploadPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowUploadPopup(false)}
                >
                  ✖
                </button>
                <h3 className="text-lg font-bold mb-4">Upload Med</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newMed.image) return;
                    const updated = [...medData, newMed];
                    setMedData(updated);
                    localStorage.setItem(`${user.email}_medData`, JSON.stringify(updated));
                    setNewMed({ image: null, dosage: '', sideEffects: '', usage: '' });
                    setShowUploadPopup(false);
                  }}
                  className="space-y-4"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setNewMed((prev) => ({
                        ...prev,
                        image: URL.createObjectURL(e.target.files[0]),
                      }))
                    }
                    required
                  />
                  <input
                    type="text"
                    placeholder="Dosage"
                    value={newMed.dosage}
                    onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                    className="border w-full px-3 py-2 rounded"
                    required
                  />
                  <textarea
                    placeholder="Side Effects"
                    value={newMed.sideEffects}
                    onChange={(e) => setNewMed({ ...newMed, sideEffects: e.target.value })}
                    className="border w-full px-3 py-2 rounded"
                    rows="2"
                    required
                  />
                  <textarea
                    placeholder="Usage Directions"
                    value={newMed.usage}
                    onChange={(e) => setNewMed({ ...newMed, usage: e.target.value })}
                    className="border w-full px-3 py-2 rounded"
                    rows="2"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                  >
                    Save Med
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="p-4 w-full flex justify-center">
              <div className="w-full max-w-6xl">
                <h2 className="text-xl font-semibold mb-4">📅 Medication Snap History</h2>
                <Calendar
                  tileContent={({ date, view }) => {
                    const dateStr = format(date, "yyyy-MM-dd");
                    const snaps = groupedImages[dateStr];
                    if (view === "month" && snaps?.length) {
                      return (
                        <ul>
                          {snaps.map((snap, i) => (
                            <li key={i}>
                              <button
                                onClick={() => setSelectedImage(snap.dataUrl)}
                                title={`Taken at ${snap.time}`}
                              >
                                📷
                              </button>
                              <span>{snap.time}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return null;
                  }}
                />
              </div>
            </div>
          )}



          {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg relative max-w-4xl w-full">                <button
                  className="absolute top-1 right-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedImage(null)}
                >✖</button>
                <img src={selectedImage} alt="Captured Med" className="max-h-[80vh] max-w-full rounded" />
              </div>
            </div>
          )}



        </main>
      </div>
    </div>
  );
}
