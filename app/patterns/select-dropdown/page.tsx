"use client";
import { useState, useRef, useEffect } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
export default function SelectDropdownPattern() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFramework, setSelectedFramework] = useState("");
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isFrameworkOpen, setIsFrameworkOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const frameworkRef = useRef<HTMLDivElement>(null);
  const countries = [
    { code: "us", name: "United States", flag: "🇺🇸" },
    { code: "ca", name: "Canada", flag: "🇨🇦" },
    { code: "uk", name: "United Kingdom", flag: "🇬🇧" },
    { code: "de", name: "Germany", flag: "🇩🇪" },
    { code: "fr", name: "France", flag: "🇫🇷" },
    { code: "jp", name: "Japan", flag: "🇯🇵" },
    { code: "au", name: "Australia", flag: "🇦🇺" },
    { code: "br", name: "Brazil", flag: "🇧🇷" },
    { code: "in", name: "India", flag: "🇮🇳" },
    { code: "cn", name: "China", flag: "🇨🇳" },
  ];
  const categories = [
    { id: "web-dev", name: "Web Development", icon: "🌐" },
    { id: "mobile-dev", name: "Mobile Development", icon: "📱" },
    { id: "design", name: "UI/UX Design", icon: "🎨" },
    { id: "data-science", name: "Data Science", icon: "📊" },
    { id: "devops", name: "DevOps", icon: "⚙️" },
    { id: "ai-ml", name: "AI/Machine Learning", icon: "🤖" },
  ];
  const frameworks = [
    {
      id: "react",
      name: "React",
      description: "A JavaScript library for building user interfaces",
    },
    {
      id: "vue",
      name: "Vue.js",
      description: "The Progressive JavaScript Framework",
    },
    {
      id: "angular",
      name: "Angular",
      description: "Platform for building mobile and desktop web applications",
    },
    {
      id: "svelte",
      name: "Svelte",
      description: "Cybernetically enhanced web apps",
    },
    {
      id: "nextjs",
      name: "Next.js",
      description: "The React Framework for Production",
    },
  ];
  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryRef.current &&
        !countryRef.current.contains(event.target as Node)
      ) {
        setIsCountryOpen(false);
      }
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target as Node)
      ) {
        setIsCategoriesOpen(false);
      }
      if (
        frameworkRef.current &&
        !frameworkRef.current.contains(event.target as Node)
      ) {
        setIsFrameworkOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };
  const getSelectedCountry = () => {
    return countries.find((country) => country.code === selectedCountry);
  };
  const getSelectedFramework = () => {
    return frameworks.find((framework) => framework.id === selectedFramework);
  };
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🔽 Select Dropdown Patterns
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Custom dropdown selects with single and multiple selection, search,
          and rich content support.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Examples
            </h2>
            <div className="space-y-8">
              {/* Single Select - Country */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Country (Single Select)
                </label>
                <div className="relative" ref={countryRef}>
                  <button
                    type="button"
                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                    className="relative w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <span className="flex items-center">
                      {getSelectedCountry() ? (
                        <>
                          <span className="mr-2">
                            {getSelectedCountry()!.flag}
                          </span>
                          <span className="block truncate">
                            {getSelectedCountry()!.name}
                          </span>
                        </>
                      ) : (
                        <span className="block truncate text-gray-500 dark:text-gray-400">
                          Select a country...
                        </span>
                      )}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg
                        className={`h-5 w-5 text-gray-400 transform transition-transform ${isCountryOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                  {isCountryOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          onClick={() => {
                            setSelectedCountry(country.code);
                            setIsCountryOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none first:rounded-t-lg last:rounded-b-lg"
                        >
                          <span className="flex items-center">
                            <span className="mr-2">{country.flag}</span>
                            <span className="block truncate">
                              {country.name}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Multi Select - Categories */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Categories (Multi-Select)
                </label>
                <div className="relative" ref={categoriesRef}>
                  <button
                    type="button"
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    className="relative w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <span className="block truncate">
                      {selectedCategories.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {selectedCategories.slice(0, 2).map((categoryId) => {
                            const category = categories.find(
                              (c) => c.id === categoryId,
                            );
                            return (
                              <span
                                key={categoryId}
                                className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-xs rounded"
                              >
                                {category?.icon} {category?.name}
                              </span>
                            );
                          })}
                          {selectedCategories.length > 2 && (
                            <span className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                              +{selectedCategories.length - 2} more
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">
                          Select categories...
                        </span>
                      )}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg
                        className={`h-5 w-5 text-gray-400 transform transition-transform ${isCategoriesOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                  {isCategoriesOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {categories.map((category) => (
                        <label
                          key={category.id}
                          className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => handleCategoryToggle(category.id)}
                            className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="mr-2">{category.icon}</span>
                          <span className="block truncate">
                            {category.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Rich Content Select - Framework */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Framework (Rich Content)
                </label>
                <div className="relative" ref={frameworkRef}>
                  <button
                    type="button"
                    onClick={() => setIsFrameworkOpen(!isFrameworkOpen)}
                    className="relative w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <span className="block">
                      {getSelectedFramework() ? (
                        <div>
                          <div className="font-medium">
                            {getSelectedFramework()!.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {getSelectedFramework()!.description}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">
                          Choose a framework...
                        </span>
                      )}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg
                        className={`h-5 w-5 text-gray-400 transform transition-transform ${isFrameworkOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                  {isFrameworkOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {frameworks.map((framework) => (
                        <button
                          key={framework.id}
                          onClick={() => {
                            setSelectedFramework(framework.id);
                            setIsFrameworkOpen(false);
                          }}
                          className="w-full text-left px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none first:rounded-t-lg last:rounded-b-lg"
                        >
                          <div className="font-medium">{framework.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {framework.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Selection Summary */}
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                  Selection Summary:
                </h4>
                <div className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <div>
                    Country: {getSelectedCountry()?.name || "None selected"}
                  </div>
                  <div>
                    Categories:{" "}
                    {selectedCategories.length > 0
                      ? selectedCategories
                          .map(
                            (id) => categories.find((c) => c.id === id)?.name,
                          )
                          .join(", ")
                      : "None selected"}
                  </div>
                  <div>
                    Framework: {getSelectedFramework()?.name || "None selected"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Code Example */}
<DynamicCodeExample componentName="select-dropdown" />
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
                Multiple Selection Types
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Single select, multi-select, and rich content options
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
                Fully customizable appearance and behavior
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Keyboard Navigation
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Full keyboard support for accessibility
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Click Outside Handling
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatically closes when clicking outside
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
            <div className="text-2xl mb-2">🌍</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Location Selection
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Country, state, and city pickers
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🏷️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Category Filters
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Multi-select category filtering
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚙️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Settings & Preferences
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Configuration options and choices
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
