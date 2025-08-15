'use client';

import { useState } from 'react';

export default function StructuredFormatPattern() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [date, setDate] = useState('');

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      const parts = [match[1], match[2], match[3]].filter(Boolean);
      return parts.join('-');
    }
    return cleaned;
  };

  const formatCreditCard = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/);
    if (match) {
      const parts = [match[1], match[2], match[3], match[4]].filter(Boolean);
      return parts.join(' ');
    }
    return cleaned;
  };

  const formatDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,2})(\d{0,2})(\d{0,4})$/);
    if (match) {
      const parts = [match[1], match[2], match[3]].filter(Boolean);
      return parts.join('/');
    }
    return cleaned;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📋 Structured Format Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Format input with specific patterns to improve user experience and data consistency.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                  placeholder="(555) 123-4567"
                  className="input-field"
                  maxLength={12}
                />
                <p className="text-sm text-gray-500 mt-1">Format: XXX-XXX-XXXX</p>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                  Credit Card
                </label>
                <input
                  type="text"
                  value={creditCard}
                  onChange={(e) => setCreditCard(formatCreditCard(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  className="input-field"
                  maxLength={19}
                />
                <p className="text-sm text-gray-500 mt-1">Format: XXXX XXXX XXXX XXXX</p>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                  Date
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(formatDate(e.target.value))}
                  placeholder="MM/DD/YYYY"
                  className="input-field"
                  maxLength={10}
                />
                <p className="text-sm text-gray-500 mt-1">Format: MM/DD/YYYY</p>
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
            <div className="code-block">
              <pre className="text-sm leading-relaxed">
{`import { useState } from 'react';

function StructuredFormatExample() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\\D/g, '');
    const match = cleaned.match(/^(\\d{0,3})(\\d{0,3})(\\d{0,4})$/);
    if (match) {
      const parts = [match[1], match[2], match[3]].filter(Boolean);
      return parts.join('-');
    }
    return cleaned;
  };

  const formatCreditCard = (value) => {
    const cleaned = value.replace(/\\D/g, '');
    const match = cleaned.match(/^(\\d{0,4})(\\d{0,4})(\\d{0,4})(\\d{0,4})$/);
    if (match) {
      const parts = [match[1], match[2], match[3], match[4]].filter(Boolean);
      return parts.join(' ');
    }
    return cleaned;
  };

  return (
    <div>
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
        placeholder="(555) 123-4567"
      />
    </div>
  );
}`}
              </pre>
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Real-time Formatting</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Format input as user types</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Input Validation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ensure proper data format</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">User Guidance</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear format examples</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Consistent Data</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Standardized input format</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
