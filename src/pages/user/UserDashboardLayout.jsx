import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faPills,
  faDumbbell,
  faCalendarCheck,
  faHistory,
  faUser,
  faUtensils,
  faComments,
  faSignInAlt,
  faSignOutAlt,
  faBed,
  faHeartbeat,
  faHeart,
  faArrowTrendUp
} from "@fortawesome/free-solid-svg-icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import './Sidebar.css';

export default function UserDashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', fileNumber: '' });

  useEffect(() => {
    const name = location.state?.name || 'User';
    const fileNumber = location.state?.fileNumber || `HEALP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setUser({ name, fileNumber });
  }, [location]);

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
    { name: 'Profile', icon: faUser }
  ];

  const handleLogout = () => {
    navigate('/user/login');
  };

   const handleMenuClick = (item) => {
    navigate(item.path);
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
          <h1>Hi, {user.name}</h1>
        </header>

        <main className="dashboard-main">
          <h2 className="section-title">Dashboard</h2>
          <div className="card-grid">
            <div className="dashboard-card">
              <h3>File Number</h3>
              <p>{user.fileNumber}</p>

               <h3>Next Appointment</h3>
              <p><strong>📅 Date:</strong> 2024-06-01</p>
              <p><strong>🕘 Time:</strong> 10:00 AM</p>
              <p><strong>👨‍⚕️ With:</strong> Dr. Jane Doe</p>
            </div>

            <div className="dashboard-card">
              <h3>Medication Reminders</h3>
              <ul>
                <li>💊 08:00 AM - Vitamin D</li>
                <li>💊 01:00 PM - Antibiotic</li>
                <li>💊 09:00 PM - Sleep Aid</li>
              </ul>
            </div>

            
            <div className="dashboard-card" style={{ minHeight: '300px' }}>
              <h3>Sleep Tracker</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[{ day: 'Mon', hours: 6 }, { day: 'Tue', hours: 7 }, { day: 'Wed', hours: 5 }] }>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="dashboard-card" style={{ minHeight: '300px' }}>
              <h3>Steps</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[{ day: 'Mon', steps: 5000 }, { day: 'Tue', steps: 6500 }, { day: 'Wed', steps: 4000 }] }>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="steps" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="dashboard-card" style={{ minHeight: '300px' }}>
                <h3>Water Intake (Liters)</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[
                    { day: 'Mon', liters: 1.5 },
                    { day: 'Tue', liters: 2 },
                    { day: 'Wed', liters: 1.2 },
                    { day: 'Thu', liters: 2.5 },
                    ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="liters" fill="#00BFFF" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="dashboard-card">
                <h3>Mood Tracking</h3>
                <table style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
                    <thead>
                    <tr>
                        <th>Day</th>
                        <th>Mood</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Mon</td>
                        <td>😊</td>
                    </tr>
                    <tr>
                        <td>Tue</td>
                        <td>😐</td>
                    </tr>
                    <tr>
                        <td>Wed</td>
                        <td>😔</td>
                    </tr>
                    <tr>
                        <td>Thu</td>
                        <td>😁</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="dashboard-card">
              <h3>Glucose Tracker (mg/dL)</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr>
                    <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Day</th>
                    <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Time</th>
                    <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Level</th>
                    <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { day: 'Mon', time: '08:00 AM', level: 95 },
                    { day: 'Mon', time: '08:00 PM', level: 140 },
                    { day: 'Tue', time: '08:00 AM', level: 100 },
                    { day: 'Tue', time: '08:00 PM', level: 165 },
                    { day: 'Wed', time: '08:00 AM', level: 120 },
                    { day: 'Wed', time: '08:00 PM', level: 180 }
                  ].map((g, idx) => {
                    const status =
                      g.level < 70
                        ? 'Low'
                        : g.level > 160
                        ? 'High'
                        : 'Normal';
                    const bgColor =
                      status === 'Low'
                        ? '#ffe0e0'
                        : status === 'High'
                        ? '#fff0b3'
                        : '#e0ffe0';

                    return (
                      <tr key={idx} style={{ backgroundColor: bgColor }}>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{g.day}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{g.time}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{g.level}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                          <strong>{status}</strong>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="dashboard-card">
              <h3>Blood Pressure Tracker (mmHg)</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr>
                    <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Day</th>
                    <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Time</th>
                    <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Systolic</th>
                    <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Diastolic</th>
                    <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { day: 'Mon', time: '08:00 AM', sys: 118, dia: 76 },
                    { day: 'Mon', time: '08:00 PM', sys: 130, dia: 82 },
                    { day: 'Tue', time: '08:00 AM', sys: 125, dia: 79 },
                    { day: 'Tue', time: '08:00 PM', sys: 140, dia: 88 },
                    { day: 'Wed', time: '08:00 AM', sys: 150, dia: 95 },
                    { day: 'Wed', time: '08:00 PM', sys: 160, dia: 100 }
                  ].map((bp, idx) => {
                    const getStatus = (sys, dia) => {
                      if (sys < 120 && dia < 80) return 'Normal';
                      if (sys < 130 && dia < 80) return 'Elevated';
                      if ((sys < 140) || (dia < 90)) return 'Hypertension Stage 1';
                      return 'Hypertension Stage 2';
                    };

                    const status = getStatus(bp.sys, bp.dia);
                    const rowColor = {
                      'Normal': '#e0ffe0',
                      'Elevated': '#fff8d5',
                      'Hypertension Stage 1': '#ffe0b2',
                      'Hypertension Stage 2': '#ffc2c2'
                    }[status];

                    return (
                      <tr key={idx} style={{ backgroundColor: rowColor }}>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{bp.day}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{bp.time}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{bp.sys}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{bp.dia}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}><strong>{status}</strong></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>


            <div className="dashboard-card">
              <h3>Meal Tracker</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr>
                    <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Meal</th>
                    <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Calories</th>
                    <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Sugar (g)</th>
                    <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Salt (g)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { meal: 'Oatmeal', calories: 150, sugar: 1, salt: 0.1 },
                    { meal: 'Chicken Salad', calories: 300, sugar: 2, salt: 0.5 },
                    { meal: 'Fruit Smoothie', calories: 180, sugar: 14, salt: 0.2 },
                    { meal: 'Steak & Veggies', calories: 450, sugar: 0, salt: 0.7 }
                  ].map((m, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{m.meal}</td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{m.calories}</td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{m.sugar}</td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{m.salt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

        
            {/* Add other charts as needed */}
          </div>
        </main>
      </div>
    </div>
  );
}