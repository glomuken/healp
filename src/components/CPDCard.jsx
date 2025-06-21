import React from "react";

export default function CPDCard({ activities = [] }) {
  return (
    <div className="dashboard-card">
      <h3>CPD Activities</h3>
      <div>

        {activities.length === 0 ? (
          <p>No CPD activities recorded.</p>
        ) : (
          <ul
             style={{
                  backgroundColor: "#e0f0ff",
                  borderLeft: "4px solid #1e3a8a",
                  padding: "1em",
                  borderRadius: "0.5rem"
                }}
          >
            {activities.map((activity, idx) => (
              <li key={idx}>
                <strong>{activity.date}</strong>: {activity.title}
              </li>
            ))}
          </ul>
        )}

      </div>
      
    </div>
  );
}
