'use client';

import { useState } from 'react';

export default function DashboardPattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [timeFrame, setTimeFrame] = useState<'today' | 'week' | 'month'>('today');

  // Sample dashboard data
  const metrics = {
    today: {
      users: { value: 2847, change: 12.5, trend: 'up' },
      revenue: { value: 12459, change: -3.2, trend: 'down' },
      orders: { value: 156, change: 8.7, trend: 'up' },
      conversion: { value: 3.24, change: 1.1, trend: 'up' }
    },
    week: {
      users: { value: 18432, change: 18.2, trend: 'up' },
      revenue: { value: 89234, change: 12.4, trend: 'up' },
      orders: { value: 1087, change: 15.6, trend: 'up' },
      conversion: { value: 3.89, change: 7.2, trend: 'up' }
    },
    month: {
      users: { value: 78945, change: 23.1, trend: 'up' },
      revenue: { value: 345678, change: 19.8, trend: 'up' },
      orders: { value: 4521, change: 22.3, trend: 'up' },
      conversion: { value: 4.12, change: 9.4, trend: 'up' }
    }
  };

  const currentMetrics = metrics[timeFrame];

  const recentActivity = [
    { id: 1, type: 'order', message: 'New order #1234 received', time: '2 minutes ago', status: 'success' },
    { id: 2, type: 'user', message: 'New user registration: john@example.com', time: '5 minutes ago', status: 'info' },
    { id: 3, type: 'payment', message: 'Payment failed for order #1233', time: '12 minutes ago', status: 'error' },
    { id: 4, type: 'order', message: 'Order #1232 shipped', time: '18 minutes ago', status: 'success' },
    { id: 5, type: 'system', message: 'System backup completed', time: '1 hour ago', status: 'info' },
  ];

  const topProducts = [
    { name: 'Wireless Headphones', sales: 89, revenue: 12450, trend: 'up' },
    { name: 'Smart Watch', sales: 67, revenue: 18920, trend: 'up' },
    { name: 'Laptop Stand', sales: 54, revenue: 4320, trend: 'down' },
    { name: 'USB-C Cable', sales: 43, revenue: 860, trend: 'up' },
    { name: 'Phone Case', sales: 38, revenue: 1140, trend: 'down' },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📊 Dashboard Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Display key metrics, real-time data, and analytics in an organized, scannable layout for business intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Switch between different time frames to see how metrics change. Notice the visual hierarchy and data organization.
            </p>
            
            {/* Time Frame Selector */}
            <div className="flex space-x-2 mb-6">
              {['today', 'week', 'month'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeFrame(period as any)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    timeFrame === period
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Users</h3>
                  <span className="text-blue-500">👥</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatNumber(currentMetrics.users.value)}
                </div>
                <div className={`text-sm flex items-center ${
                  currentMetrics.users.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span className="mr-1">
                    {currentMetrics.users.trend === 'up' ? '↗' : '↘'}
                  </span>
                  {Math.abs(currentMetrics.users.change)}%
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</h3>
                  <span className="text-green-500">💰</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency(currentMetrics.revenue.value)}
                </div>
                <div className={`text-sm flex items-center ${
                  currentMetrics.revenue.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span className="mr-1">
                    {currentMetrics.revenue.trend === 'up' ? '↗' : '↘'}
                  </span>
                  {Math.abs(currentMetrics.revenue.change)}%
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Orders</h3>
                  <span className="text-purple-500">📦</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatNumber(currentMetrics.orders.value)}
                </div>
                <div className={`text-sm flex items-center ${
                  currentMetrics.orders.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span className="mr-1">
                    {currentMetrics.orders.trend === 'up' ? '↗' : '↘'}
                  </span>
                  {Math.abs(currentMetrics.orders.change)}%
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversion</h3>
                  <span className="text-orange-500">🎯</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {currentMetrics.conversion.value}%
                </div>
                <div className={`text-sm flex items-center ${
                  currentMetrics.conversion.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span className="mr-1">
                    {currentMetrics.conversion.trend === 'up' ? '↗' : '↘'}
                  </span>
                  {Math.abs(currentMetrics.conversion.change)}%
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.slice(0, 3).map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-gray-100">{activity.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Top Products</h3>
              <div className="space-y-2">
                {topProducts.slice(0, 3).map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{product.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{product.sales} sales</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {formatCurrency(product.revenue)}
                      </p>
                      <span className={`text-xs ${product.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {product.trend === 'up' ? '↗' : '↘'}
                      </span>
                    </div>
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

export default function Dashboard() {
  const [timeFrame, setTimeFrame] = useState('today');

  const metrics = {
    users: { value: 2847, change: 12.5, trend: 'up' },
    revenue: { value: 12459, change: -3.2, trend: 'down' },
    orders: { value: 156, change: 8.7, trend: 'up' },
    conversion: { value: 3.24, change: 1.1, trend: 'up' }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="dashboard">
      {/* Time Frame Selector */}
      <div className="time-selector">
        {['today', 'week', 'month'].map((period) => (
          <button
            key={period}
            onClick={() => setTimeFrame(period)}
            className={\`time-btn \${timeFrame === period ? 'active' : ''}\`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <h3>Users</h3>
            <span className="metric-icon">👥</span>
          </div>
          <div className="metric-value">
            {formatNumber(metrics.users.value)}
          </div>
          <div className={\`metric-change \${metrics.users.trend}\`}>
            <span>{metrics.users.trend === 'up' ? '↗' : '↘'}</span>
            {Math.abs(metrics.users.change)}%
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <h3>Revenue</h3>
            <span className="metric-icon">💰</span>
          </div>
          <div className="metric-value">
            {formatCurrency(metrics.revenue.value)}
          </div>
          <div className={\`metric-change \${metrics.revenue.trend}\`}>
            <span>{metrics.revenue.trend === 'up' ? '↗' : '↘'}</span>
            {Math.abs(metrics.revenue.change)}%
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <h3>Orders</h3>
            <span className="metric-icon">📦</span>
          </div>
          <div className="metric-value">
            {formatNumber(metrics.orders.value)}
          </div>
          <div className={\`metric-change \${metrics.orders.trend}\`}>
            <span>{metrics.orders.trend === 'up' ? '↗' : '↘'}</span>
            {Math.abs(metrics.orders.change)}%
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <h3>Conversion</h3>
            <span className="metric-icon">🎯</span>
          </div>
          <div className="metric-value">
            {metrics.conversion.value}%
          </div>
          <div className={\`metric-change \${metrics.conversion.trend}\`}>
            <span>{metrics.conversion.trend === 'up' ? '↗' : '↘'}</span>
            {Math.abs(metrics.conversion.change)}%
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="activity-panel">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {activities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className={\`activity-indicator \${activity.status}\`} />
              <div className="activity-content">
                <p>{activity.message}</p>
                <span className="activity-time">{activity.time}</span>
              </div>
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
{`/* Dashboard Container */
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Time Frame Selector */
.time-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.time-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #f3f4f6;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.time-btn:hover {
  background-color: #e5e7eb;
}

.time-btn.active {
  background-color: #3b82f6;
  color: white;
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.metric-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.metric-header h3 {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-icon {
  font-size: 1.25rem;
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
  line-height: 1;
}

.metric-change {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
}

.metric-change.up {
  color: #059669;
}

.metric-change.down {
  color: #dc2626;
}

.metric-change span {
  margin-right: 0.25rem;
}

/* Activity Panel */
.activity-panel {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.activity-panel h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 1rem 0;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.activity-indicator {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  margin-top: 0.5rem;
  flex-shrink: 0;
}

.activity-indicator.success {
  background-color: #10b981;
}

.activity-indicator.error {
  background-color: #ef4444;
}

.activity-indicator.info {
  background-color: #3b82f6;
}

.activity-content {
  flex: 1;
}

.activity-content p {
  font-size: 0.875rem;
  color: #111827;
  margin: 0 0 0.25rem 0;
}

.activity-time {
  font-size: 0.75rem;
  color: #6b7280;
}

/* Chart Container */
.chart-container {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  height: 300px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.chart-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard {
    padding: 1rem;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .metric-card {
    padding: 1rem;
  }
  
  .metric-value {
    font-size: 1.5rem;
  }
  
  .time-selector {
    flex-wrap: wrap;
  }
  
  .time-btn {
    flex: 1;
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .metric-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .activity-item {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .activity-indicator {
    margin-top: 0;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .metric-card,
  .activity-panel,
  .chart-container {
    background-color: #1f2937;
    border-color: #374151;
  }
  
  .metric-header h3,
  .activity-time {
    color: #9ca3af;
  }
  
  .metric-value,
  .activity-panel h3,
  .chart-title,
  .activity-content p {
    color: #f9fafb;
  }
  
  .time-btn {
    background-color: #374151;
    color: #d1d5db;
  }
  
  .time-btn:hover {
    background-color: #4b5563;
  }
}

/* Loading States */
.metric-card.loading {
  opacity: 0.7;
  pointer-events: none;
}

.metric-card.loading .metric-value::after {
  content: '';
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-left: 0.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Accessibility */
.metric-card:focus,
.time-btn:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Print Styles */
@media print {
  .dashboard {
    padding: 0;
  }
  
  .metric-card {
    break-inside: avoid;
    box-shadow: none;
    border: 1px solid #000;
  }
  
  .time-selector {
    display: none;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Key Metrics Display</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Prominent display of critical business metrics</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Trend Indicators</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Visual arrows and colors show data trends</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Real-time Activity</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Live feed of system events and user actions</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Time Frame Controls</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Switch between different time periods</p>
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
            <div className="text-2xl mb-2">💼</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Business Analytics</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Track KPIs, revenue, and growth metrics</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">E-commerce Admin</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Monitor sales, orders, and customer data</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">System Monitoring</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Track server performance and uptime</p>
          </div>
        </div>
      </div>
    </div>
  );
}