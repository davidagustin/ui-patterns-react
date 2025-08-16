"use client";
import { useState, useRef, useEffect } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  type: string;
  color: string;
  description?: string;
}
export default function EventCalendarPattern() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedDateForEvent, setSelectedDateForEvent] = useState<Date | null>(
    null,
  );
  const [draggedEvent, setDraggedEvent] = useState<Event | null>(null);
  const dragOverDate = useRef<string | null>(null);
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Team Meeting",
      date: "2024-01-15",
      time: "10:00",
      type: "meeting",
      color: "blue",
      description:
        "Weekly team sync to discuss project progress and upcoming deliverables.",
    },
    {
      id: 2,
      title: "Product Launch",
      date: "2024-01-18",
      time: "14:00",
      type: "event",
      color: "green",
      description: "Official launch event for the new product release.",
    },
    {
      id: 3,
      title: "Client Call",
      date: "2024-01-20",
      time: "11:30",
      type: "call",
      color: "purple",
      description: "Important client meeting to review project requirements.",
    },
    {
      id: 4,
      title: "Design Review",
      date: "2024-01-22",
      time: "15:00",
      type: "review",
      color: "orange",
      description:
        "Review UI/UX designs with the design team and stakeholders.",
    },
    {
      id: 5,
      title: "Sprint Planning",
      date: "2024-01-25",
      time: "09:00",
      type: "planning",
      color: "red",
      description: "Plan the next sprint and assign tasks to team members.",
    },
    {
      id: 6,
      title: "User Testing",
      date: "2024-01-28",
      time: "13:00",
      type: "testing",
      color: "indigo",
      description: "Conduct user testing sessions for the new feature.",
    },
  ]);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    time: "",
    type: "meeting",
    color: "blue",
    description: "",
  });
  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return events.filter((event) => event.date === dateStr);
  };
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour24 = parseInt(hours);
    const hour12 = hour24 % 12 || 12;
    const ampm = hour24 >= 12 ? "PM" : "AM";
    return `${hour12}:${minutes} ${ampm}`;
  };
  const handleDateClick = (date: Date) => {
    setSelectedDateForEvent(date);
    setIsCreating(true);
    setSelectedEvent(null);
    setNewEvent({
      title: "",
      time: "",
      type: "meeting",
      color: "blue",
      description: "",
      date: date.toISOString().split("T")[0],
    });
    setShowEventModal(true);
  };
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsCreating(false);
    setNewEvent(event);
    setShowEventModal(true);
  };
  const handleSaveEvent = () => {
    if (!newEvent.title || !newEvent.time) return;
    if (isCreating) {
      const event: Event = {
        id: Math.max(...events.map((e) => e.id), 0) + 1,
        title: newEvent.title!,
        date:
          selectedDateForEvent?.toISOString().split("T")[0] || newEvent.date!,
        time: newEvent.time!,
        type: newEvent.type!,
        color: newEvent.color!,
        description: newEvent.description || "",
      };
      setEvents([...events, event]);
    } else if (selectedEvent) {
      setEvents(
        events.map((e) =>
          e.id === selectedEvent.id ? ({ ...e, ...newEvent } as Event) : e,
        ),
      );
    }
    setShowEventModal(false);
    setSelectedEvent(null);
    setIsCreating(false);
  };
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter((e) => e.id !== selectedEvent.id));
      setShowEventModal(false);
      setSelectedEvent(null);
    }
  };
  const handleCloseModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
    setIsCreating(false);
  };
  const handleDragStart = (e: React.DragEvent, event: Event) => {
    setDraggedEvent(event);
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDragOver = (e: React.DragEvent, date: Date) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    dragOverDate.current = date.toISOString().split("T")[0];
  };
  const handleDrop = (e: React.DragEvent, date: Date) => {
    e.preventDefault();
    if (draggedEvent) {
      const newDate = date.toISOString().split("T")[0];
      setEvents(
        events.map((event) =>
          event.id === draggedEvent.id ? { ...event, date: newDate } : event,
        ),
      );
      setDraggedEvent(null);
    }
    dragOverDate.current = null;
  };
  const handleDragEnd = () => {
    setDraggedEvent(null);
    dragOverDate.current = null;
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
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };
  const getEventColor = (color: string) => {
    const colors = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500",
      red: "bg-red-500",
      indigo: "bg-indigo-500",
    };
    return colors[color as keyof typeof colors] || "bg-gray-500";
  };
  const days = getDaysInMonth(selectedDate);
  const currentMonth = selectedDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📅 Event Calendar Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Interactive calendar for managing events, appointments, and schedules
          with different view modes and event management.
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() =>
                    setSelectedDate(
                      new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth() - 1,
                        1,
                      ),
                    )
                  }
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                >
                  ←
                </button>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 min-w-[180px] text-center">
                  {currentMonth}
                </h3>
                <button
                  onClick={() =>
                    setSelectedDate(
                      new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth() + 1,
                        1,
                      ),
                    )
                  }
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                >
                  →
                </button>
                <button
                  onClick={() => setSelectedDate(new Date())}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Today
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setSelectedDateForEvent(new Date());
                    setIsCreating(true);
                    setSelectedEvent(null);
                    setNewEvent({
                      title: "",
                      time: "",
                      type: "meeting",
                      color: "blue",
                      description: "",
                      date: new Date().toISOString().split("T")[0],
                    });
                    setShowEventModal(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center space-x-2"
                >
                  <span>+</span>
                  <span>Add Event</span>
                </button>
                <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("month")}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      viewMode === "month"
                        ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setViewMode("week")}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      viewMode === "week"
                        ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setViewMode("day")}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      viewMode === "day"
                        ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                  >
                    Day
                  </button>
                </div>
              </div>
            </div>
            {/* Calendar Grid */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Day Headers */}
              <div className="grid grid-cols-7 bg-gray-50 dark:bg-gray-700">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>
              {/* Calendar Days */}
              <div className="grid grid-cols-7">
                {days.map((day, index) => {
                  const isToday =
                    day && day.toDateString() === currentDate.toDateString();
                  const dayEvents = day ? getEventsForDate(day) : [];
                  const isDragOver =
                    day &&
                    dragOverDate.current === day.toISOString().split("T")[0];
                  return (
                    <div
                      key={index}
                      className={`min-h-[120px] p-2 border-r border-b border-gray-200 dark:border-gray-700 transition-colors ${
                        !day
                          ? "bg-gray-50 dark:bg-gray-900"
                          : isDragOver
                            ? "bg-blue-100 dark:bg-blue-900/30"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      }`}
                      onClick={() => day && handleDateClick(day)}
                      onDragOver={(e) => day && handleDragOver(e, day)}
                      onDrop={(e) => day && handleDrop(e, day)}
                    >
                      {day && (
                        <>
                          <div
                            className={`text-sm font-medium mb-2 ${
                              isToday
                                ? "bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                : "text-gray-900 dark:text-gray-100"
                            }`}
                          >
                            {day.getDate()}
                          </div>
                          <div className="space-y-1">
                            {dayEvents.slice(0, 3).map((event) => (
                              <div
                                key={event.id}
                                className={`text-xs p-1 rounded truncate text-white cursor-pointer hover:opacity-80 transition-opacity ${getEventColor(event.color)}`}
                                title={`${event.title} - ${formatTime(event.time)}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEventClick(event);
                                }}
                                draggable
                                onDragStart={(e) => handleDragStart(e, event)}
                                onDragEnd={handleDragEnd}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="truncate">
                                    {event.title}
                                  </span>
                                  <span className="text-xs opacity-75 ml-1">
                                    ⋯
                                  </span>
                                </div>
                              </div>
                            ))}
                            {dayEvents.length > 3 && (
                              <div className="text-xs text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
                                +{dayEvents.length - 3} more
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
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Event Types
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "meeting",
                  "event",
                  "call",
                  "review",
                  "planning",
                  "testing",
                ].map((type) => (
                  <div key={type} className="flex items-center space-x-1">
                    <div
                      className={`w-3 h-3 rounded-full ${getEventColor(type === "meeting" ? "blue" : type === "event" ? "green" : type === "call" ? "purple" : type === "review" ? "orange" : type === "planning" ? "red" : "indigo")}`}
                    ></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                      {type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Quick Stats */}
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Total Events:{" "}
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {events.length}
                  </span>
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  This Month:{" "}
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {
                      events.filter((event) => {
                        const eventDate = new Date(event.date);
                        return (
                          eventDate.getMonth() === selectedDate.getMonth() &&
                          eventDate.getFullYear() === selectedDate.getFullYear()
                        );
                      }).length
                    }
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Event Modal */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {isCreating ? "Create Event" : "Edit Event"}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl font-bold"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Event Title
                  </label>
                  <input
                    type="text"
                    value={newEvent.title || ""}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter event title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newEvent.time || ""}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, time: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Event Type
                  </label>
                  <select
                    value={newEvent.type || "meeting"}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, type: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="meeting">Meeting</option>
                    <option value="event">Event</option>
                    <option value="call">Call</option>
                    <option value="review">Review</option>
                    <option value="planning">Planning</option>
                    <option value="testing">Testing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color
                  </label>
                  <div className="flex space-x-2">
                    {["blue", "green", "purple", "orange", "red", "indigo"].map(
                      (color) => (
                        <button
                          key={color}
                          onClick={() => setNewEvent({ ...newEvent, color })}
                          className={`w-8 h-8 rounded-full ${getEventColor(color)} border-2 ${
                            newEvent.color === color
                              ? "border-gray-900 dark:border-gray-100"
                              : "border-transparent"
                          }`}
                        />
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={newEvent.description || ""}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Enter event description"
                  />
                </div>
                {selectedEvent && (
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(selectedEvent.date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Type:</strong> {selectedEvent.type}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleSaveEvent}
                  disabled={!newEvent.title || !newEvent.time}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {isCreating ? "Create Event" : "Save Changes"}
                </button>
                {!isCreating && (
                  <button
                    onClick={handleDeleteEvent}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Delete
                  </button>
                )}
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Code Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              💻 Code Example
            </h2>
            {/* Tab Content */}
            <div className="code-block">
              <DynamicCodeExample componentName="event-calendar" />
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
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Interactive Event Creation
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click on any date to create events instantly
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Drag & Drop Events
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Move events between dates by dragging
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Event Editing Modal
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Full-featured modal for editing event details
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Smart Navigation
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Month navigation with today button and view switcher
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Color-Coded Events
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Customizable colors and event types
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Event Statistics
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Quick stats showing total and monthly events
              </p>
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
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Business Scheduling
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage meetings, appointments, and deadlines
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📚</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Academic Planning
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Schedule classes, exams, and study sessions
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🎉</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Event Planning
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Organize events, parties, and social gatherings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
