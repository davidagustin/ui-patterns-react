'use client';

import { useState, useEffect } from 'react';

export default function FormattingDataPattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [locale, setLocale] = useState('en-US');
  const [currency, setCurrency] = useState('USD');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Sample data to format
  const sampleData = {
    numbers: {
      integer: 1234567,
      decimal: 1234.5678,
      percentage: 0.8934,
      currency: 1234.56,
      compact: 1500000,
    },
    dates: {
      timestamp: new Date('2024-03-15T14:30:00Z'),
      dateOnly: new Date('2024-03-15'),
      relative: new Date(currentTime.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    text: {
      title: 'the quick brown fox jumps over the lazy dog',
      name: 'john doe',
      sentence: 'this is a sample sentence that needs proper formatting.',
      phone: '1234567890',
      creditCard: '4532123456789012',
      ssn: '123456789',
    },
    technical: {
      bytes: 1536,
      largeBytes: 15728640,
      duration: 125, // seconds
      ipAddress: '192.168.1.1',
      macAddress: '00:1B:44:11:3A:B7',
    }
  };

  // Formatting functions
  const formatNumber = (num: number, options: Intl.NumberFormatOptions = {}) => {
    return new Intl.NumberFormat(locale, options).format(num);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatCompactNumber = (num: number) => {
    return new Intl.NumberFormat(locale, {
      notation: 'compact',
      compactDisplay: 'short'
    }).format(num);
  };

  const formatDate = (date: Date, options: Intl.DateTimeFormatOptions = {}) => {
    return new Intl.DateTimeFormat(locale, options).format(date);
  };

  const formatRelativeTime = (date: Date) => {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    const diff = Math.floor((date.getTime() - currentTime.getTime()) / 1000);
    
    if (Math.abs(diff) < 60) return rtf.format(diff, 'second');
    if (Math.abs(diff) < 3600) return rtf.format(Math.floor(diff / 60), 'minute');
    if (Math.abs(diff) < 86400) return rtf.format(Math.floor(diff / 3600), 'hour');
    return rtf.format(Math.floor(diff / 86400), 'day');
  };

  const formatTitle = (text: string) => {
    return text.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  const formatProperName = (name: string) => {
    return name.split(' ').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    ).join(' ');
  };

  const formatSentence = (sentence: string) => {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  };

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  const maskCreditCard = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\s/g, '');
    if (cleaned.length === 16) {
      return `**** **** **** ${cleaned.slice(-4)}`;
    }
    return cardNumber;
  };

  const maskSSN = (ssn: string) => {
    const cleaned = ssn.replace(/\D/g, '');
    if (cleaned.length === 9) {
      return `***-**-${cleaned.slice(-4)}`;
    }
    return ssn;
  };

  const formatBytes = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatIPAddress = (ip: string) => {
    return ip.split('.').map(part => part.padStart(3, '0')).join('.');
  };

  const formatMacAddress = (mac: string) => {
    return mac.toUpperCase();
  };

  const locales = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'ja-JP', name: 'Japanese' },
  ];

  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'CAD', name: 'Canadian Dollar' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🔧 Formatting Data Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Transform raw data into human-readable formats with proper localization, number formatting, and text transformations.
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
              Change locale and currency to see how data formatting adapts. All examples use real formatting functions.
            </p>
            
            {/* Controls */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Locale
                </label>
                <select
                  value={locale}
                  onChange={(e) => setLocale(e.target.value)}
                  className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  {locales.map(loc => (
                    <option key={loc.code} value={loc.code}>{loc.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  {currencies.map(curr => (
                    <option key={curr.code} value={curr.code}>{curr.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Number Formatting */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">📊 Number Formatting</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Integer:</span>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 dark:text-gray-500">Raw: {sampleData.numbers.integer}</div>
                      <div className="font-mono">{formatNumber(sampleData.numbers.integer)}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Decimal:</span>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 dark:text-gray-500">Raw: {sampleData.numbers.decimal}</div>
                      <div className="font-mono">{formatNumber(sampleData.numbers.decimal, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Currency:</span>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 dark:text-gray-500">Raw: {sampleData.numbers.currency}</div>
                      <div className="font-mono text-green-600 dark:text-green-400">{formatCurrency(sampleData.numbers.currency)}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Percentage:</span>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 dark:text-gray-500">Raw: {sampleData.numbers.percentage}</div>
                      <div className="font-mono">{formatPercentage(sampleData.numbers.percentage)}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Compact:</span>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 dark:text-gray-500">Raw: {sampleData.numbers.compact}</div>
                      <div className="font-mono">{formatCompactNumber(sampleData.numbers.compact)}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">📅 Date & Time Formatting</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Full Date:</span>
                    <div className="text-right">
                      <div className="font-mono">{formatDate(sampleData.dates.timestamp, { dateStyle: 'full', timeStyle: 'short' })}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Short Date:</span>
                    <div className="text-right">
                      <div className="font-mono">{formatDate(sampleData.dates.dateOnly, { dateStyle: 'short' })}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Relative Time:</span>
                    <div className="text-right">
                      <div className="font-mono text-blue-600 dark:text-blue-400">{formatRelativeTime(sampleData.dates.relative)}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">📝 Text Formatting</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Title Case:</span>
                    <div className="text-xs text-gray-500 dark:text-gray-500 font-mono">Raw: {sampleData.text.title}</div>
                    <div className="font-mono">{formatTitle(sampleData.text.title)}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Proper Name:</span>
                    <div className="text-xs text-gray-500 dark:text-gray-500 font-mono">Raw: {sampleData.text.name}</div>
                    <div className="font-mono">{formatProperName(sampleData.text.name)}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Phone Number:</span>
                    <div className="text-xs text-gray-500 dark:text-gray-500 font-mono">Raw: {sampleData.text.phone}</div>
                    <div className="font-mono">{formatPhone(sampleData.text.phone)}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Credit Card:</span>
                    <div className="text-xs text-gray-500 dark:text-gray-500 font-mono">Raw: {sampleData.text.creditCard}</div>
                    <div className="font-mono">{maskCreditCard(sampleData.text.creditCard)}</div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">💻 Technical Formatting</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">File Size:</span>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 dark:text-gray-500">Raw: {sampleData.technical.bytes} bytes</div>
                      <div className="font-mono">{formatBytes(sampleData.technical.bytes)}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Large File:</span>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 dark:text-gray-500">Raw: {sampleData.technical.largeBytes} bytes</div>
                      <div className="font-mono">{formatBytes(sampleData.technical.largeBytes)}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Duration:</span>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 dark:text-gray-500">Raw: {sampleData.technical.duration} seconds</div>
                      <div className="font-mono">{formatDuration(sampleData.technical.duration)}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">IP Address:</span>
                    <div className="text-right">
                      <div className="font-mono">{formatIPAddress(sampleData.technical.ipAddress)}</div>
                    </div>
                  </div>
                </div>
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

export default function DataFormatter() {
  const [locale, setLocale] = useState('en-US');

  // Number formatting
  const formatNumber = (num, options = {}) => {
    return new Intl.NumberFormat(locale, options).format(num);
  };

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Date formatting
  const formatDate = (date, options = {}) => {
    return new Intl.DateTimeFormat(locale, options).format(date);
  };

  const formatRelativeTime = (date) => {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    const diff = Math.floor((date.getTime() - Date.now()) / 1000);
    
    if (Math.abs(diff) < 60) return rtf.format(diff, 'second');
    if (Math.abs(diff) < 3600) return rtf.format(Math.floor(diff / 60), 'minute');
    if (Math.abs(diff) < 86400) return rtf.format(Math.floor(diff / 3600), 'hour');
    return rtf.format(Math.floor(diff / 86400), 'day');
  };

  // Text formatting
  const formatTitle = (text) => {
    return text.replace(/\\w\\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  const formatPhone = (phone) => {
    const cleaned = phone.replace(/\\D/g, '');
    if (cleaned.length === 10) {
      return \`(\${cleaned.slice(0, 3)}) \${cleaned.slice(3, 6)}-\${cleaned.slice(6)}\`;
    }
    return phone;
  };

  const maskCreditCard = (cardNumber) => {
    const cleaned = cardNumber.replace(/\\s/g, '');
    if (cleaned.length === 16) {
      return \`**** **** **** \${cleaned.slice(-4)}\`;
    }
    return cardNumber;
  };

  // File size formatting
  const formatBytes = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Duration formatting
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return \`\${hours}:\${minutes.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
    }
    return \`\${minutes}:\${secs.toString().padStart(2, '0')}\`;
  };

  return (
    <div className="data-formatter">
      {/* Numbers */}
      <div className="format-section">
        <h3>Numbers</h3>
        <p>Integer: {formatNumber(1234567)}</p>
        <p>Currency: {formatCurrency(1234.56)}</p>
        <p>Percentage: {formatPercentage(0.8934)}</p>
      </div>

      {/* Dates */}
      <div className="format-section">
        <h3>Dates</h3>
        <p>Full: {formatDate(currentTime, { dateStyle: 'full', timeStyle: 'short' })}</p>
        <p>Relative: {formatRelativeTime(new Date(currentTime.getTime() - 2 * 60 * 60 * 1000))}</p>
      </div>

      {/* Text */}
      <div className="format-section">
        <h3>Text</h3>
        <p>Title: {formatTitle('the quick brown fox')}</p>
        <p>Phone: {formatPhone('1234567890')}</p>
        <p>Credit Card: {maskCreditCard('4532123456789012')}</p>
      </div>

      {/* Technical */}
      <div className="format-section">
        <h3>Technical</h3>
        <p>File Size: {formatBytes(15728640)}</p>
        <p>Duration: {formatDuration(125)}</p>
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Data Formatter Styles */
.data-formatter {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.format-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}

.format-section h3 {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  border-bottom: 2px solid #3182ce;
  padding-bottom: 0.5rem;
}

.format-section p {
  margin: 0.5rem 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  color: #2d3748;
  padding: 0.5rem 0.75rem;
  background: white;
  border-left: 3px solid #3182ce;
  border-radius: 0.25rem;
}

/* Specific formatting styles */
.currency-value {
  color: #38a169;
  font-weight: 600;
}

.percentage-value {
  color: #d69e2e;
  font-weight: 600;
}

.date-value {
  color: #805ad5;
}

.relative-time {
  color: #3182ce;
  font-style: italic;
}

.masked-data {
  color: #e53e3e;
  font-family: monospace;
  letter-spacing: 0.05em;
}

.file-size {
  color: #319795;
  font-weight: 500;
}

.duration {
  color: #ed8936;
  font-weight: 600;
}

/* Raw data display */
.raw-data {
  font-size: 0.75rem;
  color: #718096;
  font-style: italic;
  margin-bottom: 0.25rem;
}

.raw-data::before {
  content: 'Raw: ';
  font-weight: 600;
}

/* Formatted data container */
.formatted-data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  margin: 0.5rem 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.formatted-data:hover {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e0;
}

.formatted-data .label {
  font-size: 0.875rem;
  color: #4a5568;
  font-weight: 500;
}

.formatted-data .value {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.875rem;
  color: #1a202c;
  font-weight: 600;
}

/* Locale selector */
.locale-selector {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #edf2f7;
  border-radius: 0.5rem;
}

.locale-selector label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #2d3748;
}

.locale-selector select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.375rem;
  background: white;
  color: #1a202c;
  font-size: 0.875rem;
}

.locale-selector select:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
}

/* Number formatting styles */
.number-large {
  font-size: 1.125rem;
  font-weight: 700;
}

.number-compact {
  color: #805ad5;
  font-weight: 600;
}

/* Error states */
.format-error {
  color: #e53e3e;
  font-style: italic;
  background: #fed7d7;
  border-left-color: #e53e3e;
}

.format-error::before {
  content: '⚠ ';
}

/* Success states */
.format-success {
  color: #38a169;
  background: #c6f6d5;
  border-left-color: #38a169;
}

.format-success::before {
  content: '✓ ';
}

/* Responsive design */
@media (max-width: 768px) {
  .data-formatter {
    padding: 1rem;
  }
  
  .format-section {
    padding: 1rem;
  }
  
  .formatted-data {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .formatted-data .value {
    font-size: 0.8125rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .format-section {
    background: #2d3748;
    border-color: #4a5568;
  }
  
  .format-section h3 {
    color: #f7fafc;
    border-bottom-color: #63b3ed;
  }
  
  .format-section p {
    color: #e2e8f0;
    background: #1a202c;
    border-left-color: #63b3ed;
  }
  
  .formatted-data {
    background: #1a202c;
    border-color: #4a5568;
  }
  
  .formatted-data .label {
    color: #a0aec0;
  }
  
  .formatted-data .value {
    color: #f7fafc;
  }
  
  .locale-selector {
    background: #2d3748;
  }
  
  .locale-selector label {
    color: #e2e8f0;
  }
  
  .locale-selector select {
    background: #1a202c;
    border-color: #4a5568;
    color: #f7fafc;
  }
}

/* Animation for value changes */
.value-changed {
  animation: highlightChange 0.6s ease;
}

@keyframes highlightChange {
  0% {
    background-color: #fef5e7;
    transform: scale(1.02);
  }
  100% {
    background-color: transparent;
    transform: scale(1);
  }
}

/* Print styles */
@media print {
  .data-formatter {
    padding: 0;
  }
  
  .locale-selector {
    display: none;
  }
  
  .format-section {
    break-inside: avoid;
    box-shadow: none;
    border: 1px solid #000;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Internationalization</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Support for multiple locales and currencies</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Number Formatting</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Currency, percentages, and compact notation</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Date & Time</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Localized dates and relative time formatting</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Data Masking</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Secure display of sensitive information</p>
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
            <div className="text-2xl mb-2">💰</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Financial Apps</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Currency and number formatting</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🌍</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Global Applications</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Multi-locale data display</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Analytics Dashboards</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Data visualization and reporting</p>
          </div>
        </div>
      </div>
    </div>
  );
}