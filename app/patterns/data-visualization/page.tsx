"use client";
import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
export default function DataVisualizationPattern() {
  const [selectedChart, setSelectedChart] = useState<
    "bar" | "line" | "pie" | "area"
  >("bar");
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">(
    "30d",
  );
  const [selectedMetric, setSelectedMetric] = useState<
    "sales" | "users" | "revenue"
  >("sales");
  // Sample data
  const salesData = {
    "7d": [120, 190, 300, 500, 200, 300, 450],
    "30d": [
      120, 190, 300, 500, 200, 300, 450, 280, 320, 400, 350, 420, 380, 290, 310,
      280, 350, 400, 450, 380, 320, 290, 350, 420, 380, 310, 280, 350, 400, 450,
    ],
    "90d": Array.from(
      { length: 90 },
      () => Math.floor(Math.random() * 500) + 100,
    ),
    "1y": Array.from(
      { length: 365 },
      () => Math.floor(Math.random() * 500) + 100,
    ),
  };
  const userData = {
    "7d": [50, 80, 120, 200, 150, 180, 220],
    "30d": [
      50, 80, 120, 200, 150, 180, 220, 160, 190, 240, 210, 250, 230, 170, 200,
      160, 220, 250, 280, 240, 200, 170, 220, 250, 240, 200, 160, 220, 250, 280,
    ],
    "90d": Array.from(
      { length: 90 },
      () => Math.floor(Math.random() * 300) + 50,
    ),
    "1y": Array.from(
      { length: 365 },
      () => Math.floor(Math.random() * 300) + 50,
    ),
  };
  const revenueData = {
    "7d": [1200, 1900, 3000, 5000, 2000, 3000, 4500],
    "30d": [
      1200, 1900, 3000, 5000, 2000, 3000, 4500, 2800, 3200, 4000, 3500, 4200,
      3800, 2900, 3100, 2800, 3500, 4000, 4500, 3800, 3200, 2900, 3500, 4200,
      3800, 3100, 2800, 3500, 4000, 4500,
    ],
    "90d": Array.from(
      { length: 90 },
      () => Math.floor(Math.random() * 5000) + 1000,
    ),
    "1y": Array.from(
      { length: 365 },
      () => Math.floor(Math.random() * 5000) + 1000,
    ),
  };
  const pieData = [
    { name: "Desktop", value: 45, color: "#3B82F6" },
    { name: "Mobile", value: 35, color: "#10B981" },
    { name: "Tablet", value: 20, color: "#F59E0B" },
  ];
  const getCurrentData = () => {
    switch (selectedMetric) {
      case "sales":
        return salesData[timeRange];
      case "users":
        return userData[timeRange];
      case "revenue":
        return revenueData[timeRange];
      default:
        return salesData[timeRange];
    }
  };
  const getMetricLabel = () => {
    switch (selectedMetric) {
      case "sales":
        return "Sales";
      case "users":
        return "Users";
      case "revenue":
        return "Revenue";
      default:
        return "Sales";
    }
  };
  const getMetricUnit = () => {
    switch (selectedMetric) {
      case "sales":
        return "units";
      case "users":
        return "users";
      case "revenue":
        return "$";
      default:
        return "units";
    }
  };
  const currentData = getCurrentData();
  const total = currentData.reduce((sum, value) => sum + value, 0);
  const average = Math.round(total / currentData.length);
  const max = Math.max(...currentData);
  const min = Math.min(...currentData);
  const renderBarChart = () => {
    const maxValue = Math.max(...currentData);
    return (
      <div className="h-64 flex items-end justify-between space-x-1">
        {currentData.slice(-10).map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-200 rounded-t cursor-pointer"
              style={{ height: `${(value / maxValue) * 200}px` }}
              title={`${getMetricLabel()}: ${value} ${getMetricUnit()}`}
            />
            <span className="text-xs text-gray-500 mt-1">{index + 1}</span>
          </div>
        ))}
      </div>
    );
  };
  const renderLineChart = () => {
    const maxValue = Math.max(...currentData);
    const points = currentData.slice(-10).map((value, index) => ({
      x: (index / 9) * 100,
      y: 100 - (value / maxValue) * 100,
    }));
    const pathData = points
      .map(
        (point, index) => `${index === 0 ? "M" : "L"} ${point.x}% ${point.y}%`,
      )
      .join(" ");
    return (
      <div className="h-64 relative">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d={pathData}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.map((point, index) => (
            <circle
              key={index}
              cx={`${point.x}%`}
              cy={`${point.y}%`}
              r="2"
              fill="#3B82F6"
              className="hover:r-3 transition-all duration-200"
            />
          ))}
        </svg>
      </div>
    );
  };
  const renderAreaChart = () => {
    const maxValue = Math.max(...currentData);
    const points = currentData.slice(-10).map((value, index) => ({
      x: (index / 9) * 100,
      y: 100 - (value / maxValue) * 100,
    }));
    const pathData =
      points
        .map(
          (point, index) =>
            `${index === 0 ? "M" : "L"} ${point.x}% ${point.y}%`,
        )
        .join(" ") + ` L 100% 100% L 0% 100% Z`;
    return (
      <div className="h-64 relative">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d={pathData}
            fill="url(#areaGradient)"
            stroke="#3B82F6"
            strokeWidth="1"
          />
        </svg>
      </div>
    );
  };
  const renderPieChart = () => {
    const total = pieData.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    return (
      <div className="h-64 flex items-center justify-center">
        <svg className="w-48 h-48" viewBox="0 0 100 100">
          {pieData.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (percentage / 100) * 360;
            const startAngle = currentAngle;
            currentAngle += angle;
            const x1 = 50 + 40 * Math.cos(((startAngle - 90) * Math.PI) / 180);
            const y1 = 50 + 40 * Math.sin(((startAngle - 90) * Math.PI) / 180);
            const x2 =
              50 + 40 * Math.cos(((currentAngle - 90) * Math.PI) / 180);
            const y2 =
              50 + 40 * Math.sin(((currentAngle - 90) * Math.PI) / 180);
            const largeArcFlag = angle > 180 ? 1 : 0;
            const pathData = [
              `M 50 50`,
              `L ${x1} ${y1}`,
              `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              "Z",
            ].join(" ");
            return (
              <path
                key={index}
                d={pathData}
                fill={item.color}
                className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
              />
            );
          })}
          <circle cx="50" cy="50" r="15" fill="white" />
        </svg>
      </div>
    );
  };
  const renderChart = () => {
    switch (selectedChart) {
      case "bar":
        return renderBarChart();
      case "line":
        return renderLineChart();
      case "area":
        return renderAreaChart();
      case "pie":
        return renderPieChart();
      default:
        return renderBarChart();
    }
  };
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📊 Data Visualization Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Interactive charts and graphs for displaying complex data with
          filtering, real-time updates, and responsive design.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            {/* Chart Controls */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Chart Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "bar", label: "Bar Chart", icon: "📊" },
                    { key: "line", label: "Line Chart", icon: "📈" },
                    { key: "area", label: "Area Chart", icon: "📉" },
                    { key: "pie", label: "Pie Chart", icon: "🥧" },
                  ].map((chart) => (
                    <button
                      key={chart.key}
                      onClick={() => setSelectedChart(chart.key as any)}
                      className={`p-3 rounded-lg border transition-all duration-200 ${
                        selectedChart === chart.key
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                          : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                      }`}
                    >
                      <div className="text-lg mb-1">{chart.icon}</div>
                      <div className="text-xs font-medium">{chart.label}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Metric Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Metric
                </label>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                >
                  <option value="sales">Sales</option>
                  <option value="users">Users</option>
                  <option value="revenue">Revenue</option>
                </select>
              </div>
              {/* Time Range Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "7d", label: "7 Days" },
                    { key: "30d", label: "30 Days" },
                    { key: "90d", label: "90 Days" },
                    { key: "1y", label: "1 Year" },
                  ].map((range) => (
                    <button
                      key={range.key}
                      onClick={() => setTimeRange(range.key as any)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                        timeRange === range.key
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                          : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Chart Display */}
            <div className="mt-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {getMetricLabel()} -{" "}
                    {timeRange === "7d"
                      ? "7 Days"
                      : timeRange === "30d"
                        ? "30 Days"
                        : timeRange === "90d"
                          ? "90 Days"
                          : "1 Year"}
                  </h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedChart === "pie"
                      ? "Device Distribution"
                      : `${currentData.length} data points`}
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center">
                  {renderChart()}
                </div>
                {/* Stats */}
                {selectedChart !== "pie" && (
                  <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {total.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Total
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {average.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Average
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {max.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Max
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {min.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Min
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Code Example */}
{<DynamicCodeExample componentName="data-visualization" />}
                      <div className="text-xs font-medium">{chart.label}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Metric Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Metric
                </label>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                >
                  <option value="sales">Sales</option>
                  <option value="users">Users</option>
                  <option value="revenue">Revenue</option>
                </select>
              </div>
              {/* Time Range Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "7d", label: "7 Days" },
                    { key: "30d", label: "30 Days" },
                    { key: "90d", label: "90 Days" },
                    { key: "1y", label: "1 Year" },
                  ].map((range) => (
                    <button
                      key={range.key}
                      onClick={() => setTimeRange(range.key as any)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                        timeRange === range.key
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                          : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Chart Display */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {getMetricLabel()} Analytics
              </h2>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {timeRange === "7d"
                  ? "Last 7 days"
                  : timeRange === "30d"
                    ? "Last 30 days"
                    : timeRange === "90d"
                      ? "Last 90 days"
                      : "Last year"}
              </div>
            </div>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {total.toLocaleString()}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Average
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {average.toLocaleString()}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Max
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {max.toLocaleString()}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Min
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {min.toLocaleString()}
                </div>
              </div>
            </div>
            {/* Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              {renderChart()}
            </div>
            {/* Legend for Pie Chart */}
            {selectedChart === "pie" && (
              <div className="mt-4 flex justify-center space-x-4">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.name} ({item.value}%)
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Code Example */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          💻 Code Example
        </h2>
        {/* Tab Content */}
        <div className="code-block">
          {<DynamicCodeExample componentName="data-visualization" />}
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
                Multiple Chart Types
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Bar, line, area, and pie charts with smooth transitions
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Interactive Controls
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Real-time chart switching and data filtering
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Key Metrics Display
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Summary statistics and data insights
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Responsive Design
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Charts adapt to different screen sizes
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
            <div className="text-2xl mb-2">📈</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Analytics Dashboards
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Business intelligence and performance tracking
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Financial Reports
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Revenue, expenses, and financial metrics
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">👥</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              User Analytics
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              User behavior and engagement metrics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
