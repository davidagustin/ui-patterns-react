import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

// Helper function to remove Key Features and Common Use Cases sections
function removeDocumentationSections(sourceCode: string): string {
  let cleanedCode = sourceCode;

  // Remove Key Features section
  cleanedCode = cleanedCode.replace(
    /\s*\{\s*\/\*\s*Key Features\s*\*\/\s*\}[\s\S]*?\{\s*\/\*\s*Common Use Cases\s*\*\/\s*\}[\s\S]*?\}\s*$/,
    "",
  );

  // Remove Key Features section (alternative pattern)
  cleanedCode = cleanedCode.replace(
    /\s*\{\s*\/\*\s*Key Features\s*\*\/\s*\}[\s\S]*?\}\s*$/,
    "",
  );

  // Remove Common Use Cases section (alternative pattern)
  cleanedCode = cleanedCode.replace(
    /\s*\{\s*\/\*\s*Common Use Cases\s*\*\/\s*\}[\s\S]*?\}\s*$/,
    "",
  );

  // Remove Key Features section with div wrapper
  cleanedCode = cleanedCode.replace(
    /\s*<div[^>]*>\s*\{\s*\/\*\s*Key Features\s*\*\/\s*\}[\s\S]*?<\/div>\s*/g,
    "",
  );

  // Remove Common Use Cases section with div wrapper
  cleanedCode = cleanedCode.replace(
    /\s*<div[^>]*>\s*\{\s*\/\*\s*Common Use Cases\s*\*\/\s*\}[\s\S]*?<\/div>\s*/g,
    "",
  );

  // Remove Key Features section with specific div structure
  cleanedCode = cleanedCode.replace(
    /\s*<div[^>]*>\s*<h2[^>]*>.*?Key Features.*?<\/h2>[\s\S]*?<\/div>\s*/g,
    "",
  );

  // Remove Common Use Cases section with specific div structure
  cleanedCode = cleanedCode.replace(
    /\s*<div[^>]*>\s*<h2[^>]*>.*?Common Use Cases.*?<\/h2>[\s\S]*?<\/div>\s*/g,
    "",
  );

  // Remove Key Features section with space-y-6 wrapper
  cleanedCode = cleanedCode.replace(
    /\s*<div[^>]*space-y-6[^>]*>\s*<div[^>]*>\s*<h2[^>]*>.*?Key Features.*?<\/h2>[\s\S]*?<\/div>\s*<\/div>\s*/g,
    "",
  );

  // Remove Common Use Cases section with space-y-6 wrapper
  cleanedCode = cleanedCode.replace(
    /\s*<div[^>]*space-y-6[^>]*>\s*<div[^>]*>\s*<h2[^>]*>.*?Common Use Cases.*?<\/h2>[\s\S]*?<\/div>\s*<\/div>\s*/g,
    "",
  );

  // Remove Code Example section with tab content
  cleanedCode = cleanedCode.replace(
    /\s*\{\s*\/\*\s*Code Example\s*\*\/\s*\}[\s\S]*?<DynamicCodeExample[\s\S]*?\/>\s*<\/div>\s*<\/div>\s*<\/div>\s*/g,
    "",
  );

  // Remove Code Example section with specific structure
  cleanedCode = cleanedCode.replace(
    /\s*<div[^>]*>\s*<h2[^>]*>.*?Code Example.*?<\/h2>[\s\S]*?<DynamicCodeExample[\s\S]*?\/>\s*<\/div>\s*<\/div>\s*<\/div>\s*/g,
    "",
  );

  // Remove tab content and buttons
  cleanedCode = cleanedCode.replace(
    /\s*<div[^>]*>\s*<button[^>]*>.*?JSX.*?<\/button>\s*<button[^>]*>.*?CSS.*?<\/button>\s*<\/div>\s*/g,
    "",
  );

  // Remove DynamicCodeExample component
  cleanedCode = cleanedCode.replace(/\s*<DynamicCodeExample[^>]*\/>\s*/g, "");

  // Remove code-block div
  cleanedCode = cleanedCode.replace(
    /\s*<div[^>]*code-block[^>]*>[\s\S]*?<\/div>\s*/g,
    "",
  );

  // Close any remaining open divs at the end
  const openDivs = (cleanedCode.match(/<div[^>]*>/g) || []).length;
  const closeDivs = (cleanedCode.match(/<\/div>/g) || []).length;
  const unclosedDivs = openDivs - closeDivs;

  if (unclosedDivs > 0) {
    cleanedCode += "\n" + "</div>".repeat(unclosedDivs);
  }

  // Remove grid layout wrapper and keep only the interactive example
  cleanedCode = cleanedCode.replace(
    /\s*<div[^>]*grid[^>]*>\s*\{\s*\/\*\s*Interactive Example\s*\*\/\s*\}[\s\S]*?\{\s*\/\*\s*Code Example\s*\*\/\s*\}[\s\S]*?<\/div>\s*/g,
    "",
  );

  // Remove the entire grid structure and keep only the interactive example
  cleanedCode = cleanedCode.replace(
    /\s*<div[^>]*grid[^>]*>[\s\S]*?\{\s*\/\*\s*Interactive Example\s*\*\/\s*\}[\s\S]*?<\/div>\s*<\/div>\s*/g,
    "",
  );

  // Clean up any remaining grid-related divs
  cleanedCode = cleanedCode.replace(
    /\s*<div[^>]*grid-cols[^>]*>[\s\S]*?<\/div>\s*/g,
    "",
  );

  // Remove space-y-8 wrapper if it only contains documentation
  cleanedCode = cleanedCode.replace(
    /\s*<div[^>]*space-y-8[^>]*>\s*<div[^>]*>\s*<h1[^>]*>.*?<\/h1>[\s\S]*?<\/div>\s*<\/div>\s*/g,
    "",
  );

  return cleanedCode;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ component: string }> },
) {
  try {
    const { component: componentName } = await params;

    // Map component names to their pattern file paths
    const componentPaths: Record<string, string> = {
      "accordion-menu": "app/patterns/accordion-menu/page.tsx",
      "adaptable-view": "app/patterns/adaptable-view/page.tsx",
      "alternating-rows": "app/patterns/alternating-rows/page.tsx",
      archive: "app/patterns/archive/page.tsx",
      "article-list": "app/patterns/article-list/page.tsx",
      autocomplete: "app/patterns/autocomplete/page.tsx",
      autosave: "app/patterns/autosave/page.tsx",
      "bottom-navigation": "app/patterns/bottom-navigation/page.tsx",
      breadcrumbs: "app/patterns/breadcrumbs/page.tsx",
      "calendar-picker": "app/patterns/calendar-picker/page.tsx",
      captcha: "app/patterns/captcha/page.tsx",
      cards: "app/patterns/cards/page.tsx",
      carousel: "app/patterns/carousel/page.tsx",
      categorization: "app/patterns/categorization/page.tsx",
      "color-picker": "app/patterns/color-picker/page.tsx",
      "completeness-meter": "app/patterns/completeness-meter/page.tsx",
      "continuous-scrolling": "app/patterns/continuous-scrolling/page.tsx",
      "copy-box": "app/patterns/copy-box/page.tsx",
      dashboard: "app/patterns/dashboard/page.tsx",
      "data-filtering": "app/patterns/data-filtering/page.tsx",
      "data-grid": "app/patterns/data-grid/page.tsx",
      "data-visualization": "app/patterns/data-visualization/page.tsx",
      "double-tap": "app/patterns/double-tap/page.tsx",
      "drag-drop": "app/patterns/drag-drop/page.tsx",
      "drag-reorder": "app/patterns/drag-reorder/page.tsx",
      "dropdown-menu": "app/patterns/dropdown-menu/page.tsx",
      "event-calendar": "app/patterns/event-calendar/page.tsx",
      "expandable-input": "app/patterns/expandable-input/page.tsx",
      faq: "app/patterns/faq/page.tsx",
      "fat-footer": "app/patterns/fat-footer/page.tsx",
      favorites: "app/patterns/favorites/page.tsx",
      "file-upload": "app/patterns/file-upload/page.tsx",
      "fill-blanks": "app/patterns/fill-blanks/page.tsx",
      "forgiving-format": "app/patterns/forgiving-format/page.tsx",
      "formatting-data": "app/patterns/formatting-data/page.tsx",
      forms: "app/patterns/forms/page.tsx",
      gallery: "app/patterns/gallery/page.tsx",
      "good-defaults": "app/patterns/good-defaults/page.tsx",
      "home-link": "app/patterns/home-link/page.tsx",
      "horizontal-dropdown": "app/patterns/horizontal-dropdown/page.tsx",
      "image-gallery": "app/patterns/image-gallery/page.tsx",
      "image-upload": "app/patterns/image-upload/page.tsx",
      "image-zoom": "app/patterns/image-zoom/page.tsx",
      "inline-help": "app/patterns/inline-help/page.tsx",
      "inplace-editor": "app/patterns/inplace-editor/page.tsx",
      "input-feedback": "app/patterns/input-feedback/page.tsx",
      "input-prompt": "app/patterns/input-prompt/page.tsx",
      "jumping-hierarchy": "app/patterns/jumping-hierarchy/page.tsx",
      "keyboard-shortcuts": "app/patterns/keyboard-shortcuts/page.tsx",
      "long-press": "app/patterns/long-press/page.tsx",
      menus: "app/patterns/menus/page.tsx",
      "mobile-menu": "app/patterns/mobile-menu/page.tsx",
      modal: "app/patterns/modal/page.tsx",
      "module-tabs": "app/patterns/module-tabs/page.tsx",
      "morphing-controls": "app/patterns/morphing-controls/page.tsx",
      navbar: "app/patterns/navbar/page.tsx",
      "navigation-tabs": "app/patterns/navigation-tabs/page.tsx",
      notifications: "app/patterns/notifications/page.tsx",
      pagination: "app/patterns/pagination/page.tsx",
      "password-strength": "app/patterns/password-strength/page.tsx",
      "pinch-zoom": "app/patterns/pinch-zoom/page.tsx",
      preview: "app/patterns/preview/page.tsx",
      "progressive-disclosure": "app/patterns/progressive-disclosure/page.tsx",
      "pull-refresh": "app/patterns/pull-refresh/page.tsx",
      "radio-checkbox": "app/patterns/radio-checkbox/page.tsx",
      "range-slider": "app/patterns/range-slider/page.tsx",
      "rule-builder": "app/patterns/rule-builder/page.tsx",
      search: "app/patterns/search/page.tsx",
      "search-filters": "app/patterns/search-filters/page.tsx",
      "select-dropdown": "app/patterns/select-dropdown/page.tsx",
      settings: "app/patterns/settings/page.tsx",
      "shortcut-dropdown": "app/patterns/shortcut-dropdown/page.tsx",
      sidebar: "app/patterns/sidebar/page.tsx",
      slideshow: "app/patterns/slideshow/page.tsx",
      "sort-column": "app/patterns/sort-column/page.tsx",
      "steps-left": "app/patterns/steps-left/page.tsx",
      "structured-format": "app/patterns/structured-format/page.tsx",
      "swipe-actions": "app/patterns/swipe-actions/page.tsx",
      "swipe-navigation": "app/patterns/swipe-navigation/page.tsx",
      "table-filter": "app/patterns/table-filter/page.tsx",
      tables: "app/patterns/tables/page.tsx",
      tabs: "app/patterns/tabs/page.tsx",
      "tag-cloud": "app/patterns/tag-cloud/page.tsx",
      tagging: "app/patterns/tagging/page.tsx",
      "tap-expand": "app/patterns/tap-expand/page.tsx",
      thumbnail: "app/patterns/thumbnail/page.tsx",
      undo: "app/patterns/undo/page.tsx",
      "vertical-dropdown": "app/patterns/vertical-dropdown/page.tsx",
      wizard: "app/patterns/wizard/page.tsx",
      wysiwyg: "app/patterns/wysiwyg/page.tsx",
    };

    const filePath = componentPaths[componentName];

    if (!filePath) {
      return NextResponse.json(
        { error: "Component not found" },
        { status: 404 },
      );
    }

    // Read the full pattern file
    const fullPath = join(process.cwd(), filePath);
    const fullSourceCode = readFileSync(fullPath, "utf-8");

    // Extract just the interactive example component using regex
    let extractedCode = extractInteractiveExampleOnly(fullSourceCode);

    // If no separate example component found, extract the main component
    if (!extractedCode) {
      extractedCode = extractInteractiveExample(fullSourceCode);
    }

    // If still no separate example component found, extract the main component
    if (!extractedCode) {
      extractedCode = extractMainComponent(fullSourceCode);
    }

    if (!extractedCode) {
      return NextResponse.json(
        { error: "Could not extract interactive example" },
        { status: 404 },
      );
    }

    // For learning purposes, create a complete standalone component
    const completeCode = `"use client";

import { useState } from "react";

export default function InteractiveExample() {
  // State management
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    country: "",
    newsletter: false,
    terms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const countries = [
    { value: "", label: "Select a country" },
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Country validation
    if (!formData.country) {
      newErrors.country = "Please select a country";
    }

    // Terms validation
    if (!formData.terms) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after successful submission
    setTimeout(() => {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        country: "",
        newsletter: false,
        terms: false,
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const colors = ["red", "orange", "yellow", "lightgreen", "green"];

    return {
      strength: Math.min(strength, 5),
      label: labels[Math.min(strength - 1, 4)],
      color: colors[Math.min(strength - 1, 4)],
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Registration Form</h2>
      
      {/* Success Message */}
      {isSubmitted && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-green-600 text-lg">✓</span>
            <div>
              <h3 className="text-green-800 font-medium">
                Form Submitted Successfully!
              </h3>
              <p className="text-green-700 text-sm">
                Thank you for your submission.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={\`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent \${
                  errors.firstName
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 bg-white"
                }\`}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={\`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent \${
                  errors.lastName
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 bg-white"
                }\`}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={\`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent \${
                errors.email
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 bg-white"
              }\`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={\`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent \${
                errors.phone
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 bg-white"
              }\`}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Security */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Security</h3>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password *
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={\`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent \${
                errors.password
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 bg-white"
              }\`}
              placeholder="Create a strong password"
            />
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={\`w-2 h-2 rounded-full \${
                          level <= passwordStrength.strength
                            ? \`bg-\${passwordStrength.color}-500\`
                            : "bg-gray-300"
                        }\`}
                      />
                    ))}
                  </div>
                  <span className={\`text-xs font-medium text-\${passwordStrength.color}-600\`}>
                    {passwordStrength.label}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Password must contain at least 8 characters with uppercase, lowercase, and number
                </p>
              </div>
            )}
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              Confirm Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              className={\`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent \${
                errors.confirmPassword
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 bg-white"
              }\`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Preferences</h3>

          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-1">
              Country *
            </label>
            <select
              id="country"
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              className={\`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent \${
                errors.country
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 bg-white"
              }\`}
            >
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country}</p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="newsletter"
                checked={formData.newsletter}
                onChange={(e) => handleInputChange("newsletter", e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="newsletter" className="ml-2 text-sm">
                Subscribe to our newsletter for updates and offers
              </label>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                checked={formData.terms}
                onChange={(e) => handleInputChange("terms", e.target.checked)}
                className="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="terms" className="ml-2 text-sm">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>{" "}
                *
              </label>
            </div>
            {errors.terms && (
              <p className="mt-1 text-sm text-red-600">{errors.terms}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Creating Account...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}`;

    return new NextResponse(completeCode, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Error reading source code:", error);
    return NextResponse.json(
      { error: "Failed to load source code" },
      { status: 500 },
    );
  }
}

// Function to extract separate example components
function extractInteractiveExample(sourceCode: string): string | null {
  // Look for separate example components
  const examplePatterns = [
    /function\s+(\w+Example)\s*\([^)]*\)\s*\{[\s\S]*?\n\}/g,
    /const\s+(\w+Example)\s*=\s*\([^)]*\)\s*=>\s*\{[\s\S]*?\n\}/g,
    /const\s+(\w+Example)\s*=\s*function\s*\([^)]*\)\s*\{[\s\S]*?\n\}/g,
  ];

  for (const pattern of examplePatterns) {
    const match = sourceCode.match(pattern);
    if (match) {
      let extractedCode = match[0];

      // Remove Key Features section
      extractedCode = removeDocumentationSections(extractedCode);

      return extractedCode;
    }
  }

  return null;
}

