"use client";
import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
export default function AccordionMenuPattern() {
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(
    new Set(["section-1"]),
  );
  const toggleAccordion = (id: string) => {
    const newOpenAccordions = new Set(openAccordions);
    if (newOpenAccordions.has(id)) {
      newOpenAccordions.delete(id);
    } else {
      newOpenAccordions.add(id);
    }
    setOpenAccordions(newOpenAccordions);
  };
  const accordionSections = [
    {
      id: "section-1",
      title: "Getting Started",
      icon: "🚀",
      items: [
        {
          id: "installation",
          title: "Installation Guide",
          description: "How to install and set up the project",
        },
        {
          id: "quickstart",
          title: "Quick Start",
          description: "Get up and running in 5 minutes",
        },
        {
          id: "configuration",
          title: "Configuration",
          description: "Configure your settings",
        },
      ],
    },
    {
      id: "section-2",
      title: "Components",
      icon: "🧩",
      items: [
        {
          id: "buttons",
          title: "Buttons",
          description: "Various button styles and states",
        },
        {
          id: "forms",
          title: "Forms",
          description: "Input fields and form controls",
        },
        {
          id: "navigation",
          title: "Navigation",
          description: "Menus, tabs, and navigation components",
        },
        {
          id: "feedback",
          title: "Feedback",
          description: "Alerts, notifications, and modals",
        },
      ],
    },
    {
      id: "section-3",
      title: "Advanced Topics",
      icon: "📚",
      items: [
        {
          id: "theming",
          title: "Theming",
          description: "Customize colors and styles",
        },
        {
          id: "accessibility",
          title: "Accessibility",
          description: "Making your app accessible",
        },
        {
          id: "performance",
          title: "Performance",
          description: "Optimization techniques",
        },
      ],
    },
    {
      id: "section-4",
      title: "API Reference",
      icon: "📊",
      items: [
        {
          id: "hooks",
          title: "React Hooks",
          description: "Custom hooks documentation",
        },
        {
          id: "utilities",
          title: "Utility Functions",
          description: "Helper functions and utilities",
        },
        {
          id: "types",
          title: "TypeScript Types",
          description: "Type definitions and interfaces",
        },
      ],
    },
  ];
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🎢 Accordion Menu Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Organize content in expandable sections that can be opened and closed
          independently, perfect for FAQs, documentation, and navigation.
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
              Click on section headers to expand or collapse content. Multiple
              sections can be open simultaneously.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {accordionSections.map((section, sectionIndex) => (
                <div
                  key={section.id}
                  className={`border-b border-gray-200 dark:border-gray-700 ${sectionIndex === accordionSections.length - 1 ? "border-b-0" : ""}`}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(section.id)}
                    className={`flex items-center justify-between w-full px-6 py-4 text-left transition-all duration-200 ${
                      openAccordions.has(section.id)
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{section.icon}</span>
                      <div>
                        <h3 className="font-semibold text-base">
                          {section.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {section.items.length} items
                        </p>
                      </div>
                    </div>
                    <div
                      className={`transform transition-transform duration-200 ${openAccordions.has(section.id) ? "rotate-180" : ""}`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>
                  {/* Accordion Content */}
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      openAccordions.has(section.id)
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-4">
                      <div className="space-y-3">
                        {section.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                {item.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Controls */}
            <div className="flex gap-2 justify-center mt-4">
              <button
                onClick={() =>
                  setOpenAccordions(new Set(accordionSections.map((s) => s.id)))
                }
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
              >
                Expand All
              </button>
              <button
                onClick={() => setOpenAccordions(new Set())}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>
        {/* Code Example */}
        <DynamicCodeExample componentName="accordion-menu" />
      </div>
      {/* Key Features */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <h2 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">
            ✨ Key Features
          </h2>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>
              • <strong>Independent Sections:</strong> Each section can be
              opened/closed independently
            </li>
            <li>
              • <strong>Smooth Animations:</strong> CSS transitions for
              expand/collapse animations
            </li>
            <li>
              • <strong>Visual Indicators:</strong> Icons and chevron rotation
              for clear state indication
            </li>
            <li>
              • <strong>Bulk Controls:</strong> Expand all and collapse all
              functionality
            </li>
            <li>
              • <strong>Accessible:</strong> Proper ARIA attributes and keyboard
              navigation
            </li>
            <li>
              • <strong>Responsive Design:</strong> Works on all screen sizes
            </li>
            <li>
              • <strong>Customizable Content:</strong> Support for icons,
              titles, and descriptions
            </li>
            <li>
              • <strong>State Management:</strong> Efficient state handling with
              Set data structure
            </li>
            <li>
              • <strong>Dynamic Code Generation:</strong> Code example extracted
              from actual source files
            </li>
          </ul>
        </div>
      </div>
      {/* Common Use Cases */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <h2 className="text-xl font-semibold mb-4 text-purple-800 dark:text-purple-200">
            🎯 Common Use Cases
          </h2>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>
              • <strong>FAQ Sections:</strong> Organize frequently asked
              questions
            </li>
            <li>
              • <strong>Documentation:</strong> Structure help content and
              guides
            </li>
            <li>
              • <strong>Navigation Menus:</strong> Collapsible sidebar
              navigation
            </li>
            <li>
              • <strong>Settings Panels:</strong> Group related settings
              together
            </li>
            <li>
              • <strong>Product Features:</strong> Showcase product capabilities
            </li>
            <li>
              • <strong>Course Content:</strong> Organize educational materials
            </li>
            <li>
              • <strong>Support Pages:</strong> Categorize help articles
            </li>
            <li>
              • <strong>Portfolio Sections:</strong> Group projects by category
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  );
}
