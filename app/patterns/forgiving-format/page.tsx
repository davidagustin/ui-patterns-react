"use client";

import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function ForgivingFormatPattern() {
  const [activeTab, setActiveTab] = useState<"jsx" | "css">("jsx");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");

  const normalizePhoneNumber = (input: string) => {
    // Remove all non-digit characters
    const digits = input.replace(/\D/g, "");

    // Format based on length
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  };

  const normalizeCreditCard = (input: string) => {
    // Remove all non-digit characters
    const digits = input.replace(/\D/g, "");

    // Format in groups of 4
    const groups = [];
    for (let i = 0; i < digits.length && i < 16; i += 4) {
      groups.push(digits.slice(i, i + 4));
    }

    return groups.join(" ");
  };

  const normalizeDate = (input: string) => {
    // Remove all non-digit characters
    const digits = input.replace(/\D/g, "");

    // Format as MM/DD/YYYY
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 4) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    } else {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
    }
  };

  const normalizeEmail = (input: string) => {
    // Convert to lowercase and trim whitespace
    return input.toLowerCase().trim();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const normalized = normalizePhoneNumber(e.target.value);
    setPhoneNumber(normalized);
  };

  const handleCreditCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const normalized = normalizeCreditCard(e.target.value);
    setCreditCard(normalized);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const normalized = normalizeDate(e.target.value);
    setDate(normalized);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const normalized = normalizeEmail(e.target.value);
    setEmail(normalized);
  };

  const getValidationStatus = (field: string, value: string) => {
    switch (field) {
      case "phone":
        const phoneDigits = value.replace(/\D/g, "");
        if (phoneDigits.length === 10) return "valid";
        if (phoneDigits.length > 0) return "invalid";
        return "empty";
      case "creditCard":
        const cardDigits = value.replace(/\D/g, "");
        if (cardDigits.length === 16) return "valid";
        if (cardDigits.length > 0) return "invalid";
        return "empty";
      case "date":
        const dateDigits = value.replace(/\D/g, "");
        if (dateDigits.length === 8) return "valid";
        if (dateDigits.length > 0) return "invalid";
        return "empty";
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) return "valid";
        if (value.length > 0) return "invalid";
        return "empty";
      default:
        return "empty";
    }
  };

  const renderField = (
    field: string,
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    examples: string[],
  ) => {
    const status = getValidationStatus(field, value);

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>

        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`input-field transition-all duration-200 ${
              status === "valid"
                ? "border-green-500 focus:ring-green-500"
                : status === "invalid"
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
            }`}
          />

          {/* Status Icon */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {status === "valid" && (
              <span className="text-green-500 text-lg">✅</span>
            )}
            {status === "invalid" && (
              <span className="text-red-500 text-lg">❌</span>
            )}
          </div>
        </div>

        {/* Examples */}
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <span className="font-medium">Examples:</span> {examples.join(", ")}
        </div>

        {/* Status Message */}
        {status === "valid" && (
          <div className="text-sm text-green-600 dark:text-green-400">
            ✓ Format accepted
          </div>
        )}
        {status === "invalid" && (
          <div className="text-sm text-red-600 dark:text-red-400">
            ⚠️ Please check the format
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🤝 Forgiving Format Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Accept various input formats and automatically normalize them to a
          consistent structure, making forms more user-friendly.
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
              Try entering data in different formats. The inputs will
              automatically normalize and format your input as you type.
            </p>

            <div className="space-y-6">
              {renderField(
                "phone",
                "Phone Number",
                phoneNumber,
                handlePhoneChange,
                "Enter phone number",
                ["555-123-4567", "(555) 123-4567", "5551234567"],
              )}

              {renderField(
                "creditCard",
                "Credit Card Number",
                creditCard,
                handleCreditCardChange,
                "Enter card number",
                ["1234 5678 9012 3456", "1234567890123456"],
              )}

              {renderField(
                "date",
                "Date",
                date,
                handleDateChange,
                "Enter date",
                ["12/25/2023", "12252023", "12-25-2023"],
              )}

              {renderField(
                "email",
                "Email Address",
                email,
                handleEmailChange,
                "Enter email address",
                ["user@example.com", "USER@EXAMPLE.COM"],
              )}
            </div>

            {/* Demo Instructions */}
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                💡 Try These Formats:
              </h4>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• Phone: 5551234567, 555-123-4567, or (555) 123-4567</li>
                <li>• Credit Card: 1234567890123456 or 1234 5678 9012 3456</li>
                <li>• Date: 12252023, 12/25/2023, or 12-25-2023</li>
                <li>
                  • Email: USER@EXAMPLE.COM (will be converted to lowercase)
                </li>
              </ul>
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
              {
                <DynamicCodeExample
                  componentName="forgiving-format"
                  activeTab={activeTab}
                />
              }
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
                Format Normalization
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatically convert various input formats to standard format
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Real-time Validation
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Provide immediate feedback on input validity
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                User-Friendly
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Accept multiple input formats without requiring specific
                formatting
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Visual Feedback
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Clear indicators show when input is valid or needs correction
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
            <div className="text-2xl mb-2">📞</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Contact Forms
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Accept phone numbers in various formats
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">💳</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Payment Forms
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Handle credit card numbers with spaces or dashes
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📅</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Date Input
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Accept dates in multiple formats
            </p>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold mb-4 text-yellow-800 dark:text-yellow-200">
          💡 Best Practices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">
                1.
              </span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Show Examples
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Provide clear examples of accepted formats
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">
                2.
              </span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Real-time Feedback
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Show formatting and validation status as users type
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">
                3.
              </span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Preserve Intent
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Keep user input structure when possible
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">
                4.
              </span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Graceful Degradation
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Handle edge cases without breaking the experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