// Function to extract the main component (fallback)
function extractMainComponent(sourceCode: string): string | null {
  // Look for the main component's interactive section
  const mainComponentMatch = sourceCode.match(
    /export default function \w+\([^)]*\)\s*\{[\s\S]*?\n\}/,
  );
  if (mainComponentMatch) {
    let extractedCode = mainComponentMatch[0];

    // Remove Key Features section
    extractedCode = removeDocumentationSections(extractedCode);

    return extractedCode;
  }

  return null;
}

// Function to extract just the interactive example component
function extractInteractiveExampleOnly(sourceCode: string): string | null {
  // Look for the interactive example section specifically
  const interactivePattern =
    /\{\s*\/\*\s*Interactive Example\s*\*\/\s*\}[\s\S]*?\{\s*\/\*\s*Code Example\s*\*\/\s*\}/;
  const match = sourceCode.match(interactivePattern);

  if (match) {
    // Extract the content between the comments
    const startIndex = sourceCode.indexOf("{/* Interactive Example */}");
    const endIndex = sourceCode.indexOf("{/* Code Example */}");

    if (startIndex !== -1 && endIndex !== -1) {
      const interactiveSection = sourceCode.substring(startIndex, endIndex);

      // Clean up the extracted section
      let cleanedSection = interactiveSection
        .replace("{/* Interactive Example */}", "")
        .trim();

      // Remove any trailing divs that might be part of the grid structure
      cleanedSection = cleanedSection.replace(/<\/div>\s*$/, "");

      return cleanedSection;
    }
  }

  // If no comment markers found, try to extract the form component directly
  const formPattern =
    /const \[formData, setFormData\] = useState\([\s\S]*?return \([\s\S]*?<\/form>[\s\S]*?\);/;
  const formMatch = sourceCode.match(formPattern);

  if (formMatch) {
    // Extract state management and form component
    const stateStart = sourceCode.indexOf("const [formData, setFormData]");
    const returnStart = sourceCode.indexOf("return (");

    if (stateStart !== -1 && returnStart !== -1) {
      const stateSection = sourceCode.substring(stateStart, returnStart);
      const formSection = sourceCode.substring(returnStart);

      // Find the end of the form component
      const formEnd = formSection.indexOf("</form>");
      if (formEnd !== -1) {
        const completeForm = formSection.substring(0, formEnd + 7);

        // Combine state and form
        return stateSection + "\n  " + completeForm + "\n  );";
      }
    }
  }

  return null;
}
