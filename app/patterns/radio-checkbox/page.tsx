"use client";
import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
export default function RadioCheckboxPattern() {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  });
  const paymentOptions = [
    {
      id: "credit",
      label: "Credit Card",
      description: "Pay with credit or debit card",
    },
    {
      id: "paypal",
      label: "PayPal",
      description: "Pay with your PayPal account",
    },
    { id: "bank", label: "Bank Transfer", description: "Direct bank transfer" },
    {
      id: "crypto",
      label: "Cryptocurrency",
      description: "Pay with Bitcoin or Ethereum",
    },
  ];
  const services = [
    { id: "web-design", label: "Web Design" },
    { id: "development", label: "Development" },
    { id: "seo", label: "SEO Optimization" },
    { id: "marketing", label: "Digital Marketing" },
    { id: "consulting", label: "Consulting" },
  ];
  const themeOptions = [
    { id: "light", label: "Light Theme", icon: "☀️" },
    { id: "dark", label: "Dark Theme", icon: "🌙" },
    { id: "auto", label: "Auto Theme", icon: "⚡" },
  ];
  const handleServiceChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, serviceId]);
    } else {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId));
    }
  };
  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [type]: !notifications[type],
    });
  };
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ☑️ Radio Buttons & Checkboxes
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Essential form controls for single and multiple selections with clear
          visual feedback and accessibility support.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Examples
            </h2>
            <div className="space-y-8">
              {/* Radio Buttons - Payment Method */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Payment Method (Radio Buttons)
                </h3>
                <div className="space-y-3">
                  {paymentOptions.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <input
                        type="radio"
                        id={option.id}
                        name="payment"
                        value={option.id}
                        checked={selectedOption === option.id}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="mt-1 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={option.id}
                          className="block text-base font-medium text-gray-700 dark:text-gray-300 cursor-pointer min-h-[44px] flex items-center"
                        >
                          {option.label}
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {selectedOption && (
                  <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Selected:{" "}
                      <strong>
                        {
                          paymentOptions.find(
                            (opt) => opt.id === selectedOption,
                          )?.label
                        }
                      </strong>
                    </p>
                  </div>
                )}
              </div>
              {/* Checkboxes - Services */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Services Needed (Checkboxes)
                </h3>
                <div className="space-y-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id={service.id}
                        checked={selectedServices.includes(service.id)}
                        onChange={(e) =>
                          handleServiceChange(service.id, e.target.checked)
                        }
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <label
                        htmlFor={service.id}
                        className="text-base font-medium text-gray-700 dark:text-gray-300 cursor-pointer min-h-[44px] flex items-center"
                      >
                        {service.label}
                      </label>
                    </div>
                  ))}
                </div>
                {selectedServices.length > 0 && (
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Selected ({selectedServices.length}):{" "}
                      {selectedServices
                        .map((id) => services.find((s) => s.id === id)?.label)
                        .join(", ")}
                    </p>
                  </div>
                )}
              </div>
              {/* Custom Styled Radio Buttons */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Theme Selection (Custom Styled)
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {themeOptions.map((theme) => (
                    <div key={theme.id} className="relative">
                      <input
                        type="radio"
                        id={theme.id}
                        name="theme"
                        value={theme.id}
                        checked={selectedTheme === theme.id}
                        onChange={(e) => setSelectedTheme(e.target.value)}
                        className="sr-only peer"
                      />
                      <label
                        htmlFor={theme.id}
                        className="flex items-center p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 transition-all min-h-[60px]"
                      >
                        <span className="text-2xl mr-3">{theme.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {theme.label}
                          </div>
                        </div>
                        <div className="ml-auto">
                          <div className="w-4 h-4 rounded-full border-2 border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 relative">
                            <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100"></div>
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {/* Toggle Switches */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Notification Preferences (Toggle Switches)
                </h3>
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, enabled]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {key === "email"
                            ? "Email Notifications"
                            : key === "push"
                              ? "Push Notifications"
                              : "SMS Notifications"}
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {key === "email"
                            ? "Receive updates via email"
                            : key === "push"
                              ? "Browser push notifications"
                              : "Text message alerts"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleNotificationChange(
                            key as keyof typeof notifications,
                          )
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          enabled
                            ? "bg-blue-600"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                        role="switch"
                        aria-checked={enabled}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            enabled ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Code Example */}
<DynamicCodeExample componentName="radio-checkbox" />
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
                Accessible Design
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Proper ARIA labels, keyboard navigation, and focus management
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Custom Styling
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Beautifully styled alternatives to default browser controls
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Multiple Variations
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Standard, custom styled, and toggle switch variations
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
                Clear selection states and hover effects
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
            <div className="text-2xl mb-2">📝</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Forms & Surveys
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Single and multiple choice questions
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚙️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Settings Panels
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              User preferences and configuration options
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛒</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              E-commerce
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Product options, payment methods, and shipping
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
