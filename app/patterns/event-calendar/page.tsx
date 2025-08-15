'use client';

import { useState } from 'react';

export default function EventCalendarPattern() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  const events = [
    { id: 1, title: 'Team Meeting', date: '2024-01-15', time: '10:00 AM', type: 'meeting', color: 'blue' },
    { id: 2, title: 'Product Launch', date: '2024-01-18', time: '2:00 PM', type: 'event', color: 'green' },
    { id: 3, title: 'Client Call', date: '2024-01-20', time: '11:30 AM', type: 'call', color: 'purple' },
    { id: 4, title: 'Design Review', date: '2024-01-22', time: '3:00 PM', type: 'review', color: 'orange' },
    { id: 5, title: 'Sprint Planning', date: '2024-01-25', time: '9:00 AM', type: 'planning', color: 'red' },
    { id: 6, title: 'User Testing', date: '2024-01-28', time: '1:00 PM', type: 'testing', color: 'indigo' }
  ];

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getEventColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500',
      indigo: 'bg-indigo-500'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500';
  };

  const days = getDaysInMonth(selectedDate);
  const currentMonth = selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📅 Event Calendar Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Interactive calendar for managing events, appointments, and schedules with different view modes and event management.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            
            {/* Calendar Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  ←
                </button>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {currentMonth}
                </h3>
                <button
                  onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  →
                </button>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('month')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === 'month'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === 'week'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setViewMode('day')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === 'day'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Day
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Day Headers */}
              <div className="grid grid-cols-7 bg-gray-50 dark:bg-gray-700">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Days */}
              <div className="grid grid-cols-7">
                {days.map((day, index) => {
                  const isToday = day && day.toDateString() === new Date().toDateString();
                  const dayEvents = day ? getEventsForDate(day) : [];
                  
                  return (
                    <div
                      key={index}
                      className={`min-h-[100px] p-2 border-r border-b border-gray-200 dark:border-gray-700 ${
                        !day ? 'bg-gray-50 dark:bg-gray-900' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {day && (
                        <>
                          <div className={`text-sm font-medium mb-1 ${
                            isToday 
                              ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center'
                              : 'text-gray-900 dark:text-gray-100'
                          }`}>
                            {day.getDate()}
                          </div>
                          
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map(event => (
                              <div
                                key={event.id}
                                className={`text-xs p-1 rounded truncate text-white ${getEventColor(event.color)}`}
                                title={`${event.title} - ${event.time}`}
                              >
                                {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Event Legend */}
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Types</h4>
              <div className="flex flex-wrap gap-2">
                {['meeting', 'event', 'call', 'review', 'planning', 'testing'].map(type => (
                  <div key={type} className="flex items-center space-x-1">
                    <div className={`w-3 h-3 rounded-full ${getEventColor(type === 'meeting' ? 'blue' : type === 'event' ? 'green' : type === 'call' ? 'purple' : type === 'review' ? 'orange' : type === 'planning' ? 'red' : 'indigo')}`}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              💻 Code Example
            </h2>
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
              <button
                onClick={() => setActiveTab('jsx')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'jsx'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                JSX
              </button>
              <button
                onClick={() => setActiveTab('css')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'css'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                CSS
              </button>
            </div>

            {/* Tab Content */}
            <div className="code-block">
              {activeTab === 'jsx' ? (
                <pre className="text-sm leading-relaxed">
{`import { useState } from 'react';

export default function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');

  const events = [
    { id: 1, title: 'Team Meeting', date: '2024-01-15', time: '10:00 AM', type: 'meeting' },
    { id: 2, title: 'Product Launch', date: '2024-01-18', time: '2:00 PM', type: 'event' },
    { id: 3, title: 'Client Call', date: '2024-01-20', time: '11:30 AM', type: 'call' }
  ];

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const days = getDaysInMonth(selectedDate);
  const currentMonth = selectedDate.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className="calendar-container">
      {/* Calendar Controls */}
      <div className="calendar-controls">
        <div className="navigation-controls">
          <button
            onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
            className="nav-button"
          >
            ←
          </button>
          <h2 className="current-month">{currentMonth}</h2>
          <button
            onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
            className="nav-button"
          >
            →
          </button>
        </div>
        
        <div className="view-controls">
          <button
            onClick={() => setViewMode('month')}
            className={\`view-button \${viewMode === 'month' ? 'active' : ''}\`}
          >
            Month
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={\`view-button \${viewMode === 'week' ? 'active' : ''}\`}
          >
            Week
          </button>
          <button
            onClick={() => setViewMode('day')}
            className={\`view-button \${viewMode === 'day' ? 'active' : ''}\`}
          >
            Day
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {/* Day Headers */}
        <div className="calendar-header">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className="calendar-body">
          {days.map((day, index) => {
            const isToday = day && day.toDateString() === new Date().toDateString();
            const dayEvents = day ? getEventsForDate(day) : [];
            
            return (
              <div key={index} className={\`calendar-day \${!day ? 'empty' : ''}\`}>
                {day && (
                  <>
                    <div className={\`day-number \${isToday ? 'today' : ''}\`}>
                      {day.getDate()}
                    </div>
                    
                    <div className="day-events">
                      {dayEvents.slice(0, 2).map(event => (
                        <div key={event.id} className={\`event-item \${event.type}\`}>
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="more-events">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Legend */}
      <div className="event-legend">
        <h4>Event Types</h4>
        <div className="legend-items">
          {['meeting', 'event', 'call', 'review'].map(type => (
            <div key={type} className="legend-item">
              <div className={\`legend-color \${type}\`}></div>
              <span className="legend-label">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Calendar Container */
.calendar-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

/* Calendar Controls */
.calendar-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.navigation-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-button {
  padding: 0.5rem;
  border: none;
  background: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 1.125rem;
  color: #374151;
}

.nav-button:hover {
  background-color: #f3f4f6;
}

.current-month {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.view-controls {
  display: flex;
  gap: 0.5rem;
}

.view-button {
  padding: 0.5rem 1rem;
  border: none;
  background: #f3f4f6;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #374151;
}

.view-button:hover {
  background: #e5e7eb;
}

.view-button.active {
  background: #3b82f6;
  color: white;
}

/* Calendar Grid */
.calendar-grid {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Calendar Header */
.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.day-header {
  padding: 1rem 0.75rem;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  border-right: 1px solid #e5e7eb;
}

.day-header:last-child {
  border-right: none;
}

/* Calendar Body */
.calendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

/* Calendar Day */
.calendar-day {
  min-height: 120px;
  padding: 0.5rem;
  border-right: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s ease;
}

.calendar-day:hover {
  background-color: #f9fafb;
}

.calendar-day.empty {
  background-color: #f9fafb;
}

.calendar-day:last-child {
  border-right: none;
}

.calendar-day:nth-child(7n) {
  border-right: none;
}

/* Day Number */
.day-number {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
  margin-bottom: 0.5rem;
}

.day-number.today {
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

/* Day Events */
.day-events {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.event-item {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.event-item:hover {
  opacity: 0.8;
}

.event-item.meeting {
  background: #3b82f6;
}

.event-item.event {
  background: #10b981;
}

.event-item.call {
  background: #8b5cf6;
}

.event-item.review {
  background: #f59e0b;
}

.event-item.planning {
  background: #ef4444;
}

.event-item.testing {
  background: #6366f1;
}

.more-events {
  font-size: 0.75rem;
  color: #6b7280;
  font-style: italic;
}

/* Event Legend */
.event-legend {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.event-legend h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 1rem 0;
}

.legend-items {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-color {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
}

.legend-color.meeting {
  background: #3b82f6;
}

.legend-color.event {
  background: #10b981;
}

.legend-color.call {
  background: #8b5cf6;
}

.legend-color.review {
  background: #f59e0b;
}

.legend-color.planning {
  background: #ef4444;
}

.legend-color.testing {
  background: #6366f1;
}

.legend-label {
  font-size: 0.875rem;
  color: #6b7280;
  text-transform: capitalize;
}

/* Event Modal */
.event-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-content {
  background: white;
  border-radius: 0.5rem;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0.25rem;
}

.modal-close:hover {
  color: #374151;
}

.modal-body {
  margin-bottom: 1.5rem;
}

.event-detail {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.event-detail-icon {
  width: 1rem;
  height: 1rem;
  color: #9ca3af;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.modal-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.modal-button.primary {
  background: #3b82f6;
  color: white;
}

.modal-button.primary:hover {
  background: #2563eb;
}

.modal-button.secondary {
  background: #f3f4f6;
  color: #374151;
}

.modal-button.secondary:hover {
  background: #e5e7eb;
}

/* Responsive Design */
@media (max-width: 768px) {
  .calendar-container {
    padding: 1rem;
  }
  
  .calendar-controls {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .navigation-controls {
    justify-content: center;
  }
  
  .view-controls {
    justify-content: center;
  }
  
  .calendar-day {
    min-height: 80px;
    padding: 0.25rem;
  }
  
  .day-events {
    gap: 0.125rem;
  }
  
  .event-item {
    font-size: 0.625rem;
    padding: 0.125rem 0.25rem;
  }
  
  .legend-items {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .calendar-header {
    grid-template-columns: repeat(7, 1fr);
  }
  
  .calendar-body {
    grid-template-columns: repeat(7, 1fr);
  }
  
  .day-header {
    padding: 0.5rem 0.25rem;
    font-size: 0.75rem;
  }
  
  .calendar-day {
    min-height: 60px;
  }
  
  .day-number {
    font-size: 0.75rem;
  }
  
  .day-number.today {
    width: 1.25rem;
    height: 1.25rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .current-month {
    color: #f9fafb;
  }
  
  .nav-button {
    color: #d1d5db;
  }
  
  .nav-button:hover {
    background-color: #374151;
  }
  
  .view-button {
    background: #374151;
    color: #d1d5db;
  }
  
  .view-button:hover {
    background: #4b5563;
  }
  
  .view-button.active {
    background: #60a5fa;
  }
  
  .calendar-grid {
    background: #1f2937;
    border-color: #374151;
  }
  
  .calendar-header {
    background: #111827;
    border-color: #374151;
  }
  
  .day-header {
    color: #d1d5db;
    border-color: #374151;
  }
  
  .calendar-day {
    border-color: #374151;
  }
  
  .calendar-day:hover {
    background-color: #374151;
  }
  
  .calendar-day.empty {
    background-color: #111827;
  }
  
  .day-number {
    color: #f9fafb;
  }
  
  .more-events {
    color: #9ca3af;
  }
  
  .event-legend {
    background: #111827;
    border-color: #374151;
  }
  
  .event-legend h4 {
    color: #d1d5db;
  }
  
  .legend-label {
    color: #9ca3af;
  }
  
  .modal-content {
    background: #1f2937;
  }
  
  .modal-title {
    color: #f9fafb;
  }
  
  .modal-close {
    color: #9ca3af;
  }
  
  .modal-close:hover {
    color: #d1d5db;
  }
  
  .event-detail {
    color: #9ca3af;
  }
  
  .event-detail-icon {
    color: #6b7280;
  }
  
  .modal-button.secondary {
    background: #374151;
    color: #f9fafb;
  }
  
  .modal-button.secondary:hover {
    background: #4b5563;
  }
}`}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold mb-4 text-green-800 dark:text-green-200">
          ✨ Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Multiple Views</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Month, week, and day view modes</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Event Management</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Add, edit, and delete events with color coding</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Navigation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Easy month-to-month navigation</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Today Highlight</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current date is clearly highlighted</p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-semibold mb-4 text-purple-800 dark:text-purple-200">
          🎯 Common Use Cases
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🏢</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Business Scheduling</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage meetings, appointments, and deadlines</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📚</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Academic Planning</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Schedule classes, exams, and study sessions</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🎉</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Event Planning</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Organize events, parties, and social gatherings</p>
          </div>
        </div>
      </div>
    </div>
  );
}