"use client";
import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
import Tooltip from "../../../components/Tooltip";
export default function CalendarPickerPattern() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTime, setSelectedTime] = useState("12:00");
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek };
  };
  const getMonthName = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };
  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    );
  };
  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };
  const handleDateSelect = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    setSelectedDate(newDate);
    setShowCalendar(false);
  };
  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };
  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
  };
  const formatSelectedDate = () => {
    if (!selectedDate) return "Select a date";
    return selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const renderCalendar = () => {
    const days = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    // Add day headers
    dayNames.forEach((day) => {
      days.push(
        <div
          key={day}
          className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2"
        >
          {day}
        </div>,
      );
    });
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`h-10 w-10 rounded-full text-sm font-medium transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-900/20 ${
            isToday(day)
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : isSelected(day)
                ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          }`}
        >
          {day}
        </button>,
      );
    }
    return days;
  };
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📅 Calendar Picker Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Provide intuitive date and time selection with a visual calendar
          interface and time picker.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Click the date input to open the calendar picker. Select a date
              and time to see the pattern in action.
            </p>
            <div className="space-y-4">
              {/* Date Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Date & Time
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={
                      selectedDate
                        ? `${formatSelectedDate()} at ${selectedTime}`
                        : "Click to select date and time"
                    }
                    onClick={() => setShowCalendar(!showCalendar)}
                    readOnly
                    className="input-field cursor-pointer"
                    placeholder="Select date and time"
                  />
                  <Tooltip content="Open calendar">
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      📅
                    </div>
                  </Tooltip>
                </div>
              </div>
              {/* Calendar Popup */}
              {showCalendar && (
                <div className="absolute z-10 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 min-w-[320px]">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-4">
                    <Tooltip content="Previous month">
                      <button
                        onClick={goToPreviousMonth}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        aria-label="Previous month"
                      >
                        ←
                      </button>
                    </Tooltip>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {getMonthName(currentMonth)}
                    </h3>
                    <Tooltip content="Next month">
                      <button
                        onClick={goToNextMonth}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        aria-label="Next month"
                      >
                        →
                      </button>
                    </Tooltip>
                  </div>
                  {/* Today Button */}
                  <div className="mb-4">
                    <button
                      onClick={goToToday}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      Go to Today
                    </button>
                  </div>
                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {renderCalendar()}
                  </div>
                  {/* Time Picker */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="input-field"
                    />
                  </div>
                  {/* Action Buttons */}
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => setShowCalendar(false)}
                      className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setShowCalendar(false)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      OK
                    </button>
                  </div>
                </div>
              )}
              {/* Selected Date Display */}
              {selectedDate && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Tooltip content="Date selected">
                      <span className="text-green-600 dark:text-green-400">
                        ✅
                      </span>
                    </Tooltip>
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">
                        Selected: {formatSelectedDate()}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Time: {selectedTime}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Code Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              💻 Code Example
            </h2>
            {/* Tab Content */}
            <div className="code-block">
              <DynamicCodeExample componentName="calendar-picker" />
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
                Visual Calendar
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Intuitive month view with day selection
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Time Picker
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select both date and time in one interface
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Navigation
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Easy month navigation and today button
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Today Highlighting
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Current date is visually highlighted
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
            <div className="text-2xl mb-2">📅</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Event Scheduling
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Book appointments and schedule meetings
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">✈️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Travel Booking
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Select departure and arrival dates
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📝</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Form Input
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Date and time fields in forms
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
