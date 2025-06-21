import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export function CalendarCard({ events }) {
  return (
    <div className="dashboard-card p-4 bg-white rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-2">Calendar</h3>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 300 }}
      />
    </div>
  );
}