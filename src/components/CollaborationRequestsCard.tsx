// src/components/CollaborationRequestsCard.jsx
import React from 'react';

export function CollaborationRequestsCard({ requests = [], onRespond = () => {} }) {
  return (
    <div className="dashboard-card p-4 bg-white rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-2">Collaboration Requests</h3>
      {requests.length === 0 ? (
        <p className="text-gray-500">No collaboration requests at the moment.</p>
      ) : (
        <ul className="space-y-2">
          {requests.map((req, idx) => (
            <li key={idx} className="border p-2 rounded-md">
              <div><strong>{req.from}:</strong> {req.message}</div>
              <div className="space-x-2 mt-1">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => onRespond(req.id, true)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => onRespond(req.id, false)}
                >
                  Decline
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
