// src/components/QuickNotesCard.jsx
import React, { useState } from 'react';

export function QuickNotesCard() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');

  const addNote = () => {
    if (note.trim()) {
      setNotes([...notes, note]);
      setNote('');
    }
  };

  return (
    <div className="dashboard-card p-4 bg-white rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-2">Quick Notes</h3>
      <textarea
        className="w-full border rounded-md p-2 mb-2"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write a note..."
      />
      <button
        className="bg-blue-500 text-white px-4 py-1 rounded-md"
        onClick={addNote}
      >
        Add Note
      </button>
      <ul className="mt-2 list-disc list-inside">
        {notes.map((n, idx) => (
          <li key={idx}>{n}</li>
        ))}
      </ul>
    </div>
  );
}
