// src/components/PatientFeedbackCard.jsx
import React from 'react';
import Feedback from 'feeder-react-feedback';

export function PatientFeedbackCard() {
  return (
    <div className="dashboard-card p-4 bg-white rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-2">Patient Feedback</h3>
      <Feedback projectId="your-project-id" />
    </div>
  );
}



